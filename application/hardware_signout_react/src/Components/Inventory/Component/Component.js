import React, { PureComponent } from 'react'
import styles from './component.module.scss';


export default class Component extends PureComponent {

    render() {
        let { item, total, left, open, isCheckout} = this.props;

        return (
            <div className={`${styles.component} ${isCheckout ? styles['checkout'] : null}`} onClick={open}>
                <img src={require('./../../../Assets/Images/Components/' + item + '.png')} alt={item} ></img>
                <div className={styles.componentDiv}>
                <p className={styles.componentDivName}>Arduino</p>
                {(left > 0) &&
                    <p className={styles.componentDivStock}>{left} of {total} in stock</p>
                }
                {(left === 0) &&
                    <p className={styles.componentDivStock}>OUT OF STOCK</p>
                }
                </div>
            </div>
        )
    }
}
