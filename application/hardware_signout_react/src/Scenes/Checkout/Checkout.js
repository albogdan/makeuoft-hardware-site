import React, { PureComponent } from 'react'
import styles from './checkout.module.scss';
import ItemSelector from '../../Components/Checkout/ItemSelector/ItemSelector';
import BasketItem from '../../Components/Checkout/BasketItem/BasketItem';
// import CheckoutCard from '../../Components/Checkout/CheckoutCards/CheckoutCard';
// import BasketCard from '../../Components/Checkout/CheckoutCards/BasketCard';
import QuantitySelect from '../../Components/Checkout/ItemSelector/QuantitySelect';
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

let basket = []

export default class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      addFields: [{name: "", stock: 0}, {name: "", stock: 0}, {name: "", stock: 0}], selectedComponents: [], 
      selectedField: null }
    this.getItem = this.getItem.bind(this)
  }

  getItem(evt, index) {
    this.setState({selectedField: evt})

    this.setState(state => {
      const addFields = state.addFields.map((item, j) => {
        if (j === index) {
          item.stock = evt.stock
          item.name = evt.label
          return item;
        } else {
          return item;
        }
      });

      return {
        addFields
      };
    });
  }

  addToBasket = (index, quantity) => {

    {quantity && 
    this.setState(state => {
      let found = false;

      const selectedComponents = state.selectedComponents.map((item, j) => {
        if (j === index) {
          item.name = this.state.addFields[index].name;
          item.quantityLeft = quantity.label;
          item.key = quantity.index;
          found = true;
          return item;
        } else {
          return item;
        }
      });

      if (!found) {
        selectedComponents.push({name: this.state.addFields[index].name, quantityLeft: quantity.label, key: index})
      }

      return {
        selectedComponents
      };
    });
    }
  }

  render() {
    let componentField = [];
    let { addFields, selectedComponents } = this.state;
    const basketEmpty = (basket === null);

    for (var i = 0; i < addFields.length; i ++) {
      componentField.push(
        <div className={styles.checkoutTableDivItem} fieldIndex={i}>
          <Close className={styles.checkoutTableDivItemClose} />
          <ItemSelector type="component"
            options={groupedOptions}
            formatGroupLabel={formatGroupLabel}
            selectItem={this.getItem}
            fieldIndex={i} />

          <QuantitySelect 
            selectQuantity={this.addToBasket} 
            fieldIndex={i}
            quantity={addFields[i] ? addFields[i].stock : 0 } />
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

              {/* <button className={styles.btnOutline} onClick={()=>this.addField()}>Add Component</button> */}
              <button className={styles.btnOutline}>Add Component</button>
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
              {!basketEmpty && 
                  (selectedComponents || []).map((item, i) => {
                    return (
                      <BasketItem component={item.name} quantity={item.quantityLeft} key={item.key} />
                    )
                  }
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
