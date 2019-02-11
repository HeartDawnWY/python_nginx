# _*_ coding:utf-8 _*_

__author__ = 'heart_dawn'
from flask import render_template

def ops_render(template, context={}):
    return render_template(template, **context)

