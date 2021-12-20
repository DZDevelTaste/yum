import React from 'react';
import style from '../../assets/scss/medicine/MedicineMain.scss'

const MedicineSearch = ({keyword, callback}) => {
    return (
        <div className={style.searchBar}>
            <input type='text' placeholder='의약품 검색' value={keyword} onChange={(e) => callback(e.target.value)} />
        </div>
    );
};

export default MedicineSearch;