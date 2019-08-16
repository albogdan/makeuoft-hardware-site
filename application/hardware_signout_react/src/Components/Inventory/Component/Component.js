import React, { PureComponent } from 'react'
import styles from './component.module.scss';


export default class Component extends PureComponent {

    render() {
        let { item, total, left, open, isCheckout} = this.props;

        return (
            <div className={`${styles.component} ${isCheckout ? styles['checkout'] : null}`} onClick={open}>
<<<<<<< HEAD
                <img src={require('./../../../Assets/Images/Components/' + 'Arduino' + '.png')} alt={item} ></img>
=======
                <img src={require('./../../../Assets/Images/Components/' + item + '.jpg')} alt={item} ></img>
>>>>>>> 505855545738a088700c1461aa41fbe64e46d470
                <div className={styles.componentDiv}>
                <p className={styles.componentDivName}>{item}</p>
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
