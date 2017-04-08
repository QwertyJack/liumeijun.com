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

dst = 'mp4'
db = 'lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()

def selectall(table):
    c.execute('select pid,videoUrl from ' + table)
    return c.fetchall()

def download(prefix, item):
    fp = prefix + '/' + item[0] + '.mp4'
    if os.path.isfile(fp):
        pass
    subprocess.call(['ffmpeg', '-i', item[1], fp])

if __name__ == '__main__':
    for cate in ['yy']:
        path = cate + '/' + dst
        subprocess.call(['mkdir', path])
        for item in selectall(cate):
            download(path, item)
