import React from 'react';

const Patient = ({patient, callback}) => {
    return (
        <tr 
            className='patient'
            onClick={(e) => callback(patient.no)}>
            <td>{patient.name}</td>
            <td>{patient.gender === 'M' ? '남' : '여'}</td>
            <td>{patient.rrn}</td>
            <td>{patient.phone}</td>
        </tr>
    );
};

export default Patient;