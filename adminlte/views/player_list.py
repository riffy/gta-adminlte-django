from django.http.response import Http404
from adminlte.models import Gameserver
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist

from ..constants import api_queries

import requests
import logging

logger = logging.getLogger(__name__)

@login_required()
def player_list(request, serverid=0):
    gameservers = Gameserver.objects.all()
    args = {
        'error': False,
        'gameservers': gameservers,
        'online': False,
        'data': {}
    }
    try:
        selectedserver = get_object_or_404(Gameserver, pk=serverid)
        args['selectedserver'] = selectedserver
        try:
            args['data'] = selectedserver.player_list()
            args['online'] = True
            return render(request, 'adminlte/player_list.html', args)
        except requests.RequestException as e:
            logger.error(e)
            return render(request, 'adminlte/player_list.html', args)
    except ObjectDoesNotExist as e:
        return render(request, 'adminlte/dashboard.html', {'error': True})
    except Http404 as e:
        raise Http404
    except Exception as e:
        logger.error("[Generic]: {}".format(e))
        return render(request, 'adminlte/dashboard.html', {'error': True})