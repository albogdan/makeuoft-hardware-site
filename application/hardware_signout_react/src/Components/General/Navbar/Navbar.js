import React, { PureComponent } from 'react'
import styles from './navbar.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './../../../Assets/Images/Icons/logo.svg';
import { ReactComponent as Home } from './../../../Assets/Images/Icons/house logo.svg';
import { ReactComponent as Team } from './../../../Assets/Images/Icons/team logo.svg';
import { ReactComponent as Inventory } from './../../../Assets/Images/Icons/inventory.svg';
import { ReactComponent as Checkout } from './../../../Assets/Images/Icons/cart logo.svg';

export default class Navbar extends PureComponent {
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Logo />

                    <Link to={'/'}>
                        <Home />
                    </Link>
                    
                    {/* <Team /> */}

                    <Link to={'/inventory'}>
                        <Inventory />
                    </Link>

                    <Link to={'/checkout'}>
                        <Checkout />
                    </Link>
                    
                </div>
            </header>
        )
    }
}
