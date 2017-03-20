#!/usr/bin/env python

import sqlite3

db = 'lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()

def db_init(c):
    c.execute('drop table if exists rrj')
    c.execute('''
create table rrj (
  id        integer primary key autoincrement,
  q         char,
  url       char,
  title     char,
  desc      char,
  src       char,
  entry     char
);
              ''')

    c.execute('drop table if exists hrs')
    c.execute('''
create table hrs (
  id        integer primary key autoincrement,
  title     char,
  len       char,
  intro     char,
  src       char,
  entry     char
);
              ''')

if __name__ == '__main__':
    db_init(c)
    conn.commit()
    conn.close()
