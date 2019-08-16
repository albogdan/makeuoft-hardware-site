import React, { PureComponent } from 'react'
import styles from './inventory.module.scss';
import Component from '../../Components/Inventory/Component/Component';
import CheckoutHistory from './../../Components/Inventory/CheckoutHistory/CheckoutHistory';

const tags = ["MCUs", "Shields and Breakout Boards", "Sensors", "Computer Peripherals", "Acuators and speakers", "Power Supply", "Passive", "Mechanical", "A - Z", "Z - A"];
const components = [
  {item: "Arduino", total: 5, left: 3, tags: ["MCUs", "test", "blah", "yo"], },
  {item: "Raspberry Pi", total: 5, left: 3, tags: ["MCUs", "test", "blah"], },
  {item: "LaunchPad", total: 5, left: 3, tags: ["MCUs", "test", "blah"], },
  {item: "Photon Board", total: 5, left: 3, tags: ["MCUs", "test", "blah"], },
  {item: "NodeMCU", total: 5, left: 3, tags: ["MCUs", "test", "blah"], },
  {item: "Electron", total: 5, left: 3, tags: ["MCUs", "test", "blah"], },
  {item: "LED - red", total: 5, left: 3, tags: ["MCUs", "test", "blah"], },
  {item: "LED - yellow", total: 5, left: 3, tags: ["MCUs", "test", "blah"], },
  {item: "LED - blue", total: 5, left: 3, tags: ["MCUs", "test", "blah"], }
]

export default class Inventory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: false, popup: false, popupComponent: null }
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
    let { active, popup, popupComponent } = this.state;

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
          {components.map((item, i) =>
            <Component item={item.item} total={item.total} left={item.left} open={ () => {this.openPopup(); this.renderPopupComponent(item)}} />
          )}
        </div>
      </div>
      
    )
  }
}
