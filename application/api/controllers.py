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

from flask_cors import cross_origin

@api.route('/test', methods=['GET','POST'])
@login_required
def api_main():
    print("success")
    return jsonify({'message': 'User registration'})

@api.route('/inventory', methods=['GET', 'POST'])
@cross_origin()
#@login_required
def inventoryAll():
    partsList = PartsAvailable.query.all()
    partsJSON = []
    for part in partsList:
        partsJSON.append({"id":part.id, "name": part.part_name, "manufacturer": part.part_manufacturer,
                            "total": part.quantity_available, "available":part.quantity_remaining,
                            "serialnum":part.serial_number, "tags":[tag.tag_name for tag in part.tag_list] })

    return jsonify(partsJSON)


@api.route('/teamlist', methods=['GET','POST'])
@cross_origin()
#@login_required
def teamsAll():
    # Get a list of all the teams
    teamList = Teams.query.all()
    teamsJSON = []
    # For each team:
    for team in teamList:
        teamDict = {}
        teamDict['index'] = team.id
        teamDict['members'] = []
        # For each contestant on that team
        for teammate in team.team_members.all():
            name = str(teammate.first_name + ' ' + teammate.last_name)
            teamDict['members'].append({"name": name, "govt_id": teammate.id_provided, "id": teammate.id})
        teamsJSON.append(teamDict)
    return jsonify(teamsJSON)



@api.route('/teamscheckout', methods=['GET','POST'])
@cross_origin()
#@login_required
def teamsCheckout():
    # Get a list of all the teams
    teamList = Teams.query.all()
    teamsJSON = []
    # For each team:
    for team in teamList:
        teamDict = {}
        teamDict['value'] = team.id
        teamDict['label'] = "Team: " + str(team.team_name)
        teamsJSON.append(teamDict)
    return jsonify(teamsJSON)

@api.route('/info', methods=['GET','POST'])
@cross_origin()
#@login_required
def info():
    # Get a count of all the teams
    teamCount = len(Teams.query.all())
    # Get a count of all of the users
    userCount = len(Users.query.all())
    # Get a count of all the parts that are available
    parts_all = PartsAvailable.query.all()
    parts_all_count = 0
    for part in parts_all:
        parts_all_count += part.quantity_available
    # Get a count of all the parts that are signed out
    parts_out = len(PartsSignedOut.query.all())
    returnJSON = {}
    returnJSON['teamcount'] = teamCount
    returnJSON['usercount'] = userCount
    returnJSON['partsall'] = parts_all_count
    returnJSON['partsout'] = parts_out
    return jsonify(returnJSON)


"""
[
  {index: 1, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 2, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] }
  ]
Requests summary:
 - JSON of teams with contestants in each team, and whether id was provided for each
 - JSON of all the parts signed out w/ a time signed out
 - JSON of all the teams that a part has been signed out to (team, people, quantity to that team, time signed out)
 - JSON same as api/inventory but only with tag and item name
 - JSON that returns a list of all the teams and their team names (id + name)



"""
