import React from 'react';

const Patient = ({patient, callback}) => {
    return (
        <tr 
            className='patient'
            onClick={(e) => callback(patient.no)}>
            <td>{patient.name}</td>
            <td>{patient.gender === 'M' ? '남' : '여'}</td>
            <td>{patient.rrn.replace(/([0-9]{6})$/gi, "******")}</td>
            <td>{/-[0-9]{3}-/.test(patient.phone)
                ? patient.phone.replace(/-[0-9]{3}-/g, "-***-")
                : patient.phone.replace(/-[0-9]{4}-/g, "-****-")}
            </td>
        </tr>
    );
};

export default Patient;