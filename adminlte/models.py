from django.db import models
from .constants import api_constants
# Create your models here.

class Gameserver(models.Model):
    name = models.CharField(max_length=255, help_text="Name of the gameserver. Only for display purposes.")
    ip = models.CharField(max_length=11, help_text="IP of the gameserver. Can be localhost.", default="")
    gameport = models.CharField(max_length=4, null=True, default="7788", help_text="Port of the gameserver. Can be empty.")
    apiport = models.CharField(max_length=4, help_text="Port of the AdminAPI of the gameserver.")
    apisecret = models.CharField(max_length=255, help_text="The secret token/key for admin access.")

    def __str__(self):
        return self.name

    def api_string(self):
        return "{}:{}/".format(self.ip, self.apiport)

    def api_query(self, query):
        return "http://{}{}{}{}".format(self.api_string(), query, api_constants.TOKEN, self.apisecret)