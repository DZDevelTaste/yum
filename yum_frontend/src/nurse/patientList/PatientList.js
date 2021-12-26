import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from '../../assets/scss/Content.scss';
import SiteLayout from '../../layout/SiteLayout';
import Patients from '../Patients';
import PatientInfo from './PatientInfo';



const PatientList = () => {
    const [currentPatientNo, setCurrentPatientNo] = useState(0);
    const [updatePatient, setUpdatePatient] = useState({});
    const [changeAddForm, setChangeAddForm] = useState(false);
    const addPatient = () => {
        
    }

    return (
        <SiteLayout>
            <div className={`${styles.LeftBox} ${styles.oneBox}`}>
                <Patients 
                    setCurrentPatientNo={setCurrentPatientNo}
                    updateInfo={updatePatient}/>
                <FontAwesomeIcon 
                    icon={faPlusCircle}
                    size='3x'
                    color='#6599FF'
                    className={styles.plusIcon}
                    onClick={() => setChangeAddForm(true)}/>
            </div>
            <div className={`${styles.RightBox} ${styles.PatientBox}`}>
                <PatientInfo 
                    setUpdatePatient={setUpdatePatient}
                    currentPatientNo={currentPatientNo}
                    setCurrentPatientNo={setCurrentPatientNo}
                    changeAddForm = {changeAddForm}
                    setChangeAddForm = {setChangeAddForm}/>
            </div>
        </SiteLayout>
    );
};

export default PatientList;