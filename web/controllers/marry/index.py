# _*_ coding:utf-8 _*_

__author__ = 'heart_dawn'

from flask import Blueprint
from common.libs.helper import ops_render

home_route = Blueprint("marry", __name__)


@home_route.route("/")
def index():
    return ops_render("/marry/index.html", {})

