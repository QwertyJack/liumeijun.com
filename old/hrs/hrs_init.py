#!/usr/bin/env python

import sqlite3

db = 'lxm.db'
conn = sqlite3.connect(db)
c = conn.cursor()

def db_init(c):
    c.execute('drop table if exists hrs')
    c.execute('''
create table hrs (
  id        integer primary key autoincrement,
  title     char,
  costTime  char,
  introduce char,
  actualTime    char,
  roomId    char,
  videlUrl  char
);
              ''')

if __name__ == '__main__':
    db_init(c)
    conn.commit()
    conn.close()
