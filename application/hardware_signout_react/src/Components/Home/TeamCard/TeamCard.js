import React, { PureComponent } from 'react'
import styles from './teamCard.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Edit } from './../../../Assets/Images/Icons/edit-symbol.svg';
import { ReactComponent as Check } from './../../../Assets/Images/Icons/checkmark.svg';
import { ReactComponent as Alert } from './../../../Assets/Images/Icons/alert.svg';

export default class TeamCard extends PureComponent {
    render() {
        let {teamNumber} = this.props;
        return (
            <div className={styles.card}>
                <div className={styles.cardTitle}>
                    <p>Team {teamNumber}</p>
                    <Edit />
                </div>
                <div className={styles.cardMembers}>
                    <div className={styles.cardMembersName}>
                        <p>Lisa Li</p>
                        <Check />
                    </div>
                    <div className={styles.cardMembersName}>
                        <p>Lisa Li</p>
                        <Alert />
                    </div>
                    <div className={styles.cardMembersName}>
                        <p>Lisa Li</p>
                        <Alert />
                    </div>
                    <div className={styles.cardMembersName}>
                        <p>Lisa Li</p>
                        <Check />
                    </div>
                </div>
                <div className={styles.cardButton}>
                    <button className={styles.cardButton1}>Blah</button>
                    <button className={styles.cardButton2}>Blah</button>
                </div>
            </div>
        )
    }
}
