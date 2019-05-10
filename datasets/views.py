from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import viewsets

from .models import Author, Collection, Reference
from .serializers import AuthorSerializer, CollectionSerializer, ReferenceSerializer

from json import dumps

def index(request):
    collections = [c.json() for c in Collection.objects.all()]

    return HttpResponse(dumps(collections), content_type='application/json')

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

class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows references to be viewed or edited
    """
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer