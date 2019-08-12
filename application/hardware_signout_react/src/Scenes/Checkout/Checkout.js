import React, { PureComponent } from 'react'
import styles from './checkout.module.scss';

export default class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: false, popup: false }
  }
  
  render() {
    return (
      <div className={styles.checkout}>
        <div className={styles.checkoutList}>
          <h2>Checkout</h2>

          <div className={styles.checkoutTable}>
            <p>Component</p>
            <p>Quantity</p>
          </div>


        </div>
        <div className={styles.checkoutBasket}>
          <h2>Basket</h2>
          <div className={styles.checkoutTable}>
            <p>Component</p>
            <p>Quantity</p>
          </div>

        </div>        
      </div>
    )
  }
}
