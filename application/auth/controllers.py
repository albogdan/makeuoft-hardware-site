from flask import request, render_template, flash, session, redirect, url_for, jsonify, make_response
from application.db_models import *
from application.auth.forms import RegistrationForm, LoginForm, ApplicationForm

# Import the admin Blueprint from admin/__init__.py
from application.auth import auth
from application import db
from sqlalchemy.sql import func
from sqlalchemy.orm import load_only
import json
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if(current_user.is_authenticated):
        return redirect(url_for('hardware_signout.index'))
    form = LoginForm()
    if(form.validate_on_submit()):
        user = Users.query.filter_by(email=form.email.data).first()

        if(user is None or not user.check_password(form.password.data)):
            flash('Invalid username or password')
            return redirect(url_for('auth.login'))

        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')

        if(not next_page or url_parse(next_page).netloc != ''):
            next_page = url_for('hardware_signout.index')

        return redirect(next_page)

    return render_template('auth/login.html', form=form)

@auth.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('hardware_signout.index'))


@auth.route('/register', methods=['GET', 'POST'])
def register():
    if(current_user.is_authenticated):
        return redirect(url_for('hardware_signout.index'))
    form = RegistrationForm()
    if(form.validate_on_submit()):
        print("Submission successful")
        user = Users(first_name=form.first_name.data, last_name=form.last_name.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you have successfully registered!')
        return redirect(url_for('auth.login'))
    return render_template('auth/register.html', form=form)


@auth.route('/apply', methods=['GET','POST'])
#@login_required
def apply():
    form = ApplicationForm()
    return render_template('auth/application.html', form=form)


# @auth.route('/api', methods=['GET','POST'])
# @login_required
# def api():
#     print("success")
#     return jsonify({'message': 'User registration'})
