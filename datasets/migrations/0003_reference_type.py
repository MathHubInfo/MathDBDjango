# Generated by Django 2.2 on 2019-04-27 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datasets', '0002_auto_20190426_1545'),
    ]

    operations = [
        migrations.AddField(
            model_name='reference',
            name='type',
            field=models.CharField(default='', help_text='Type of the reference', max_length=10),
            preserve_default=False,
        ),
    ]
