# Generated by Django 4.0.2 on 2022-08-13 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WeatherCheck',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('start_lat', models.FloatField()),
                ('start_lon', models.FloatField()),
                ('end_lat', models.FloatField()),
                ('end_lon', models.FloatField()),
                ('current_precip', models.FloatField()),
                ('next_safe_journey_time', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
