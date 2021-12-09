import React, { useEffect, useState } from 'react';

const patientInfo = ({patientNo}) => {
    console.log("patientInfo:", patientNo);
    const [patient, setPatient] = useState({});

    useEffect(() => {
        fetchPatient();
    }, [patientNo]);

    const fetchPatient = async() => {
        console.log("fetchPatient:", patientNo);
        try {
            console.log("fetchPatientInTry:", patientNo);
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

            setPatient(json.data);
            console.log(json.data);
            

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id='patientInfo'>
            환자 정보
            <div>
                <p>이름: {patient.name}</p>
                <p>주민등록번호: {patient.rrn}</p>
                <p>키: {patient.length}</p>
                <p>몸무게: {patient.weight}</p>
                <p>주소: {patient.address}</p>
            </div>
        </div>
    );
};

export default patientInfo;