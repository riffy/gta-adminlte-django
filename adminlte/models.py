from django.db import models
from .constants import api_constants, api_queries
import requests
# Create your models here.

class Gameserver(models.Model):
    name = models.CharField(max_length=255, help_text="Name of the gameserver. Only for display purposes.")
    ip = models.CharField(max_length=255, help_text="IP of the gameserver. Can be localhost.", default="")
    gameport = models.CharField(max_length=6, null=True, default="7788", help_text="Port of the gameserver. Can be empty.")
    apiport = models.CharField(max_length=6, help_text="Port of the AdminAPI of the gameserver.")
    apisecret = models.CharField(max_length=255, help_text="The secret token/key for admin access.")

    def __str__(self):
        return self.name

    def api_string(self):
        return "{}:{}/".format(self.ip, self.apiport)

    def api_query(self, query, params = {}):
        addr = "http://{}{}{}{}".format(self.api_string(), query, api_constants.TOKEN, self.apisecret)
        for key in params:
            addr += "&{}={}".format(key, params[key])
        return addr
    
    def dashboard_info(self):
        response = requests.get(self.api_query(api_queries.DASHBOARD))
        return response.json()

    def server_stats(self):
        response = requests.get(self.api_query(api_queries.SERVER_STATISTICS))
        return response.json()

    def player_list(self):
        response = requests.get(self.api_query(api_queries.PLAYER_LIST))
        return response.json()
    
    def player_info(self, playerid):
        response = requests.get(self.api_query(api_queries.PLAYER_INFO, { "id" : playerid }))
        return response.json()
