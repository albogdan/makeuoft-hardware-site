#from application import flask_app
from application.db_models import Users, Teams, PartsAvailable, PartsSignedOut, Tag, tags
from application import db # import the db instance from application/__init__.py
import click
import os

"""
Encapsulate the commands in a function to be able to register it with the application
and pass different parameters if the need arises
"""
def register(flask_app):
    @flask_app.cli.group()
    def seed():
        """Seeding commands for database tables for the hardware parts and tags, etc"""
        pass
    @seed.command()
    def partsavailable():
        """Seeds the PartsAvailable table with values from PartsAvailable.csv in the seeds/ folder"""
        """Note: if get 'unique constraint failed' then you have to clear the table before you seed it"""
        # temp_tag = Tag.query.filter_by(tag_name="MCU").first()
        # print(temp_tag) #This is a class object
        parts_available_csv_path = 'application/seeds/PartsAvailable.csv'#os.path.join(BASE_DIR, 'FroshGroups.csv')
        with open(parts_available_csv_path, 'r') as parts_available_csv:
            count = 0
            for i in parts_available_csv:
                j = i[:-1].split(',')
                record = PartsAvailable(part_name=j[0], part_manufacturer=j[1],
                                        serial_number=j[2], quantity_available = j[3],
                                        quantity_remaining = j[3])

                temp_tag = Tag.query.filter_by(tag_name=j[4]).first()
                record.tag_list.append(temp_tag)
                db.session.add(record)
        db.session.commit()
    @seed.command()
    def tags():
        """Seeds the Tags table with values from Tags.csv in the seeds/ folder"""
        tags_csv_path = 'application/seeds/Tags.csv'#os.path.join(BASE_DIR, 'FroshGroups.csv')
        with open(tags_csv_path, 'r') as tags_csv:
            for i in tags_csv:
                if(i[-1] == '\n'):
                    record = Tag(tag_name = i[:-1])
                else:
                    record = Tag(tag_name = i)
                db.session.add(record)
        db.session.commit()

    @seed.command()
    def checkparts():
        tagList = Tag.query.all()
        for tag_item in tagList:
            PartsAvailable.query()
            print(tag_item.tag_name)

    @seed.command()
    def findsametag():
        # Choose random part
        part = PartsAvailable.query.all()[45]
        # Tags for a part
        part_tag = part.tag_list.all() # This returns a Tag object

        print(part_tag)
        # Parts for a tag
        print(part_tag[0].partsavailable.all())
        # To get all the tags for a part:
        #print(Tag.query.filter(Tag.partsavailable.any(id=part_tag.id)).all())

        # To get all the parts for a tag:
        #print(part_tag.count_parts())
        #all_parts = PartsAvailable.query.filter(Tag.partsavailable.any(id=tag_id).all())
        #part_ids = tags.query.filter_by(tag_id=part_tag.id)
        #print(part_ids)
        #print(PartsAvailable.query.filter(tags.c.tag_id==part_tag.id).all())
