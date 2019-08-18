import React, { PureComponent } from 'react'
import styles from './teamCard.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Edit } from './../../../Assets/Images/Icons/edit-symbol.svg';
import { ReactComponent as Check } from './../../../Assets/Images/Icons/checkmark.svg';
import { ReactComponent as Alert } from './../../../Assets/Images/Icons/alert.svg';

export default class TeamCard extends PureComponent {
    render() {
        let {teamNumber, members} = this.props;
        return (
            <div className={styles.card}>
                <div className={styles.cardTitle}>
                    <p>Team {teamNumber}</p>
                    <Edit />
                </div>
                <div className={styles.cardMembers}>
                    {members.map((item, i) =>
                        <div className={styles.cardMembersName}>
                            <p>{item.name}</p>
                            {item.govt_id ? <Check /> : <Alert />}
                        </div>
                    )}
                </div>
                <div className={styles.cardButton}>
                    <button className={styles.cardButton1}>Add to cart</button>
                    <Link to={{pathname: '/team-overview' }}>
                    {/* ,state: { ...item} */}
                        <button className={styles.cardButton2}>View cart</button>
                    </Link>
                </div>
            </div>
        )
    }
}
