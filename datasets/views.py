from django.http import HttpResponse
from django.shortcuts import render

from django.core import serializers

from .models import Collection

from json import dumps

def index(request):
    collections = [c.json() for c in Collection.objects.all()]

    return HttpResponse(dumps(collections), content_type='application/json')