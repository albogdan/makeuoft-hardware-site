import React, { PureComponent } from 'react'
import styles from './createTeam.module.scss';
import EditTeamSelector from './../../Checkout/ItemSelector/EditTeamSelector';
import {ReactComponent as Close } from './../../../Assets/Images/Icons/x.svg'

export default class CreateTeam extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { }
    }


    render() {
        let { close, teamNumber } = this.props;
        let { addTeamMembers, alertStyle, idAlert } = this.state;

        let memberField = [];
        for (let i=1; i<5; i++) {
            memberField.push(
                <div className={styles.popupCardMember}>
                    <label for={`member-${i}`} className={styles.popupCardMemberLabel}>Member {i}:</label>
                    <EditTeamSelector
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
                    <p className={styles.popupCardHeading} style={{marginBottom: 25}}>Edit Team {teamNumber}</p>
                    {idAlert && 
                        <p className={`${styles.popupCardMsg} ${styles.alert}`}>At least 1 member has to provide their id</p>
                    }
                    {memberField}
                    <button className={styles.popupCardBtn}>Save edit</button>
                    <button className={styles.deleteTeamBtn}>DELETE TEAM</button>
                </div>
            </div>
        )
    }
}
