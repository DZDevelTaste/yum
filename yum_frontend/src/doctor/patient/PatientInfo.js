import React, { useEffect, useState } from 'react';

const patientInfo = ({patientNo}) => {
    
    const [patient, setPatient] = useState([]);
    const [patientVo, setPatientVo] = useState({});

    useEffect(() => {
        setPatientVo(patient.patientVo);
    }, [patient]);

    useEffect(()=>{
        fetchPatient(patientNo);
    }, [patientNo])

    const fetchPatient = async(patientno) => {
        try {
            const response = await fetch(`/api/doctor/patientInfo/${patientno}`, {
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

        } catch (error) {
            console.error(error);
        }
    }

    const divStyle ={
        display: 'inline-block',
        border: '1px solid black',
        width: 300,
        height: 300,
        float: 'left'
    }


    return (
        <div id='patientInfo' style={divStyle}>
            환자 정보
            {patientVo ? 
                <div>
                    <p>이름: {patientVo.name}</p>
                    <p>주민등록번호: {patientVo.rrn}</p>
                    <p>키: {patientVo.length}</p>
                    <p>몸무게: {patientVo.weight}</p>
                    <p>주소: {patientVo.address}</p> 
                </div> :
                <div>
                    <p>이름: </p>
                    <p>주민등록번호: </p>
                    <p>키: </p>
                    <p>몸무게: </p>
                    <p>주소: </p> 
                
                </div>
            }
        </div>
    );

    
};

export default patientInfo;