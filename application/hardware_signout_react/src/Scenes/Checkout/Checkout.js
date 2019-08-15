import React, { PureComponent } from 'react'
import styles from './checkout.module.scss';
import ItemSelector from '../../Components/Checkout/ItemSelector/ItemSelector';
import BasketItem from '../../Components/Checkout/BasketItem/BasketItem';
import CheckoutCard from '../../Components/Checkout/CheckoutCards/CheckoutCard';
import BasketCard from '../../Components/Checkout/CheckoutCards/BasketCard';

export default class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: false, popup: false }
  }
  
  render() {
    return (
      <div className={styles.checkout}>
        <div className={styles.checkoutDiv}>
          <CheckoutCard />
        </div>

        <div className={styles.checkoutDiv}>
          <BasketCard />
        </div>         
      </div>
    )
  }
}
