import React, { PureComponent } from 'react'
import styles from './createTeam.module.scss';
import { Link } from 'react-router-dom';
import AddTeamSelector from './../../Checkout/ItemSelector/AddTeamSelector';
import {ReactComponent as Close } from './../../../Assets/Images/Icons/x.svg'


export default class CreateTeam extends PureComponent {
    render() {
        let { close } = this.props;

        let memberField = [];
        for (let i=1; i<5; i++) {
            memberField.push(
                <div className={styles.popupCardMember}>
                    <label for={`member-${i}`} className={styles.popupCardMemberLabel}>Member {i}:</label>
                    <AddTeamSelector id={`member-${i}`} />
                    <label for={`id-${i}`} className={styles.popupCardMemberIDLabel}>ID: </label>
                    <input type="checkbox" id={`id-${i}`} />
                </div>
            )
        }

        return (
            <div className={styles.overlay}>
                <div className={styles.popup} onClick={close}></div>
                <div className={styles.popupCard}>
                    <Close onClick={close} />
                    <p className={styles.popupCardHeading}>Create Team</p>
                    <p className={styles.popupCardMsg}>Teams must have at least 2 members decided when signing up their team</p>

                    {memberField}
                    <button onClick={close}>Add Team</button>
                </div>
            </div>
        )
    }
}
