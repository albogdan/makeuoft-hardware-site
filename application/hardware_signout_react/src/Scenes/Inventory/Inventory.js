import React, { PureComponent } from 'react'
import styles from './inventory.module.scss';
import Component from '../../Components/Inventory/Component/Component';
import CheckoutHistory from './../../Components/Inventory/CheckoutHistory/CheckoutHistory';

const tags = ["MCUs", "Shields and Breakout Boards", "Sensors", "Computer Peripherals", "Acuators and speakers", "Power Supply", "Passive", "Mechanical", "A - Z", "Z - A"];


export default class Inventory extends PureComponent {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = { active: false, popup: false, popupComponent: null, components: null}
    fetch('http://localhost:8080/api/inventory')
      .then(response => response.json())
      .then(inventory => this.setState({ inventory }));
  }

=======
    this.state = { active: false, popup: false, popupComponent: null }
  }

>>>>>>> 505855545738a088700c1461aa41fbe64e46d470
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

<<<<<<< HEAD

  renderPopupComponent = (event) => {
    this.setState({popupComponent: event})
  }


  render() {
    let { active, popup, popupComponent, components } = this.state;
    const inventoryDataRecevied = (inventory===null);
=======
  renderPopupComponent = (event) => {
    this.setState({popupComponent: event})
  }


  render() {
    let { active, popup, popupComponent } = this.state;

>>>>>>> 505855545738a088700c1461aa41fbe64e46d470
    let tagButtons = [];
    for (let i = 1; i < tags.length+1; i++) {
        tagButtons.push(<button onClick={() => this.sort(i)} className={active == i ? styles['active'] : null}>{tags[i-1]}</button>);
    }
<<<<<<< HEAD

    return (
      <div className={styles.inventory}>
        {popup &&
=======

    return (
      <div className={styles.inventory}>
        {popup &&
>>>>>>> 505855545738a088700c1461aa41fbe64e46d470
            <CheckoutHistory event={popupComponent} close={() => {this.closePopup()}}/>
        }

        <h1>Inventory</h1>
        <div className={styles.inventoryFilters}>
          {tagButtons}
        </div>

        <div className={styles.inventoryList}>
<<<<<<< HEAD

          {inventoryDataRecevied ? (
            <p>Loading...</p>
          ) : (
            components.map((item, i) => {
              return (
                <Component item={item.name}total={item.total} left={item.available} open={ () => {this.openPopup(); this.renderPopupComponent(item)}} />
              )
            })
          )}


=======
          {components.map((item, i) =>
            <Component item={item.item} total={item.total} left={item.left} open={ () => {this.openPopup(); this.renderPopupComponent(item)}} />
          )}
>>>>>>> 505855545738a088700c1461aa41fbe64e46d470
        </div>
      </div>

    )
  }
}
