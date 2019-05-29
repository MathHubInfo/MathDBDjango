from rest_framework import serializers
from datasets.models import Author, Collection, Reference, Tag

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('givenName', 'familyName', 'url')

class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = ('type', 'value')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', )

class CollectionSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(read_only=True, many=True)
    references = ReferenceSerializer(read_only=True, many=True)
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Collection
        fields = ('id',
                  'name', 'description', 'url', 'authors', 'references', 'tags', 'comment',
                  'numberOfDatasets', 'numberOfObjects', 'numberOfContributors',
                  'sizeCompressed', 'sizeUncompressed', 'timeToGenerate',
                  'provenance', 'complete', 'irredundant', 'collaborative', 'searchable', 'selfExplaining', 'summaryOfFAIR',
                  'findable', 'accessible', 'interoperable', 'reusable')