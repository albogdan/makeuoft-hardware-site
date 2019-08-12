import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Scenes/Home/App';
import Inventory from './Scenes/Inventory/Inventory';
import Checkout from './Scenes/Checkout/Checkout';
import { Link } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import NavBar from './Components/General/Navbar/Navbar'
import ScrollToTop from './Assets/ScrollToTop'


class MyApp extends React.PureComponent {
    render() {
        return (
            <div>
                <Router>
                    <ScrollToTop>
                        <NavBar />
                        <div className="indexContainer">
                            <Route exact path="/" component={App} />
                            <Route path="/inventory" component={Inventory} />
                            <Route path="/checkout" component={Checkout} />
                        </div>
                    </ScrollToTop>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<MyApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();