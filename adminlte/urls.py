from django.urls import path
import adminlte.views as views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/<int:serverid>/', views.dashboard, name='dashboard'),
    path('serverstats/<int:serverid>/', views.server_statistics, name='serverstats'),
    path('playerlist/<int:serverid>/', views.player_list, name='playerlist'),
    path('playerinfo/<int:serverid>/', views.player_info, name='playerinfo'),
    path('playerinfo/<int:serverid>/<int:playerid>/', views.player_info, name='playerinfo')
]