import React, { PureComponent } from 'react'
import styles from './createTeam.module.scss';
import { Link } from 'react-router-dom';
import {ReactComponent as Close } from './../../../Assets/Images/Icons/x.svg'

export default class CreateTeam extends PureComponent {
    render() {
        let { close } = this.props;
        return (
            <div className={styles.popup}>
                <div className={styles.popupCard}>
                    <Close onClick={close} />
                    <p className={styles.popupCardHeading}>Create Team</p>
                    <p className={styles.popupCardMsg}>Teams must have at least 2 members decided when signing up their team</p>

                    <div className={styles.popupCardMember}>
                        <label>Member 1:</label>
                        <select></select>
                    </div>
                    <div className={styles.popupCardMember}>
                        <label>Member 2:</label>
                        <select></select>
                    </div>
                    <div className={styles.popupCardMember}>
                        <label>Member 3:</label>
                        <select></select>
                    </div>
                    <div className={styles.popupCardMember}>
                        <label>Member 4:</label>
                        <select></select>
                    </div>

                    <button onClick={close}>Add Team</button>
                </div>
            </div>
        )
    }
}
