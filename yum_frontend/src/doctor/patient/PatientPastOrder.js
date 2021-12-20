import React, { useEffect, useState } from 'react';
import PatientOrderList from './PatientOrderList';
import style from '../../assets/scss/component/doctor/patient/PatientPastOrder.scss';

const patientPastOrder = ({patientNo}) => {

    const [diagnosisList, setDiagnosisList] = useState({});

    useEffect(() => {
        fetchPatient();
    }, [patientNo]);

    const fetchPatient = async() => {
        try {
            const response = await fetch(`/api/doctor/patientInfo/${patientNo}`, {
                method: 'get',
                mode: 'cors',  
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            if(json.result !== 'success') {
                throw json.message;
            }
            setDiagnosisList(json.data.diagnosisList);   

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={style.pastOrderTitle}>
            내원 기록
            </div>
            <div className={style.pastOrderContents} >
                <div className={style.menu}>
                    <div className={style.orderDtAndUsInfo}>내원일</div>
                    <div className={style.orderDtAndUsInfo}>담당의</div>
                    <div className={style.orderDisAndCliInfo}>병명</div>
                    <div className={style.orderDisAndCliInfo}>처방</div>
                </div>
                <PatientOrderList diagnosisList={diagnosisList}/>
            </div>
            
        </>
    );
};

export default patientPastOrder;