import React, { PureComponent } from 'react';
import styles from './checkoutCards.module.scss';
import BasketItem from '../BasketItem/BasketItem';

  
export default class BasketCard extends PureComponent {
    render() {
        const { component, quantity } = this.props;

        return (
            <div className={styles.checkoutBasket}>
                <h2>Basket</h2>
                <div className={styles.checkoutTable}>
                    <p>Component</p>
                    <p>Quantity</p>
                </div>

                <div className={styles.checkoutTableDiv}>
                    <BasketItem component="Arduino" quantity={5}/>
                    <BasketItem component="Arduino" quantity={2}/>
                    <BasketItem component="Arduino" quantity={9}/>
                
                </div>

        </div>       
        );
    }
}
