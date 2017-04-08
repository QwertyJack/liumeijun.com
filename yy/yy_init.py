#!/usr/bin/env python

import sqlite3

db = '../lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()

def db_init(c):
    c.execute('drop table if exists yy')
    c.execute('''
create table yy (
  id        integer primary key autoincrement,
  pid       char,
  title     char,
  beginTime integer,
  endTime   integer,
  duration  char,
  videoUrl  char,
  entry     char
);
              ''')

if __name__ == '__main__':
    db_init(c)
    conn.commit()
    conn.close()
