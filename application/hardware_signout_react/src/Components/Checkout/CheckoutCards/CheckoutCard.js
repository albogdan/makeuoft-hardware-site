import React, { PureComponent } from 'react';
import styles from './checkoutCards.module.scss';
import ItemSelector from '../ItemSelector/ItemSelector';
import { Link } from 'react-router-dom';
import { quantity, groupedOptions } from './testData';
import BasketItem from '../BasketItem/BasketItem';

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
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

let basket = [];

export default class CheckoutCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { addField: 3 }
    }

    addField = () => {
        this.setState({ addField: this.state.addField + 1 });
    };

    addBasket = () => {
        basket.push(
            <BasketItem component="Arduino" quantity={5} />
        )
    };

    render() {
        let componentField = [];

        for (var i = 0; i < this.state.addField; i ++) {
            componentField.push(
                <div className={styles.checkoutTableDivItem}>
                    <ItemSelector type="component" 
                        options={groupedOptions}
                        formatGroupLabel={formatGroupLabel}
                        onChange={() => this.addBasket()}
                        />
                        
                    <ItemSelector type="quantity" 
                        defaultValue={quantity[0].label}
                        options={quantity}/>
                </div>
            );
        };
        
        return (
            <div className={styles.checkoutList}>
                <h2>Team Information</h2>
                <div className={styles.checkoutTable}>
                    <p>Team Number</p>
                </div>
                
                <div className={styles.checkoutTableDiv} style={{marginBottom: 40}}>
                    <div className={styles.checkoutTableDivItem}>
                        <ItemSelector type="team" 
                            options={groupedOptions}
                            />
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

                    {basket}
                </div>
            </div>
        );
    }
}