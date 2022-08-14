from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
import requests
from . serializers import (
    UserSerializer,
    WeatherCheckSerializer
)
from . models import WeatherCheck


import json
from . import helpers
import datetime
# Create your views here.

@api_view(['GET'])
def home(request):
    return Response({"message": "Hello World"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
       
        user_obj = get_object_or_404(User, id = serializer.data['id'])
        token = get_object_or_404(Token, user = user_obj)

        return Response({"serializer-data":serializer.data, "token":token.key, "username":user_obj.username}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def check_weather(request):
    

    data= request.data
    print(data)
    start_lat = data['start_lat']
    start_lon = data['start_lon']
    end_lat = data['end_lat']
    end_lon = data['end_lon']

    resp_now = helpers.get_current_weather_data(start_lat, start_lon)

    resp_forecast = helpers.get_next_safe_journey_data(start_lat, start_lon)
    print(resp_now)
    print(resp_forecast)
    data['current_precip'] = resp_now['data'][0]['precip']
    data['current_description'] = resp_now['data'][0]['weather']['description']
    date_time = resp_forecast['data']['timestamp_utc']
    
    data['next_safe_journey_time'] = date_time
    body = ""
    if(resp_now['data'][0]['precip'] > 0):
        body = "Your safe journey time will be " + resp_forecast['data']['timestamp_local']
    else:
        body = 'It is not raining right now , It is safe for a journey'

    helpers.send_mail(body)
    serializer = WeatherCheckSerializer(data = data)
    # helpers.get_tweets()
    if serializer.is_valid():
        
        serializer.save()
        return Response({"serializer_data":serializer.data, 'resp_now': resp_now, 'resp_forecast': resp_forecast},status=status.HTTP_202_ACCEPTED )
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])  
def past_updates(request):
    all_updates = WeatherCheck.objects.all().order_by('-timestamp')
    if len(all_updates) >5 :
        all_updates = all_updates[0:5]

    serializer = WeatherCheckSerializer(all_updates, many= True)
    

    return Response({"serializer_data":serializer.data}, status= status.HTTP_202_ACCEPTED)


