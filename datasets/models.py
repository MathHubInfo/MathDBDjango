from django.db import models

class Author(models.Model):
    givenName = models.CharField(max_length=200, help_text="Given name of the author")
    familyName = models.CharField(max_length=200, help_text="Family name of the author")
    url = models.URLField(null=True, blank=True, help_text="URL of the author's website")

    def __str__(self):
        return 'Author[{}, {}]'.format(self.familyName, self.givenName)
    
    def json(self):
        return {
            'givenName': self.givenName,
            'familyName': self.familyName,
            'url': self.url
        }

class Reference(models.Model):
    type = models.CharField(max_length=10, help_text="Type of the reference")
    value = models.CharField(max_length=200, help_text="Value of the reference")

    def __str__(self):
        return 'Reference[{}, {}]'.format(self.type, self.value)

    def json(self):
        return {
            'type': self.type,
            'value': self.value
        }

class Collection(models.Model):

    name = models.CharField(max_length=200, help_text="The name of the collection")
    description = models.CharField(null=True, blank=True, max_length=200, help_text="The description of the collection")
    url = models.URLField(null=True, blank=True, help_text="URL of the collection's website")
    authors = models.ManyToManyField(Author, blank=True)
    references = models.ManyToManyField(Reference, blank=True)
    objectType = models.CharField(null=True, blank=True, max_length=200, help_text="The type of mathematical objects in the collection")
    comment = models.TextField(null=True, blank=True, help_text="Any other information about the collection")

    numberOfDatasets = models.IntegerField(null=True, blank=True, help_text="The number of datasets in the collection")
    numberOfObjects = models.BigIntegerField(null=True, blank=True, help_text="The number of objects in the collection (approximate or exact)")
    numberOfContributors = models.SmallIntegerField(null=True, blank=True, help_text="The number of contributors to the collection, if not the same as authors")

    sizeCompressed = models.CharField(null=True, blank=True, max_length=200, help_text="The (approximate) size the compressed collection")
    sizeUncompressed = models.CharField(null=True, blank=True, max_length=200, help_text="The (approximate) size the uncompressed collection")
    timeToGenerate = models.CharField(null=True, blank=True, max_length=200, help_text="The (approximate) time to generate the collection")

    provenance = models.TextField(null=True, blank=True, help_text="The description of the collection's provenance")
    complete = models.TextField(null=True, blank=True, help_text="Does the collection contain all objects for some parameters (which)")
    irredundant = models.TextField(null=True, blank=True, help_text="Does the collection potentially contain duplicates")
    collaborative = models.TextField(null=True, blank=True, help_text="Is it possible to contribute to the collection (how)")
    # dropping decentralised
    searchable = models.TextField(null=True, blank=True, help_text="The description of the collection's search features")
    selfExplaining = models.TextField(null=True, blank=True, help_text="The description of the collection's features explaining its contents")
    summaryOfFAIR = models.TextField(null=True, blank=True, help_text="The summary of the collection's adherence to FAIR principles")

    findable = models.CharField(null=True, blank=True, max_length=20, help_text="The encoded data representing Findable")
    accessible = models.CharField(null=True, blank=True, max_length=20, help_text="The encoded data representing Accessible")
    interoperable = models.CharField(null=True, blank=True, max_length=20, help_text="The encoded data representing Interoperable")
    reusable = models.CharField(null=True, blank=True, max_length=20, help_text="The encoded data representing Reusable")

    def __str__(self):
        return 'Collection[{}]'.format(self.name)
    
    def json(self):
        return {
            'name': self.name,
            'description': self.description,
            'url': self.url,
            'authors': [a.json() for a in self.authors.all()],
            'references': [r.json() for r in self.references.all()],
            'objectType': self.objectType,
            'comment': self.comment,

            'numberOfDatasets': self.numberOfDatasets,
            'numberOfObjects': self.numberOfObjects,
            'numberOfContributors': self.numberOfContributors,

            'sizeCompressed': self.sizeCompressed,
            'sizeUncompressed': self.sizeUncompressed,
            'timeToGenerate': self.timeToGenerate,

            'provenance': self.provenance,
            'complete': self.complete,
            'irredundant': self.irredundant,
            'searchable': self.searchable,
            'selfExplaining': self.selfExplaining,
            'summaryOfFAIR': self.summaryOfFAIR,

            'findable': self.findable,
            'accessible': self.accessible,
            'interoperable': self.interoperable,
            'reusable': self.reusable
        }

