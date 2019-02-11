# _*_ coding:utf-8 _*_

__author__ = 'heart_dawn'
from flask import Flask
from flask_script import Manager
import os


class Application(Flask):

    def __init__(self, import_name, template_folder=None, root_path=None):
        super(Application, self).__init__(import_name, template_folder=template_folder,
                                              root_path=root_path, static_folder="", static_url_path="")
        self.config.from_pyfile('config/base_config.py')


app = Application(__name__, template_folder=os.getcwd() + "/web/templates/", root_path=os.getcwd())
manager = Manager(app)

from common.libs.urlmanager import UrlManager
app.add_template_global(UrlManager.build_static_url, "buildStaticUrl")
app.add_template_global(UrlManager.build_url, "buildUrl")

