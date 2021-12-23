import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import styles from './assets/scss/SearchBar.scss'

const SearchBar = ({keyword, setKeyword, title}) => {
    return (
        <div className={styles.Searchbar}>
            <input type='text' placeholder={title} value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon}/>
        </div>
    );
};

export default SearchBar;