from application import db
import datetime
from sqlalchemy import DateTime
from sqlalchemy.sql import func

# Import class to provide functions for login of admins
from flask_login import UserMixin
from application import login_manager

# Import class to create and check password hashes
from werkzeug.security import generate_password_hash, check_password_hash

@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))

class Users(UserMixin, db.Model):
    # Define the columns of the table, including primary keys, unique, and
    # indexed fields, which makes searching faster
    #__tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), index=True, nullable=False)
    last_name = db.Column(db.String(255), index=True, nullable=False)
    email = db.Column(db.String(255), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    # ** Connect each participant to a team **
    team = db.Column(db.Integer, db.ForeignKey('teams.id'))
    id_provided = db.Column(db.Boolean, default=False)
    created_date = db.Column(DateTime(), server_default=func.now()) #func.now() tells the db to calculate the timestamp itself rather than letting the application do it
    updated_date = db.Column(DateTime(), onupdate=func.now())
    # Add

    # __repr__ method describes how objects of this class are printed
    # (useful for debugging)
    def __repr__(self):
        return '<User {}>'.format(self.id) #prints <User 'id'>

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Teams(db.Model): #Add function to be able to concatenate teams
    #__tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    #team_name = db.Column(db.String(255), index=True, nullable=False)
    created_date = db.Column(DateTime(), server_default=func.now()) #func.now() tells the db to calculate the timestamp itself rather than letting the application do it
    # ** Connect each team to multiple team members **
    team_members = db.relationship('Users', backref='teams', lazy='dynamic')
    max_members = 4
    # ** Connect each team to multiple parts signed out **
    parts_used = db.relationship('PartsSignedOut', backref='teams', lazy='dynamic')

    # __repr__ method describes how objects of this class are printed
    # (useful for debugging)
    def __repr__(self):
        return '<Team {}>'.format(self.id) #prints <Team 'id'>


# Define many to many relationship between parts and tags
tags = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('part_id', db.Integer, db.ForeignKey('parts_available.id'), primary_key=True)
)
class PartsAvailable(db.Model):
    #__tablename__ = 'parts_available'
    id = db.Column(db.Integer, primary_key=True)
    part_name = db.Column(db.String(255), index=True, nullable=False)
    part_manufacturer = db.Column(db.String(255), index=True)
    quantity_available = db.Column(db.Integer)
    quantity_remaining = db.Column(db.Integer)
    serial_number = db.Column(db.String(255))
    # ** Add tags relationship **
    # ** Add parts signed out relationship **
    parts_signed_out = db.relationship('PartsSignedOut', backref='partsavailable', lazy=True)

    # Tags
    tag_list = db.relationship('Tag', secondary=tags, lazy='dynamic',
        backref=db.backref('partsavailable', lazy='dynamic'))
    # __repr__ method describes how objects of this class are printed
    # (useful for debugging)



    def __repr__(self):
        return '<Part {}>'.format(self.id) #prints <Part 'id'>

class PartsSignedOut(db.Model):
    #__tablename__ = 'parts_signed_out'
    id = db.Column(db.Integer, primary_key=True)
    part_returned = db.Column(db.Boolean, default=False)
    part_healthy = db.Column(db.Boolean, default=False)
    created_date = db.Column(DateTime(), server_default=func.now()) #func.now() tells the db to calculate the timestamp itself rather than letting the application do it
    # ** Add PartsAvailable relationship **
    team = db.Column(db.Integer, db.ForeignKey('teams.id'))
    # ** Add teams relationship **
    part = db.Column(db.Integer, db.ForeignKey('parts_available.id'))


    # __repr__ method describes how objects of this class are printed
    # (useful for debugging)
    def __repr__(self):
        return '<Part {}>'.format(self.id) #prints <Part 'id'>

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(255), index=True, nullable=False)

# Many 2 many:
# https://www.reddit.com/r/flask/comments/6p359d/flask_sqlalchemy_many_to_many_xpost_rlearnpython/


"""
# Admin table **can be merged with user db maybe if implement roles (if not lazy)
 User table (participants)
    # Index
    # Foreign key pointing to team (One team to many users)
    # Created_date
# Team table (connect to users -> 1 team to many users (4max) )
        **Concatenate teams
    # Index
    # Relationship to users (One team to many users)
    # Parts relationship (One team to many signed out)
    # ID provided? (T/F)
    # Created_date
# Parts table (connect to teams -> 1 team to many parts (no max) )
        **Ability to add/remove parts using a csv
    # Index
    # Part Name
    # Parts signed out relationship (One part to many signed out)
    # Tags Relationship (Many to many)
    # Quantity
    # Quantity Remaining
# Tags table
    # Index
    # Tag name -> Relationship to parts (many to many)

# Parts signed out table (connect to teams and parts)
    # Index
    # NameIndex -> Relationship to index in parts table (One part to many signed out)
    # TeamIndex -> Relationship to index in teams table (One team to many signed out)
    # Created_date
    # PartReturned? (T/F)
    # PartHealthy? (T/F)

# Many = foreignKey
# One = relationship

Order:
flask db init
flask db migrate
flask db upgrade

"""
