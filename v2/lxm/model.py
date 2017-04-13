#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2017 jack <jack@shd.davidandjack.cn>
#
# Distributed under terms of the MIT license.

"""
core
"""
DEBUG=True

import json
import lxml.html
import os.path
import re
import requests
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

pwd = os.path.dirname(os.path.abspath(__file__))
engine = create_engine('sqlite:///' + pwd + '/lxm.db')
DBSession = sessionmaker(bind=engine)
session = DBSession()

def init():
    Base.metadata.create_all(engine)

class rrj(Base):
    __tablename__ = 'rrj'
    __url__ = 'http://renrenjiang.cn/api/v2/columns/18/finished_activities?page='
    __headers__ = { 'Authentication': 'CN9U6cI1ApB3Jbf7lpWvjSUMDW2uzt2jNrWO1N0pIVQLh6IqFxhTiqHa6Cy0dyoA' }
    __ext__ = '.mp4'

    id = Column(Integer, primary_key=True)
    pid = Column(String())
    title = Column(String())
    description = Column(String())
    videoUrl = Column(String())
    beginTime = Column(String())
    epoch = Column(String())

    __prefix__ = 'http://renrenjiang.cn/activities/detail/'
    __suffix__ = '?su=516592'

    @classmethod
    def __sniff__(cls, pid):
        page = requests.get(cls.__prefix__ + str(pid) + cls.__suffix__)
        page.encoding = 'utf-8'
        tree = lxml.html.fromstring(page.text)
        desc = tree.xpath('//div[@class="emoji"]/div/p')[0].text
        vurl = tree.xpath('//video/@src')[0]
        return desc, vurl

    @classmethod
    def update(cls):
        npage = 0
        items = []
        while True:
            npage += 1
            req = requests.get(cls.__url__ + str(npage), headers=cls.__headers__)
            act = json.loads(req.text)['activities']
            if len(act) == 0:
                break
            items.extend(act)

        for item in reversed(items):
            if session.query(rrj).filter(rrj.pid == item['id']).count() == 0:
                desc, vurl = cls.__sniff__(item['id'])
                new_rrj = rrj(
                        pid         = item['id'],
                        title       = item['title'],
                        description = desc,
                        videoUrl    = vurl,
                        beginTime   = item['started_at'],
                        epoch       = item['started_at']
                        )
                session.add(new_rrj)
        session.commit()

    @classmethod
    def down(cls):
        _down(cls)

    @classmethod
    def gen(cls):
        pass


class hrs(Base):
    __tablename__ = 'hrs'
    __url__ = 'https://hongrenshuo.com.cn/api/v1/room/h5/liveList/get?uid=1797427167237'
    __ext__ = '.mp3'

    id = Column(Integer, primary_key=True)
    pid = Column(String())
    title = Column(String())
    costTime = Column(String())
    introduce = Column(String())
    actualTime = Column(String())
    videoUrl = Column(String())
    epoch = Column(String())

    @classmethod
    def update(cls):
        req = requests.get(cls.__url__)
        items = filter(lambda x: x.has_key('videoUrl'), json.loads(req.text)['b']['data'])

        for item in reversed(items):
            if session.query(hrs).filter(hrs.pid == item['roomId']).count() == 0:
                new_hrs = hrs(
                        pid         = item['roomId'],
                        title       = item['title'],
                        costTime    = item['costTime'],
                        introduce   = item['introduce'],
                        actualTime  = item['actualTime'],
                        videoUrl    = item['videoUrl'],
                        epoch       = item['actualTime']
                        )
                session.add(new_hrs)
        session.commit()

    @classmethod
    def down(cls):
        _down(cls)

    @classmethod
    def gen(cls):
        pass


class yy(Base):
    __tablename__ = 'yy'
    __prefix__ = 'http://www.yy.com/u/live/queryPlayback.json?yy=1835004959&pageNum='
    __suffix__ = '&pageSize=20'
    __ext__ = '.mp4'

    id = Column(Integer, primary_key=True)
    pid = Column(String())
    title = Column(String())
    beginTime = Column(String())
    endTime = Column(String())
    duration = Column(String())
    videoUrl = Column(String())
    epoch = Column(String())

    @classmethod
    def update(cls):
        items = []
        total = 100
        npage = 0
    
        while len(items) < total:
            npage += 1
            page = requests.get(cls.__prefix__ + str(npage) + cls.__suffix__)
            ret = json.loads(page.text)
    
            if ret['result'] != 0:
                print 'Query failed, check internet.'
                sys.exit(0)
    
            ret = ret['data']
            total = ret['totalCount']
            items.extend(ret['list'])

        for item in reversed(items):
            if session.query(yy).filter(yy.pid == item['pid']).count() == 0:
                new_yy = yy(
                        pid         = item['pid'],
                        title       = item['title'],
                        beginTime   = item['beginTime'],
                        endTime     = item['endTime'],
                        duration    = item['duration'],
                        videoUrl    = item['videoUrl'],
                        epoch       = item['endTime']
                        )
                session.add(new_yy)
        session.commit()

    @classmethod
    def down(cls):
        _down(cls)

    @classmethod
    def gen(cls):
        pass


_cate = [rrj, hrs, yy]

_pattern = re.compile(r'(?<=/)[^/\.]*(?=\.m)')
def _gf(item):
    filename = _pattern.search(item.videoUrl).group(0)
    cls = item.__class__
    fp = 'assets/' + cls.__name__ + '/' + cls.__ext__[1:] + '/' + filename + cls.__ext__
    return fp

def _down(cls, debug = DEBUG):
    items = session.query(cls).all()

    if debug:
        print 'Downloading ' + cls.__name__

    for item in items:
        fp = pwd + '/../' + _gf(item)
        if os.path.isfile(fp):
            continue
        else:
            print item,

def main():
    init()

if __name__ == '__main__':
    main()
