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
        teamDict['label'] = "Team: " + str(team.id)
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


@api.route('/checkoutitems', methods=['POST'])
@cross_origin()
#@login_required
def itemCheckout():
    data = json.loads(request.data)
    print("Request for team {0}".format(data['team']))
    print("Items requested: {0}". format(data['items']))
    # Get the team
    team = Teams.query.filter_by(id=data['team']).first()

    # For each item, check if the quantity requested exists
    # Then iterate through the quantity they requested
    for item in data['items']:
        partDB = PartsAvailable.query.filter_by(part_name=item['name']).first()
        if(partDB.quantity_remaining < item['quantity']):
            return jsonify({"status": "failed", "message": "Not enough parts remaining!",
                            "name": item['name'], "requested_parts": item['quantity'],
                            "remaining_parts": partDB.quantity_remaining})
        for i in range(0, item['quantity']):
            part_out = PartsSignedOut()
            team.parts_used.append(part_out)
            partDB.quantity_remaining -=1
            partDB.parts_signed_out.append(part_out)
            db.session.add(part_out)
    db.session.commit()
    #     print(partDB.quantity_remaining)
    #     print(item['name'], item['quantity'])
    #print(request.data)
    return jsonify({"status": "success", "message": "all parts recorded successfully"})

@api.route('/addteam/getparticipants', methods=['GET', 'POST'])
@cross_origin()
#@login_required
def usersNotOnTeam():
    users_no_team = Users.query.filter(Users.team==None).all()
    usersJSON = []
    for user in users_no_team:
        if(user.team==None):
            usersJSON.append({"id": user.id, "label": str(user.first_name + " " + user.last_name)})
    return jsonify(usersJSON)


## ADD A CHECK FOR MINIMUM 2 PEOPLE, ALSO ADD GOVT_IDS
@api.route('/addteam/addrecord', methods=['GET', 'POST'])
@cross_origin()
#@login_required
def addrecord():
    data = json.loads(request.data)
    newTeam = Teams()
    for user in data:
        userDBEntry = Users.query.filter_by(id=user['id']).first()
        print(userDBEntry)
        newTeam.team_members.append(userDBEntry)
    db.session.add(newTeam)
    db.session.commit()
    return jsonify({"status": "success", "message": "new team created successfully"})


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
