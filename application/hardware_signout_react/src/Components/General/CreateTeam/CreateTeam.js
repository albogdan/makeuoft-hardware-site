import React, { PureComponent } from 'react'
import styles from './createTeam.module.scss';
import { Link } from 'react-router-dom';
import {ReactComponent as Close } from './../../../Assets/Images/Icons/x.svg'

export default class CreateTeam extends PureComponent {
    render() {
        let { close } = this.props;
        return (
            <div className={styles.overlay}>
                <div className={styles.popup} onClick={close}></div>
                <div className={styles.popupCard}>
                    <Close onClick={close} />
                    <p className={styles.popupCardHeading}>Create Team</p>
                    <p className={styles.popupCardMsg}>Teams must have at least 2 members decided when signing up their team</p>

                    <div className={styles.popupCardMember}>
                        <label for="member-1">Member 1:</label>
                        <select id="member-1"></select>
                        <label for="id-1">ID: </label>
                        <input type="checkbox" id="id-1" />
                    </div>
                    <div className={styles.popupCardMember}>
                        <label for="member-2">Member 2:</label>
                        <select id="member-2"></select>
                        <label for="id-2">ID: </label>
                        <input type="checkbox" id="id-2" />
                    </div>
                    <div className={styles.popupCardMember}>
                        <label for="member-3">Member 3:</label>
                        <select id="member-3"></select>
                        <label for="id-3">ID: </label>
                        <input type="checkbox" id="id-3" />
                    </div>
                    <div className={styles.popupCardMember}>
                        <label for="member-4">Member 4:</label>
                        <select id="member-4"></select>
                        <label for="id-4">ID: </label>
                        <input type="checkbox" id="id-4" />
                    </div>

                    <button onClick={close}>Add Team</button>
                </div>
            </div>
        )
    }
}
