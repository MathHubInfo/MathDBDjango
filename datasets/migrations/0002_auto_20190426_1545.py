# Generated by Django 2.2 on 2019-04-26 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datasets', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reference',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(help_text='Value of the reference', max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='author',
            name='url',
            field=models.URLField(blank=True, help_text="URL of the author's website", null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='accessible',
            field=models.CharField(help_text='The encoded data representing Accessible', max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='collaborative',
            field=models.TextField(help_text='Is it possible to contribute to the collection (how)', null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='comment',
            field=models.TextField(help_text='Any other information about the collection', null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='complete',
            field=models.TextField(help_text='Does the collection contain all objects for some parameters (which)', null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='description',
            field=models.CharField(help_text='The description of the collection', max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='findable',
            field=models.CharField(help_text='The encoded data representing Findable', max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='interoperable',
            field=models.CharField(help_text='The encoded data representing Interoperable', max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='irredundant',
            field=models.TextField(help_text='Does the collection potentially contain duplicates', null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='numberOfContributors',
            field=models.SmallIntegerField(help_text='The number of contributors to the collection, if not the same as authors', null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='numberOfDatasets',
            field=models.IntegerField(help_text='The number of datasets in the collection', null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='numberOfObjects',
            field=models.BigIntegerField(help_text='The number of objects in the collection (approximate or exact)', null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='objectType',
            field=models.CharField(help_text='The type of mathematical objects in the collection', max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='provenance',
            field=models.TextField(help_text="The description of the collection's provenance", null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='reusable',
            field=models.CharField(help_text='The encoded data representing Reusable', max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='searchable',
            field=models.TextField(help_text="The description of the collection's search features", null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='selfExplaining',
            field=models.TextField(help_text="The description of the collection's features explaining its contents", null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='sizeCompressed',
            field=models.CharField(help_text='The (approximate) size the compressed collection', max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='sizeUncompressed',
            field=models.CharField(help_text='The (approximate) size the uncompressed collection', max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='summaryOfFAIR',
            field=models.TextField(help_text="The summary of the collection's adherence to FAIR principles", null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='timeToGenerate',
            field=models.CharField(help_text='The (approximate) time to generate the collection', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='collection',
            name='url',
            field=models.URLField(blank=True, help_text="URL of the collection's website", null=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='references',
            field=models.ManyToManyField(to='datasets.Reference'),
        ),
    ]
