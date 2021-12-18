import React from 'react';
import style from '../assets/scss/admin/adminMain.scss'
const MedicineSearch = ({keyword, callback}) => {
    return (
        <div className={style.searchBar}>
            <input type='text' placeholder='사용자 검색' value={keyword} onChange={(e) => callback(e.target.value)} />
        </div>
    );
};

export default MedicineSearch;