import React from 'react';

const Patient = ({no, name, gender, rrn, phone, callback}) => {
    return (
        <tr 
            className='patient'
            onClick={(e) => callback(no)}>
            <td>{name}</td>
            <td>{gender === 'M' ? '남' : '여'}</td>
            <td>{rrn}</td>
            <td>{phone}</td>
        </tr>
    );
};

export default Patient;