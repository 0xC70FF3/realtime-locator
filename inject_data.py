#!/usr/bin/env python
# -*- coding:utf8 -*-
from socketIO_client import SocketIO, LoggingNamespace
import random


def callback(*args):
    print(args)


if __name__ == "__main__":

    with SocketIO('192.168.99.100', 3000, LoggingNamespace) as socketIO:
        for i in range(0, 12):
            lon = random.uniform(-180, 180)
            lat = random.uniform(-90, 90)
            socketIO.emit(
                'features',
                '{'
                '   "geometry": {'
                '       "type": "Point", '
                '       "coordinates": [' + str(lon) + ', ' + str(lat) + ']'
                '   },'
                '   "type": "Feature", '
                '   "properties": {'
                '       "marker-color": "FFCD2A"'
                '   }'
                '}',
                callback
            )
            socketIO.wait_for_callbacks(seconds=1)
