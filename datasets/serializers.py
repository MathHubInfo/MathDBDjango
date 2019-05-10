from rest_framework import serializers
from datasets.models import Author, Collection, Reference

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('givenName', 'familyName', 'url')

class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = ('type', 'value')

class CollectionSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(read_only=True, many=True)
    # author_list = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    references = ReferenceSerializer(read_only=True, many=True)

    class Meta:
        model = Collection
        fields = ('name', 'description', 'url', 'authors', 'references', 'objectType', 'comment',
                  'numberOfDatasets', 'numberOfObjects', 'numberOfContributors',
                  'sizeCompressed', 'sizeUncompressed', 'timeToGenerate',
                  'provenance', 'complete', 'irredundant', 'collaborative', 'searchable', 'selfExplaining', 'summaryOfFAIR',
                  'findable', 'accessible', 'interoperable', 'reusable')