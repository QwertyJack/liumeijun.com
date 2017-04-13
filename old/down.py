#!/usr/bin/env python

import sqlite3
import subprocess
import os.path

dst = 'assets'
db = 'lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()

def selectall(table):
    c.execute('select src,entry from ' + table)
    return c.fetchall()

def download(prefix, item):
    path = prefix + '/' + dst
    lpos = item[0].rfind('/')
    prefix = item[0][:lpos] + '/'
    with open(path + '/' + item[1]) as f:
        for line in f.readlines():
            if line[0] == '#':
                continue
            fp = line.strip()
            if os.path.isfile(path + '/' + fp):
                continue
            url = prefix + line.strip()
            if line.find('/') > 1:
                ddir = path + '/' + line.split('/')[0]
                subprocess.call(['mkdir', ddir])
            else:
                ddir = path
            subprocess.call(['wget', '-cP' ,ddir, url])

if __name__ == '__main__':
    for cate in ['rrj', 'hrs']:
        for item in selectall(cate):
            download(cate, item)
