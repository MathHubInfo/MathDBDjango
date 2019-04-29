from django.contrib import admin
from .models import Author, Collection, Reference

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'url')
    search_fields = ('name', 'url', 'authors__givenName', 'authors__familyName')

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('familyName', 'givenName')
    search_fields = ('familyName', 'givenName')

@admin.register(Reference)
class ReferenceAdmin(admin.ModelAdmin):
    list_display = ('type', 'value')
    search_fields = ('type', 'value')