from django.contrib.staticfiles import finders
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotModified, Http404
from django.utils.http import http_date
from django.views.generic import View
from django.views.static import was_modified_since

from rest_framework import viewsets

from .models import Author, Collection, Reference, Tag
from .serializers import AuthorSerializer, CollectionSerializer, ReferenceSerializer, TagSerializer

import mimetypes
import os


class HomeView(View):
    http_method_names = ['get']
    source = 'frontend/index.html'

    def get(self, request, *args, **kwargs):
        path = finders.find(self.source)
        if not os.path.exists(path):
            raise Http404('"%s" does not exist' % path)
        stat = os.stat(path)
        mimetype, encoding = mimetypes.guess_type(path)
        mimetype = mimetype or 'application/octet-stream'
        if not was_modified_since(request.META.get('HTTP_IF_MODIFIED_SINCE'),
                                  stat.st_mtime, stat.st_size):
            return HttpResponseNotModified(mimetype-mimetype)
        response = HttpResponse(open(path, 'rb').read(), content_type=mimetype)
        response['Last-Modified'] = http_date(stat.st_mtime)
        response['Content-Length'] = stat.st_size
        if encoding:
            response['Content-Encoding'] = encoding
        return response

class AuthorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows authors to be viewed or edited
    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class ReferenceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows references to be viewed or edited
    """
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows tags to be viewed or edited
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows references to be viewed or edited
    """
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer