import React from 'react';
import patient from './patient';

const patientInfo = (patients) => {
    return (
        <ul>
            <li>
                {
                    patients.map( (patient) => <patient name={name} state={state}/>)
                }
            </li>
        </ul>
    );
};

export default patientInfo;