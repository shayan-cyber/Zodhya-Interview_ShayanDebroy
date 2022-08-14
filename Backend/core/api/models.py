from django.db import models

# Create your models here.

class WeatherCheck(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    start_lat = models.FloatField()
    start_lon = models.FloatField()
    end_lat = models.FloatField()
    end_lon = models.FloatField()
    current_precip = models.FloatField()
    current_description = models.TextField(blank=True, null=True)
    next_safe_journey_time = models.DateTimeField(blank=True, null=True)
    startaddress = models.TextField(blank = True, null=True)
    endaddress = models.TextField(blank = True, null = True)

    def __str__(self):
        return str(self.pk)

