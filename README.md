# RulebenderOnline

RulebenderOnline is alpha software that will eventually allow users to create and run BioNetGen models through a web interface powered by Django.

## Prerequisites

Currently, RulebenderOnline uses Python 2, django2, and django-ipware. The easiest way to use this software is to install the python packages listed in the requirements file through a Python virtual environment. To create and activate the virtual environment, type the following:

    virtualenv django-user
    source django-user/bin/activate

Install the requirements:

    cd django-mycode
    pip install -r requirements.txt

## Testing

To make sure everything worked, change into either `django-mycode` and run the server:

    cd django-mycode/mysite
    python manage.py runserver

Open `127.0.0.1:8000/polls` in a browser.
