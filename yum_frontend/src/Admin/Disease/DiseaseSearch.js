import React from 'react';
import style from '../../assets/scss/disease/DiseaseMain.scss';
const MedicineSearch = ({keyword, callback}) => {
    return (
        <div className={style.searchBar}>
            <input type='text' placeholder='검색' value={keyword} onChange={(e) => callback(e.target.value)} />
        </div>
    );
};

export default MedicineSearch;