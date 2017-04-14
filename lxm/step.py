#!/usr/bin/env python
# -*- coding: utf-8 -*-

import ipdb
import jinja2
import codecs
import re
import time
from .model import session, _cate
from .utils import _gf

def update():
    for cate in _cate:
        cate.update()


def download():
    for cate in _cate:
        cate.down()


env = jinja2.Environment(
    loader = jinja2.PackageLoader('lxm', 'templates')
)

def generate():
    data = {}
    for cate in _cate:
        items = session.query(cate).all()
        map(lambda x: setattr(x, 'entry', _gf(x)), items)
        map(lambda x: setattr(x, 'time', time.strftime('%c',
            time.localtime(int(x.epoch)))), items)
        data[cate.__name__] = items

    with codecs.open('index.html', 'wb', encoding = 'UTF-8') as f:
        f.write(env.get_template('index.html').render(data=data))


def main():
    update();
    download();
    generate();

if __name__ == '__main__':
    main()

