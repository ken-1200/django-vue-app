FROM python:3.7

RUN apt-get update -qq

ENV PYTHONUNBUFFERED 1
ENV PYTHONUNBUFFERED 1
ENV PIPENV_VENV_IN_PROJECT 1

RUN mkdir /app

WORKDIR /app

ADD requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install djangorestframework==3.11.1
RUN pip install -U drf-yasg
RUN pip install django-cors-headers
RUN pip install Pillow
RUN pip install drf-extra-fields
