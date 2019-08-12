import React, { PureComponent } from 'react'
import styles from './checkoutHistory.module.scss';
import {ReactComponent as Close } from './../../../Assets/Images/Icons/x.svg'
import Component from './../Component/Component'

export default class CheckoutHistoryListItem extends PureComponent {
    render() {
        let {number, members, quantity, time } = this.props;
        return (
            <div className={styles.listItem}>
                <div className={styles.listItemTeam}>
                    <span style={{fontWeight: 600}}>Team {number} : </span>
                    { members.map((item, i) =>
                        <span>{item}, </span>
                    )}
                </div>
               
                <p className={styles.listItemQuantity}>{quantity}</p>
                <p className={styles.listItemTime}>{time}</p>
            </div>
        )
    }
}

