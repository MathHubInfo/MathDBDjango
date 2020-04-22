"""mathdb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from django.conf import settings


from django.urls import include, path
from rest_framework import routers
from datasets import views

router = routers.DefaultRouter()
router.register(r'authors', views.AuthorViewSet)
router.register(r'references', views.ReferenceViewSet)
router.register(r'collections', views.CollectionViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
]

# for debugging and testing
if settings.DEBUG or settings.IN_TEST_MODE:
    from os.path import dirname, join
    from django.views.static import serve as dir_serve
    from django.views.static import serve as file_serve
    from django.urls import re_path

    WEBPACK_BUILD_PATH = join(dirname(__file__), '..', 'frontend', 'build')
    urlpatterns += [
        url(r'^$', file_serve, kwargs={'path': 'index.html', 'document_root': WEBPACK_BUILD_PATH}, name='root'),
        re_path(r'^(?P<path>.*)$', dir_serve, kwargs={'document_root': WEBPACK_BUILD_PATH}),
    ]