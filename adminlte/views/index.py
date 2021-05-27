from adminlte.models import Gameserver
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required()
def index(request):
    gameservers = Gameserver.objects.all()
    args = {
        'gameservers': gameservers
    }
    return render(request, 'adminlte/index.html', args)