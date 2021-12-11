import React, { useEffect, useState } from 'react';
import PatientOrderList from './PatientOrderList';

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

    const divStyle ={
        border: '1px solid black',
        width: 700,
        height: 300,
        float: 'left',
    }

    return (
        <div id='patientPastOrder' style={divStyle}>
            과거 이력
            <div id=''>
                <span style={{display:'block', width: 175+'px', textAlign: 'center', float: 'left'}}>내원일</span>
                <span style={{display:'block', width: 175+'px', textAlign: 'center', float: 'left'}}>담당의</span>
                <span style={{display:'block', width: 175+'px', textAlign: 'center', float: 'left'}}>병명</span>
                <span style={{display:'block', width: 175+'px', textAlign: 'center', float: 'left'}}>처방</span>
            </div>
            <PatientOrderList diagnosisList={diagnosisList}/>
        </div>
    );
};

export default patientPastOrder;