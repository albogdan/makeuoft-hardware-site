import React, { PureComponent } from 'react';
import styles from './basketItem.module.scss';

  
export default class BasketItem extends PureComponent {
    render() {
        const { component, quantity } = this.props;

        return (
            <div className={styles.basketItem}>
                <div className={styles.basketItemItem}>
                    <img src={require('./../../../Assets/Images/Components/' + component + '.png')} alt={component} ></img>
                    <p>{component}</p>
                </div>
               
                <p className={styles.basketItemQuantity}>{quantity}</p>
            </div>
        );
    }
}