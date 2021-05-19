# gta-adminlte-django
This project serves as an example for integrating adminlte into django and using a simple api (in this case a gameserver for Alt:V - a GTA Multiplayer Mod).
It also adds the capability to control multiple servers, which makes it neat for Development, Testing and Production environments.

# Usage

## Requirements
-   Python 3.x
-   Prefer VS Code with the Extensions `Beautify`, `Django` and `Python`

## Installation

1. Run `pip install -r requirements.txt`
2. Go to https://miniwebtool.com/django-secret-key-generator/ and generate a new django secret key. Copy paste this into the `.env` file and keep it secret
3. Run `python manage.py makemigrations`
4. Run `python manage.py migrate` to create the database structure. If you encounter an error, use `python manage.py migrate --run-syncdb`
5. Run `python manage.py runserver` (CTRL+SHIFT+B if you have VSCode settings)
6. Open browser at http://127.0.0.1:8000

You should see this

![django_startup](https://user-images.githubusercontent.com/13089522/118776387-39d11980-b888-11eb-8486-3182fddd1893.PNG)

## Setup Administration

1. Stop server if necessary
2. Run `python manage.py createsuperuser` to create an admin account
3. Restart server, you can now login using the created admin account

## Setup Gameserver

The following steps refer to the example using the Game Server API (see https://github.com/riffy/altv-adminpanel-api)

1. Login and click `Admin` in the top
2. Click `Add` to the Gameservers
3. Fill out the form with information from the Alt:V gameserver data. If the Django server and Gameserver are running on the same ip/environment you can use `localhost`
4. Click `Save` and head back to the main site by clicking `VIEW SITE` in the top right.
5. The server should now be selectable in the left sidebar

![django_serverselect](https://user-images.githubusercontent.com/13089522/118778067-05f6f380-b88a-11eb-9a86-cfe614b634ff.jpg)


# Game Server API
For the Gameserver API, please look at my other repository https://github.com/riffy/altv-adminpanel-api 

If you run the ALT:V server with the module from the api repo and have everything configured correctly you should see the online status

![server_status](https://user-images.githubusercontent.com/13089522/118778377-51110680-b88a-11eb-9573-00fde3e56ac8.jpg)