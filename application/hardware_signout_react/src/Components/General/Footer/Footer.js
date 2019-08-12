import React, { PureComponent } from 'react';
import styles from './footer.module.scss';
import LogoWhite from './../../../Assets/Images/Logo/White.png';

export default class Footer extends PureComponent {

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    render() {
        return (
            <footer>
                <div className={styles['footer']}>
                    <img className={styles['logo']} src={LogoWhite} alt="Li." />
                    <div className={styles['footer-creds']}>
                        <p className={styles['footer-hear-from-you']}>I'd love to hear from you</p> 
                        <p className={styles['footer-email']}>FOR BUSINESS INQUIRIES</p> 
                        <a className={styles['footer-email']} href={"mailto:lisasa.li@mail.utoronto.ca"}>lisasa.li@mail.utoronto.ca</a>
                    </div>
                    <p className={styles['footer-to-top']} onClick={() => {this.scrollToTop()}}>Back to top</p>
                </div>
            </footer>
        )
    }
}
