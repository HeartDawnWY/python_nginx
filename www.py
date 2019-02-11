# _*_ coding:utf-8 _*_

__author__ = 'heart_dawn'

from application import app
from web.controllers.static import route_static
from web.controllers.marry.index import home_route

app.register_blueprint(route_static, url_prefix="/static")
app.register_blueprint(home_route, url_prefix="/marry")

