import React, { PureComponent } from 'react'
import styles from './checkout.module.scss';
import ItemSelector from '../../Components/Checkout/ItemSelector/ItemSelector';
import BasketItem from '../../Components/Checkout/BasketItem/BasketItem';
// import CheckoutCard from '../../Components/Checkout/CheckoutCards/CheckoutCard';
// import BasketCard from '../../Components/Checkout/CheckoutCards/BasketCard';
import { quantity, groupedOptions } from './../../Components/Checkout/CheckoutCards/testData';
import { ReactComponent as Close } from './../../Assets/Images/Icons/x.svg';

const formatGroupLabel = data => (
  <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.17em 0.5em',
  textAlign: 'center',
};

let basket = [];

export default class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: false, popup: false, addField: 3 }
  }

  addField = () => {
      this.setState({ addField: this.state.addField + 1 });
  };

  addBasket = (array) => {
      array.push(
          <BasketItem component="Arduino" quantity={5} />
      )
      console.log(array[0])
  };

  render() {
    let componentField = [];

    for (var i = 0; i < this.state.addField; i ++) {
      componentField.push(
        <div className={styles.checkoutTableDivItem} key={i}>
          <Close className={styles.checkoutTableDivItemClose} />
          <ItemSelector type="component" 
            options={groupedOptions}
            formatGroupLabel={formatGroupLabel}
            onBlur={() => this.addBasket(basket)}/>
              
          <ItemSelector type="quantity" 
            defaultValue={quantity[0].label}
            options={quantity}/>
        </div>
      );
    };

    return (
      <div className={styles.checkout}>
        <div className={styles.checkoutDiv}>
          <div className={styles.checkoutList}>
            <h2>Team Information</h2>
            <div className={styles.checkoutTable}>
              <p>Team Number</p>
            </div>
            
            <div className={styles.checkoutTableDiv} style={{marginBottom: 40}}>
              <div className={styles.checkoutTableDivItem}>
                <ItemSelector type="team" 
                    options={groupedOptions} />
              </div>
            </div>

            <h2>Checkout</h2>

            <div className={styles.checkoutTable}>
              <p>Component</p>
              <p>Quantity</p>
            </div>

            <div className={styles.checkoutTableDiv}>
              {componentField}

              <button className={styles.btnOutline} onClick={()=>this.addField()}>Add Component</button>
              <button className={styles.btnFilled} type={"submit"}>Submit</button>
            </div>
          </div>
        </div>

        <div className={styles.checkoutDiv}>
          <div className={styles.checkoutBasket}>
            <h2>Basket</h2>
            <div className={styles.checkoutTable}>
              <p>Component</p>
              <p>Quantity</p>
            </div>

            <div className={styles.checkoutTableDiv}>
              {basket}
              <BasketItem component="Arduino" quantity={5}/>
              <BasketItem component="Arduino" quantity={2}/>
              <BasketItem component="Arduino" quantity={9}/>
            </div>
          </div>     
        </div>         
      </div>
    )
  }
}
