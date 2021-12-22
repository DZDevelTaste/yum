import React, { useState } from 'react';
import styles1 from '../assets/scss/Content.scss';
import SiteLayout from '../layout/SiteLayout';
import PatientInfo from './PatientInfo';
import Patients from './Patients';


const PatientList = () => {
    const [currentPatientNo, setCurrentPatientNo] = useState(0);
    const [updatePatient, setUpdatePatient] = useState({});
    
    return (
        <SiteLayout>
            <div className={styles1.LeftBox}>
                <Patients 
                    setCurrentPatientNo={setCurrentPatientNo}
                    updateInfo={updatePatient}/>
            </div>
            <div className={styles1.RightBox}>
                <PatientInfo 
                    setUpdatePatient={setUpdatePatient}
                    no={currentPatientNo} />
            </div>
        </SiteLayout>
    );
};

export default PatientList;