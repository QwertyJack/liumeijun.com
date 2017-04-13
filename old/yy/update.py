#!/usr/bin/env python

import json
import os.path
import requests
import requests
import sqlite3
import subprocess
import sys
import time

dir = 'assets'
db = '../lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()
prefix = 'http://www.yy.com/u/live/queryPlayback.json?yy=1835004959&pageNum='
suffix = '&pageSize=20'

def parse():

    data = []
    total = 100
    npage = 0

    while len(data) < total:
        npage += 1
        url = prefix + str(npage) + suffix
        page = requests.get(url)
        ret = json.loads(page.text)

        if ret['result'] != 0:
            print 'Query failed, check internet.'
            sys.exit(0)

        ret = ret['data']
        total = ret['totalCount']
        data.extend(ret['list'])

    data.reverse()
    return data

def search(item):
    c.execute('select * from yy where pid=?', (item['pid'],))
    return len(c.fetchall())

def insert(item, entry):
    values = (item['pid'],item['title'], item['beginTime'], item['endTime'], item['duration'], item['videoUrl'], entry)
    c.execute('insert into yy values(NULL,?,?,?,?,?,?,?)', values)
    conn.commit()

if __name__ == '__main__':
    data = parse()
    for item in data:
        entry = item['videoUrl'].split('/')[-1]
        if search(item) > 0:
            print 'Skip: ' + item['pid']
        else:
            insert(item, entry)
        if not os.path.isfile(dir + '/' + entry):
            subprocess.call(['mkdir', dir])
            subprocess.call(['wget', '-cP', dir, item['videoUrl']])
