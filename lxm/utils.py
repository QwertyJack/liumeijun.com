#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2017 jack <jack@shd.davidandjack.cn>
#
# Distributed under terms of the MIT license.

"""
utils
"""

import ConfigParser
import os.path
import re
import subprocess

DEBUG = True

_pwd = os.path.dirname(os.path.abspath(__file__))
_pattern = re.compile(r'(?<=/)[^/\.]*(?=\.m)')
_workers = []

def _gf(item):
    filename = _pattern.search(item.videoUrl).group(0)
    cls = item.__class__
    fp = 'assets/' + cls.__name__ + '/' + filename + cls.__ext__
    return fp

def _down(url, output):
    print 'Down:', url, '->', output
    proc = subprocess.Popen(['ffmpeg', '-n', '-i', url, output])
    _workers.append(proc)

def _auth(cate):
    cf = ConfigParser.ConfigParser()
    cf.read(_pwd + '/../config.ini')
    return cf.get(cate, 'auth')
