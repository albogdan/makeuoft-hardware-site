import React, { PureComponent } from 'react';
import styles from './checkoutCards.module.scss';
import ItemSelector from '../ItemSelector/ItemSelector';

  
export default class CheckoutCard extends PureComponent {
    render() {
        return (
            <div className={styles.checkoutList}>
                <h2>Checkout</h2>

                <div className={styles.checkoutTable}>
                    <p>Component</p>
                    <p>Quantity</p>
                </div>

                <div className={styles.checkoutTableDiv}>
                    <div className={styles.checkoutTableDivItem}>
                    <ItemSelector type="component" />
                    <ItemSelector type="quantity" />
                    </div>
                    <div className={styles.checkoutTableDivItem}>
                    <ItemSelector type="component" />
                    <ItemSelector type="quantity" />
                    </div>
                    <div className={styles.checkoutTableDivItem}>
                    <ItemSelector type="component" />
                    <ItemSelector type="quantity" />
                    </div>

                    <button className={styles.btnOutline}>Add Component</button>
                    <button className={styles.btnFilled}>Next</button>
                </div>
            </div>
        );
    }
}
