import React, { PureComponent } from 'react'
import styles from './inventory.module.scss';
import Component from '../../Components/Inventory/Component/Component';
import CheckoutHistory from './../../Components/Inventory/CheckoutHistory/CheckoutHistory';

export default class Inventory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: false, popup: false }
  }
  
  // WRITE A SORT FUNCTION
  sort(num) {
    this.setState({ active: num });
  }

  openPopup() {
    this.setState({popup: true});
  }

  closePopup() {
    this.setState({popup: false});
  }
  
  render() {
    let { active, popup } = this.state;
    
    return (
      <div className={styles.inventory}>
        {popup && 
            <CheckoutHistory close={() => {this.closePopup()}}/>
        }
            
        <h1>Inventory</h1>
        <div className={styles.inventoryFilters}>
          <button onClick={() => this.sort(1)} className={active == 1 ? styles['active'] : null}>MCUs</button>
          <button onClick={() => this.sort(2)} className={active == 2 ? styles['active'] : null}>Boards</button>
          <button onClick={() => this.sort(3)} className={active == 3 ? styles['active'] : null}>Sensors</button>
          <button onClick={() => this.sort(4)} className={active == 4 ? styles['active'] : null}>Actuators</button>
          <button onClick={() => this.sort(5)} className={active == 5 ? styles['active'] : null}>Peripherals</button>
          <button onClick={() => this.sort(6)} className={active == 6 ? styles['active'] : null}>Misc Components</button>
          <button onClick={() => this.sort(7)} className={active == 7 ? styles['active'] : null}>Mechanical Components</button>
          <button onClick={() => this.sort(8)} className={active == 8 ? styles['active'] : null}>A - Z</button>
          <button onClick={() => this.sort(9)} className={active == 9 ? styles['active'] : null}>Z - A</button>
        </div>

        <div className={styles.inventoryList}>
          <Component item="Arduino" total={36} left={0} open={ () => {this.openPopup()}} />
          <Component item="Arduino" total={36} left={16} open={ () => {this.openPopup()}}/>
          <Component item="Arduino" total={36} left={12} open={ () => {this.openPopup()}}/>
          <Component item="Arduino" total={36} left={6} open={ () => {this.openPopup()}}/>
          <Component item="Arduino" total={36} left={29} open={ () => {this.openPopup()}}/>
          <Component item="Arduino" total={36} left={26} open={ () => {this.openPopup()}} />
          <Component item="Arduino" total={36} left={0} open={ () => {this.openPopup()}} />
        </div>
      </div>
      
    )
  }
}
