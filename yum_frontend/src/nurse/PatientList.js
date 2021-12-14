import React, { useState } from 'react';
import styles1 from '../assets/scss/Content.scss';
import SiteLayout from '../layout/SiteLayout';
import PatientInfo from './PatientInfo';
import Patients from './Patients';


const PatientList = () => {
    const [selectNo, setSelectNo] = useState('');
    const [updateInfo, setUpdateInfo] = useState(false);


    const notifyNoChange = (selectNo) => {
        setSelectNo(selectNo);
    }
    const notifyInfoChange = (chkResult) => {
        setUpdateInfo(chkResult);

        setUpdateInfo(false);
    }
    
    return (
        <SiteLayout>
            <div className={styles1.leftBox}>
                <Patients 
                    callback={notifyNoChange}
                    updateInfo={updateInfo}/>
            </div>
            <div className={styles1.rightBox}>
                <PatientInfo 
                    callback={notifyInfoChange}
                    no={selectNo} />
            </div>
        </SiteLayout>
    );
};

export default PatientList;