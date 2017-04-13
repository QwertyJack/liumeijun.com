#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2017 jack <jack@shd.davidandjack.cn>
#
# Distributed under terms of the MIT license.

"""
init
"""
DEBUG=True

from model import init
from step import main, update, download, generate

if DEBUG:
    from model import session, rrj, hrs, yy
    __all__ = ['session', 'rrj', 'hrs', 'yy']
else:
    __all__ = ['init', 'main']

