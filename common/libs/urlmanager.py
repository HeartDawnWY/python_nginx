# _*_ coding:utf-8 _*_

__author__ = 'heart_dawn'

import time
from application import app


class UrlManager(object):

    def __init__(self):
        pass

    @staticmethod
    def build_url(path):
        return path

    @staticmethod
    def build_static_url(path):
        release_version = app.config.get("RELEASE_VERSION")
        ver = "%s" % (int(time.time())) if not release_version else release_version
        path = "/static/" + path + "?ver=" + ver
        return UrlManager.build_url(path)

