from django.contrib import admin
from .models import Author, Collection

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'url')
    search_fields = ('name', 'url', 'authors__givenName')

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('familyName', 'givenName')
    search_fields = ('familyName', 'givenName')