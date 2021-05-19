from django.conf.urls import url
from django.urls import path
from . import views
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/<int:serverid>/', views.dashboard, name='dashboard')
]