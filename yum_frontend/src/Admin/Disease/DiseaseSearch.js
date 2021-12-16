import React from 'react';

const MedicineSearch = ({keyword, callback}) => {
    return (
        <div>
            검색: <input type='text' placeholder='검색' value={keyword} onChange={(e) => callback(e.target.value)} />
        </div>
    );
};

export default MedicineSearch;