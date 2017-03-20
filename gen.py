#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sqlite3
import jinja2
import codecs

db = 'lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()

env = jinja2.Environment(
    loader = jinja2.PackageLoader('gen', 'template')
)

def hrs():
    c.execute('select id,title,len,intro,entry from hrs')
    return c.fetchall()

def rrj():
    c.execute('select id,title,desc,entry from rrj')
    return c.fetchall()

if __name__ == '__main__':
    with codecs.open('index.html', 'wb', encoding = 'UTF-8') as f:
        f.write(env.get_template('index.html').render(rrj = rrj(), hrs = hrs()))
