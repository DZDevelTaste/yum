import React, { Fragment } from 'react';
import Navigation from "./Navigation";
import styles from '../assets/scss/Content.scss'
export default function SiteLayout({children}) {
    return (
        <Fragment>
            <Navigation/>
            <div className={styles.Content}>
                {children}
            </div>
        </Fragment>
    );
}