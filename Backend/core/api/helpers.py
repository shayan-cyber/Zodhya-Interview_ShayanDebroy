import json
import requests


def get_next_safe_journey_data(lat, lon):
    url = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly"

    querystring = {"lat": str(lat), "lon": str(lon),  "hours": '48'}

    headers = {
	"X-RapidAPI-Key": "6675606e51msh40156334535a729p1de80ajsnc2cc4da0b798",
	"X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com"
}

    try:
        response = requests.request(
            "GET", url, headers=headers, params=querystring)
        response = json.loads(response.text)
        response = response['data']
        nxt_safe_journey_data = None
        for d in response:
            if d['precip'] == 0.00:
                nxt_safe_journey_data = d
                break

        # print(d)
        response = {
            'data': nxt_safe_journey_data,
            'error': False
        }
    except:
        response = {'error': True}
    return response


def get_current_weather_data(lat, lon):
    url = "https://weatherbit-v1-mashape.p.rapidapi.com/current"

    querystring = {"lat": str(lat), "lon": str(lon)}

    headers = {
	"X-RapidAPI-Key": "6675606e51msh40156334535a729p1de80ajsnc2cc4da0b798",
	"X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com"
}

    try:
        response = requests.request(
            "GET", url, headers=headers, params=querystring)
        response = json.loads(response.text)
        response = response['data']
        response = {
            'data': response,
            'error': False
        }

    except:
        response = {'error': True}
    return response
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

def send_mail(data):
    

    email_obj = EmailMessage(

        "Weather Check Notification",
        data,
        settings.EMAIL_HOST_USER,
        ['debroyshayan@gmail.com']
        
    )
    email_obj.fail_silently = False
    email_obj.send()