from flask import request, render_template, flash, session, redirect, url_for, jsonify, make_response
from application.db_models import *
from application.auth.forms import RegistrationForm, LoginForm, ApplicationForm

# Import the admin Blueprint from admin/__init__.py
from application.api import api
from application import db
from sqlalchemy.sql import func
from sqlalchemy.orm import load_only
import json
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse


@api.route('/test', methods=['GET','POST'])
@login_required
def api_main():
    print("success")
    return jsonify({'message': 'User registration'})
