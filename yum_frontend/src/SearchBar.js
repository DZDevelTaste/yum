import React from 'react';
import styles from './assets/scss/SearchBar.scss'

const SearchBar = ({keyword, callback}) => {
    return (
        <div className={styles.Searchbar}>
            <input type='text' placeholder='환자 검색' value={keyword} onChange={(e) => callback(e.target.value)}/>
        </div>
    );
};

export default SearchBar;