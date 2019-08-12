import React, { PureComponent } from 'react'
import styles from './checkoutHistory.module.scss';
import {ReactComponent as Close } from './../../../Assets/Images/Icons/x.svg'
import Component from './../Component/Component';
import ListItem from './CheckoutHistoryListItem';
import Tag from './Tag';

export default class CheckoutHistory extends PureComponent {
    render() {
        let { close } = this.props;
        return (
            <div className={styles.popup}>
                <div className={styles.history}>
                    <Close onClick={close} />
                    <div className={styles.historyLeft}>
                        <Component item="Arduino" total={36} left={0}  isCheckout={true} />

                         <div className={styles.historyLeftTags}>
                            <p className={styles.historyLeftTagsTag}>Tags:</p>
                            <div className={styles.historyLeftTagsList}>
                                <Tag>Boards</Tag>
                                <Tag>Blah</Tag>
                                <Tag>Blah</Tag>
                                <Tag>Blah</Tag>
                            </div>
                        </div>
                    </div>
                    <div className={styles.historyRight}>
                        <h3>Checkout History</h3>
                        <div className={styles.historyRightTable}>
                            <p>Team</p>
                            <p>Quantity</p>
                            <p>Time</p>
                        </div>

                        <ListItem number={1} members={["Lisa Li", "Karen Zhao", "Alex Bogdan", "Martin Ffrench"]} quantity={5} time="March 29, 9:45 PM" />
                        <ListItem number={2} members={["Lisa", "Karen", "Alex", "Martin"]} quantity={5} time="March 29, 9:45 PM" />
                        <ListItem number={3} members={["Lisa", "Karen", "Alex", "Martin"]} quantity={5} time="March 29, 9:45 PM" />
                        <ListItem number={4} members={["Lisa", "Karen", "Alex", "Martin"]} quantity={5} time="March 29, 9:45 PM" />

                    </div>
                </div>
            </div>
        )
    }
}

