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
      test: undefined
    };
  }
  async componentDidMount() {
    let testRequest = await fetch('http://localhost:8080/api/test');
    this.setState({ test: testRequest});
  }

  openPopup() {
    this.setState({popup: true});
  }

  closePopup() {
    this.setState({popup: false});
  }

  render() {
    let { popup } = this.state;

    return (
      <div className={styles.home}>

        {popup &&
          <CreateTeam close={() => {this.closePopup()}} />
        }

        <div className={styles.overview}>
          <h2>Overview</h2>

          <div className={styles.teamList}>
            <OverviewCard ombre="orange" value={25}/>
            <OverviewCard ombre="purple" value="16 Teams"/>
            <OverviewCard ombre="purple" value={16}/>
          </div>

        </div>

        <div className={styles.team}>
          <h2>Teams</h2>

          <div className={styles.teamList}>
            <AddTeamCard open={() => {this.openPopup()}} />
            <TeamCard teamNumber={1}/>
            <TeamCard teamNumber={2}/>
            <TeamCard teamNumber={3}/>
            <TeamCard teamNumber={4}/>
            <TeamCard teamNumber={5}/>
            <TeamCard teamNumber={6}/>
            <TeamCard teamNumber={7}/>
            <TeamCard teamNumber={8}/>
          </div>
        </div>
      </div>

    )
  }
}
