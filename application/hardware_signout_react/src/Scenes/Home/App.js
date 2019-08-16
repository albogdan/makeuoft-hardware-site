import React, { PureComponent } from 'react'
import styles from './App.module.scss';
import TeamCard from './../../Components/Home/TeamCard/TeamCard';
import AddTeamCard from '../../Components/Home/AddTeamCard/AddTeamCard';
import OverviewCard from '../../Components/Home/OverviewCard/OverviewCard';
import CreateTeam from '../../Components/General/CreateTeam/CreateTeam';

const teams = [
  {index: 1, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 2, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 3, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 4, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 5, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 6, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 7, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 8, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] },
  {index: 9, members: [{name:"Lisa Li", id: false}, {name: "Alex Bodgan", id: true}, {name: "Martin FFrench", id: true}, {name: "Nhien Tran-Nguyen", id: false}] }
]
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

            {teams.map((item, i) =>
              <TeamCard teamNumber={item.index} members={item.members}/>
            )}
          </div>
        </div>
      </div>

    )
  }
}
