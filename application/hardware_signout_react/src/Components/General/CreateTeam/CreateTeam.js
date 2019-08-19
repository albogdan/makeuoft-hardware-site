import React, { PureComponent } from 'react'
import styles from './createTeam.module.scss';
// import { Link } from 'react-router-dom';
import AddTeamSelector from './../../Checkout/ItemSelector/AddTeamSelector';
import {ReactComponent as Close } from './../../../Assets/Images/Icons/x.svg'

export default class CreateTeam extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { addTeamMembers: [] }
    }
    addTeam(){
        console.log("team???????", this.state.addTeamMembers);

        fetch('http://localhost:8080/api/addteam/addrecord', {
          method: "POST",
          body:JSON.stringify(this.state.addTeamMembers)
        })
          .then(function(response) {
            console.log(response);
          })
          .then(function(data){
            console.log(data);
          });

    }

    addToTeam = (evt, index) => {
        console.log("yeeet", evt);

        this.setState(state => {
            let found = false;
            const addTeamMembers = state.addTeamMembers.map((item, j) => {
            if (j === index) {
                item.label = evt.label;
                item.id = evt.id;
                item.governmentID = false;
                found = true;
                return item;
            } else {
                return item;
            }});
            if (!found) {
                addTeamMembers.push({label: evt.label, id: evt.id, governmentID: false})
            }
            return { addTeamMembers };
        });
    }
    checkIdBox = index => {
        this.setState(state => {
            const addTeamMembers = state.addTeamMembers.map((item, j) => {
            if (j === index-1) {
                item.governmentID = !item.governmentID;
                return item;
            } else {
                return item;
            }});
            return { addTeamMembers };
        });
    }

    render() {
        let { close } = this.props;
        let { addTeamMembers } = this.state;

        let memberField = [];
        for (let i=1; i<5; i++) {
            memberField.push(
                <div className={styles.popupCardMember}>
                    <label for={`member-${i}`} className={styles.popupCardMemberLabel}>Member {i}:</label>
                    <AddTeamSelector
                        id={`member-${i}`}
                        index={i}
                        addToTeam={this.addToTeam}
                        />
                    <label for={`id-${i}`} className={styles.popupCardMemberIDLabel}>ID: </label>
                    <input type="checkbox" id={`id-${i}`} onClick={()=> this.checkIdBox(i)} />
                </div>
            )
        }

        return (
            <div className={styles.overlay}>
                <div className={styles.popup} onClick={close}></div>
                <div className={styles.popupCard}>
                    <Close onClick={close} className={styles.popupCardClose} />
                    <p className={styles.popupCardHeading}>Create Team</p>
                    <p className={styles.popupCardMsg}>Teams must have at least 2 members decided when signing up their team</p>
                    {console.log("addTeamMembers", addTeamMembers) }
                    {memberField}
                    <button onClick={() => {this.addTeam()}}>Add Team</button>
                </div>
            </div>
        )
    }
}
