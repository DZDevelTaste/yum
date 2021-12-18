import React, { Fragment } from 'react';
import Navigation from "./Navigation";
import styles from '../assets/scss/Content.scss'
import Header from './Header';
export default function SiteLayout({children}) {
    return (
        <Fragment>
            <Header />
            <Navigation/>
            <div className={styles.Content}>
                {children}
            </div>
        </Fragment>
    );
}