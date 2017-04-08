#!/usr/bin/env python

import lxml.html
import os.path
import requests
import sqlite3
import subprocess

dir = 'assets'
prefix = 'http://renrenjiang.cn/activities/detail/'
suffix = '?su=516592'
db = '../lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()

def parse(url):
    page = requests.get(url)
    page.encoding = 'utf-8'
    tree = lxml.html.fromstring(page.text)
    title = tree.xpath('//h1[@class="emoji"]')[0].text
    desc = tree.xpath('//div[@class="emoji"]/div/p')[0].text
    video = tree.xpath('//video/@src')[0]
    return title, desc, video

def insert(vv):
    values = vv + (vv[-1].split('/')[-1],)
    c.execute('insert into rrj values (NULL,?,?,?,?,?,?)', values)
    conn.commit()

def search(q):
    c.execute('select * from rrj where q=?', (q,))
    return len(c.fetchall())

if __name__ == '__main__':

    with open('list') as f:
        for line in f.readlines():
            q = line[:line.find(' ')].strip()
            if search(q) > 0:
                print 'Skip: ' + q
            else:
                url = prefix + q + suffix
                content = parse(url)
                insert((q, url) + content)

            c.execute('select src,entry from rrj where q=?', (q,))
            src, entry = c.fetchone()
            if not os.path.isfile(dir + '/' + entry):
                subprocess.call(['mkdir', dir])
                subprocess.call(['wget', '-cP', dir, src])
