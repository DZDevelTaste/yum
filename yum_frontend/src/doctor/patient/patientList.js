import React, { useState } from 'react';
import patientState from './patientState';

const patientList = () => {
    const [patientNo, setPatientNo] = useState(0);
    return (
        <div id='patientList'>
            환자 리스트
            <patientState />
            <patientInfo patientNo={patientNo} />
            <patientPastOrder patientNo={patientNo} />
        </div>
    );
};

export default patientList;