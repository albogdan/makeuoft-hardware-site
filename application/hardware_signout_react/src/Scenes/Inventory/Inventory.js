import React, { PureComponent } from 'react'
import styles from './inventory.module.scss';
import Component from '../../Components/Inventory/Component/Component';
import CheckoutHistory from './../../Components/Inventory/CheckoutHistory/CheckoutHistory';

const tags = ["MCUs", "Shields and Breakout Boards", "Sensors", "Computer Peripherals", "Acuators and speakers", "Power Supply", "Passive", "Mechanical", "A - Z", "Z - A"];


export default class Inventory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: false, popup: false, popupComponent: null, components: null}
    fetch('http://localhost:8080/api/inventory')
      .then(response => response.json())
      .then(components => this.setState({ components }));
  }

  sort(num) {
    // WRITE A SORT FUNCTION
    this.setState({ active: num });
  }

  openPopup() {
    this.setState({popup: true});
  }

  closePopup() {
    this.setState({popup: false});
  }

  renderPopupComponent = (event) => {
    this.setState({popupComponent: event})
  }

  render() {
    let { active, popup, popupComponent, components } = this.state;
    const inventoryDataRecevied = (components===null);
    let tagButtons = [];
    for (let i = 1; i < tags.length+1; i++) {
        tagButtons.push(<button onClick={() => this.sort(i)} className={active == i ? styles['active'] : null}>{tags[i-1]}</button>);
    }

    return (
      <div className={styles.inventory}>
        {popup &&
            <CheckoutHistory event={popupComponent} close={() => {this.closePopup()}}/>
        }

        <h1>Inventory</h1>
        <div className={styles.inventoryFilters}>
          {tagButtons}
        </div>

        <div className={styles.inventoryList}>

          {inventoryDataRecevied ? (
            <p className={styles.inventoryListLoading}>Loading...</p>
          ) : (
            components.map((item, i) => {
              return (
                <Component item={item.name} total={item.total} left={item.available} open={ () => {this.openPopup(); this.renderPopupComponent(item)}} />
              )
            })
          )}
        </div>
      </div>

    )
  }
}
