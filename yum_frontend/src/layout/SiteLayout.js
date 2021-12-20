import React, { Fragment } from 'react';
import Navigation from "./Navigation";
import styles from '../assets/scss/Content.scss'
<<<<<<< HEAD

export default function SiteLayout({children}) {
    return (
        <Fragment>
=======
import Header from './Header';
export default function SiteLayout({children}) {
    return (
        <Fragment>
            <Header />
>>>>>>> origin/master
            <Navigation/>
            <div className={styles.Content}>
                {children}
            </div>
        </Fragment>
    );
}