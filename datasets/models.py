from django.db import models

class Author(models.Model):
    givenName = models.CharField(max_length=200, help_text="Given name of the author")
    familyName = models.CharField(max_length=200, help_text="Family name of the author")

    def __str__(self):
        return 'Author[{}, {}]'.format(self.familyName, self.givenName)
    
    def json(self):
        return {
            'givenName': self.givenName,
            'familyName': self.familyName,
        }

class Collection(models.Model):
    name = models.CharField(max_length=200, help_text="The name of the collection")
    url = models.URLField(null=True, blank=True)
    authors = models.ManyToManyField(Author)

    def __str__(self):
        return 'Collection[{}]'.format(self.name)
    
    def json(self):
        return {
            'name': self.name,
            'url': self.url,
            'authors': [a.json() for a in self.authors.all()],
        }

