import React, { PureComponent } from 'react'
import styles from './createTeam.module.scss';
// import { Link } from 'react-router-dom';
import AddTeamSelector from './../../Checkout/ItemSelector/AddTeamSelector';
import {ReactComponent as Close } from './../../../Assets/Images/Icons/x.svg'


export default class CreateTeam extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
    addTeam(){
      // console.log("Team to checkout:", this.state.selectedTeam.value);
      // console.log("ITEMS TO DO:", this.state.basketHardwares);
      // var itemList = [];
      // for(var i=0; i<this.state.basketHardwares.length; i++){
      //   itemList.push({"name": this.state.basketHardwares[i].name,
      //                  "quantity":this.state.basketHardwares[i].selectedQuantity });
      // }
      //
      // var data = {
      //   "team" : this.state.selectedTeam.value,
      //   "items" :  itemList
      // }
      // console.log("DATA", data);
      //
      // fetch('http://localhost:80/api/checkoutitems', {
      //   method: "POST",
      //   body:JSON.stringify(data)
      // })
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .then(function(data){
      //     console.log(data);
      //   });

    }
    render() {
        let { close } = this.props;

        let memberField = [];
        for (let i=1; i<5; i++) {
            memberField.push(
                <div className={styles.popupCardMember}>
                    <label for={`member-${i}`} className={styles.popupCardMemberLabel}>Member {i}:</label>
                    <AddTeamSelector id={`member-${i}`} />
                    <label for={`id-${i}`} className={styles.popupCardMemberIDLabel}>ID: </label>
                    <input type="checkbox" id={`id-${i}`} />
                </div>
            )
        }

        return (
            <div className={styles.overlay}>
                <div className={styles.popup} onClick={close}></div>
                <div className={styles.popupCard}>
                    <Close onClick={close} className={styles.popupCardClose} />
                    <p className={styles.popupCardHeading}>Create Team</p>
                    <p className={styles.popupCardMsg}>Teams must have at least 2 members decided when signing up their team</p>

                    {memberField}
                    <button onClick={close}>Add Team</button>
                </div>
            </div>
        )
    }
}
