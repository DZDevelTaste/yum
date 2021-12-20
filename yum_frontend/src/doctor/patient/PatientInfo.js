import React, { useEffect, useState } from 'react';
import style from '../../assets/scss/component/doctor/patient/PatientInfo.scss';

const patientInfo = ({patientNo}) => {
    
    const [patient, setPatient] = useState([]);
    const [patientVo, setPatientVo] = useState({});

    useEffect(() => {
        setPatientVo(patient.patientVo);
        console.log(patient.patientVo);
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

    return (
        <>
            <div className={style.patientInfoTitle}>
                환자 정보
            </div>
            <div className={style.patientInfoBody}>
                {
                patientVo ? 
                    <div className={style.patientInfoContent}>
                        <div className={style.patientAttr}>이 름 : 
                            <div className={style.patientInfo}>{patientVo.name}</div></div>
                        <div className={style.patientAttr}>주민등록번호 : 
                            <div className={style.patientInfo}>{patientVo.rrn}</div></div>
                        <div className={style.patientAttr}>키 : 
                            <div className={style.patientInfo}>{patientVo.length}</div></div>
                        <div className={style.patientAttr}>몸무게 : 
                            <div className={style.patientInfo}>{patientVo.weight}</div></div>
                        <div className={style.patientAttr}>주소 : 
                            <div className={style.patientInfo}>
                                {patientVo.address}
                            </div> </div>
                        <div className={style.patientAttr}>특이사항 : 
                            <div className={style.patientInfo}>{patientVo.desc}</div> </div>
                    </div> :
                    <div className={style.patientInfoContent}>
                        <div className={style.patientAttr}>이 름 : <div className={style.emptyInfo}></div></div>
                        <div className={style.patientAttr}>주민등록번호 : <div className={style.emptyInfo}></div></div>
                        <div className={style.patientAttr}>키 : <div className={style.emptyInfo}></div></div>
                        <div className={style.patientAttr}>몸무게 : <div className={style.emptyInfo}></div></div>
                        <div className={style.patientAttr}>주소 : <div className={style.emptyInfo}></div></div>
                        <div className={style.patientAttr}>간호사 메모 : <div className={style.emptyInfo}></div></div>
                    </div>
                }
            </div>
        </>
    );


    
};

export default patientInfo;