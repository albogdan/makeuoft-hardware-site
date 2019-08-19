import React, { PureComponent } from 'react'
import styles from './inventory.module.scss';
import Component from '../../Components/Inventory/Component/Component';
import CheckoutHistory from './../../Components/Inventory/CheckoutHistory/CheckoutHistory';
import { ReactComponent as Search } from './../../Assets/Images/Icons/Search.svg'

const tags = ["All", "MCU", "Shields and Breakout Boards", "Sensors", "Computer Peripherals", "Acuators and speakers", "Power Supply", "Passive", "Mechanical", "A - Z", "Z - A"];


export default class Inventory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: 1, popup: false, popupComponent: null, components: null, showComponents: []}
    fetch('http://localhost:8080/api/inventory')
      .then(response => response.json())
      .then(components => this.setState({ components }));
  }

  sort(num) {
    let { components } = this.state;
    this.setState({ active: num, showComponents: [] });

    if (num === 1) {
      this.setState({showComponents: this.state.components });
    } else if (num === 10) {
      // this.setState({showComponents: this.state.components });
      //write A-Z function
    } else if (num === 11) {
      //write Z-A function
    } else {
      for (let i = 0; i < components.length; i++) {
        for (let j = 0; j < components[i].tags.length; j++) {
          if (components[i].tags[j] === tags[num-1]) {
            this.setState(state => {
              const showComponents = state.showComponents.concat(components[i]);
              return { showComponents };
            });
          }
        }
      }
    }
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

  onkeyupCheck(evt, obj) {
    if (evt.keyCode === 13) {
        // document.getElementById("search-button").click();
    } else if (!obj.value.trim()) {
        // _searchResult = [];
        // displayResult();
    }
}

  render() {
    let { active, popup, popupComponent, components, showComponents } = this.state;
    const inventoryDataRecevied = (components===null);
    let tagButtons = [];
    for (let i = 1; i < tags.length+1; i++) {
        tagButtons.push(<button onClick={() => this.sort(i)} className={active === i ? styles['active'] : null}>{tags[i-1]}</button>);
    }

    return (
      <div className={styles.inventory}>
        {popup &&
            <CheckoutHistory event={popupComponent} close={() => {this.closePopup()}}/>
        }

        <h1>Inventory</h1>
        <div className={styles.inventoryFilters}>
          {tagButtons}
          <div className={styles.inventoryFiltersSearch}>
            <Search />
            <input onkeyup={(event) => this.onkeyupCheck(event, this)} placeholder="Search for a component" />
          </div>
          
        </div>

        <div className={styles.inventoryList}>

          {inventoryDataRecevied ? (
            <p className={styles.inventoryListLoading}>Loading...</p>
          ) : (
            showComponents.map((item, i) => {
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
