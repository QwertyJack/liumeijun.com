#!/usr/bin/env python

import requests
import sqlite3
import subprocess
import json
import os.path

dir = 'assets'
db = '../lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()
url = 'https://hongrenshuo.com.cn/api/v1/room/h5/liveList/get?uid=1797427167237'

def parse(url):
    page = requests.get(url)
    page.encoding = 'utf-8'
    data = json.loads(page.text)
    return data

def search(item):
    c.execute('select * from hrs where title=?', (item['title'],))
    return len(c.fetchall())

def insert(item, entry):
    values = (item['title'], item['costTime'], item['introduce'], item['videoUrl'], entry)
    c.execute('insert into hrs values(NULL,?,?,?,?,?)', values)
    conn.commit()

if __name__ == '__main__':
    data = parse(url)
    for item in data['b']['data']:
        if 'videoUrl' in item:
            entry = item['videoUrl'].split('/')[-1]
            if search(item) > 0:
                print 'Skip: ' + item['title']
            else:
                insert(item, entry)
            if not os.path.isfile(dir + '/' + entry):
                subprocess.call(['mkdir', dir])
                subprocess.call(['wget', '-cP', dir, item['videoUrl']])
