#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2017 jack <jack@shd.davidandjack.cn>
#
# Distributed under terms of the MIT license.

"""
Download m3u8 stream and convert to mp4
"""

import sqlite3
import subprocess
import os.path
import ipdb

dst = 'mp4'
db = 'lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()
workers = []

def selectall(table):
    if table == 'yy':
        c.execute('select pid,videoUrl from ' + table)
    elif table == 'hrs':
        c.execute('select entry,src from ' + table)
    return c.fetchall()

def download(prefix, item):
    fp = prefix + '/' + item[0] + '.' + dst
    if os.path.isfile(fp):
        return
    proc = subprocess.Popen(['ffmpeg', '-n', '-i', item[1], fp])
    workers.append(proc)

if __name__ == '__main__':
    # for cate in ['hrs', 'yy']:
    for cate in ['yy']:
        if cate == 'yy':
            dst = 'mp4'
        elif cate == 'hrs':
            dst = 'mp3'
        path = cate + '/' + dst
        subprocess.call(['mkdir', '-p', path])
        for item in selectall(cate):
            download(path, item)
