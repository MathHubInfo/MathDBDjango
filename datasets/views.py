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