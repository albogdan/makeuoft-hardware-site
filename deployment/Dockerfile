FROM python:3.7.3-alpine

WORKDIR /usr/src/app/

COPY ./requirements.txt requirements.txt
RUN apk --update add --virtual build-dependencies libffi-dev openssl-dev python-dev py-pip build-base \
  && pip install --upgrade pip \
  && pip install -r requirements.txt \
  && pip install gunicorn \
  && apk del build-dependencies

RUN pip install pymysql

COPY ./application/api application/api
COPY ./application/auth application/auth
COPY ./application/hardware_signout application/hardware_signout
COPY ./application/seeds application/seeds
COPY ./application/templates application/templates
COPY ./application/__init__.py application
COPY ./application/cli.py application
COPy ./application/db_models.py application

COPY ./migrations migrations
COPY ./main.py ./config.py ./
RUN rm -rf applicaton/hardware_signout_react


ENV FLASK_APP main.py


EXPOSE 8282
