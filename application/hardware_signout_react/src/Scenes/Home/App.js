import React, { PureComponent } from 'react'
import styles from './App.module.scss';
import TeamCard from './../../Components/Home/TeamCard/TeamCard';
import AddTeamCard from '../../Components/Home/AddTeamCard/AddTeamCard';
import OverviewCard from '../../Components/Home/OverviewCard/OverviewCard';
import CreateTeam from '../../Components/General/CreateTeam/CreateTeam';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      test: undefined,
      teams: null,
      info: null
    };
    fetch('http://localhost:8080/api/teamlist')
      .then(response => response.json())
      .then(teams => this.setState({ teams }));
    fetch('http://localhost:8080/api/info')
      .then(response => response.json())
      .then(info => this.setState({ info }));
  }

  openPopup() {
    this.setState({popup: true});
  }

  closePopup() {
    this.setState({popup: false});
  }

  render() {
    let { popup, teams, info } = this.state;
    const teamsDataReceived = (teams===null);
    const infoDataReceived = (info===null);

    return (
      <div className={styles.home}>
        {popup &&
          <CreateTeam close={() => {this.closePopup()}} />
        }
        <h1 style={{marginTop: 50}}>MakeUofT Hardware Signout</h1>

        <div className={styles.overview}>
          <h2>Overview</h2>

          <div className={styles.teamList}>
            {infoDataReceived ? (
                <OverviewCard ombre="orange" value="Loading..."/>
            ) : (
              <React.Fragment>
                <OverviewCard ombre="blue" value={ `${info.partsout} / ${info.partsall} parts out` }/>
                <OverviewCard ombre="orange" value={ `${info.teamcount} Teams` }/>
                <OverviewCard ombre="purple" value={ `${info.usercount} Participants` }/>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className={styles.team}>
          <h2>Teams</h2>

          <div className={styles.teamList}>
            <AddTeamCard open={() => {this.openPopup()}} />
            {teamsDataReceived ? (
                <p className={styles.inventoryListLoading}>Loading...</p>
            ) : (
              teams.map((item, i) => {
                return (
                  <TeamCard teamNumber={item.index} members={item.members}/>
                )
              })
            )}
          </div>
        </div>
      </div>
    )
  }
}
