import React, { Fragment, useEffect, useState } from 'react';

const PatientInfo = ({no}) => {
    const [patientInfo, setPatientInfo] = useState({});
    const [diagnosisList, setDiagnosisList] = useState([]);
    // console.log("no", no);

    useEffect(() => {
        if(no != 0 || no != '') {
            selectPatient();
        }
    }, [no]);

    const selectPatient = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/nurse/patientInfo/${no}`, {
                method: 'get',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            console.log(jsonResult.data.diagnosisList);
            console.log(jsonResult.data.patientVo);
            setPatientInfo(jsonResult.data.patientVo);
            setDiagnosisList(jsonResult.data.diagnosisList);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <div className='patientInfo'>
                <h2>환자 정보</h2>
                <p>
                    <span>이름 </span>
                    <span>{patientInfo.name}</span>
                </p>
                <p>
                    <span>성별 </span>
                    <span>{patientInfo.gender}</span>
                </p>
                <p>
                    <span>주민등록번호 </span>
                    <span>{patientInfo.rrn}</span>
                </p>
                <p>
                    <span>연락처 </span>
                    <span>{patientInfo.phone}</span>
                </p>
                <p>
                    <span>키 </span>
                    <span>{patientInfo.length}</span>
                </p>
                <p>
                    <span>몸무게 </span>
                    <span>{patientInfo.weight}</span>
                </p>
                <p>
                    <span>주소 </span>
                    <span>{patientInfo.address}</span>
                </p>
                <p>
                    <span>비고 </span>
                    <span>{patientInfo.desc}</span>
                </p>
            </div>

            <div className='diagnosisList'>
                
                <h2>진료 이력</h2>
                <table>
                    <thead>
                    <tr>
                        <th>내원일</th>
                        <th>담당의</th>
                        <th>질병</th>
                        <th>처방</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        diagnosisList
                            .map(diagnosis => { 
                                return (
                                    <tr 
                                        className='diagnosis'
                                        key={diagnosis.no}>
                                        <td>{diagnosis.date}</td>
                                        <td>{diagnosis.name}</td>
                                        <td>
                                            {
                                                diagnosis.presDiseaseList
                                                    .map(presDisease => {return `${presDisease.name}, `})
                                            }
                                        </td>
                                        <td>
                                            {
                                                diagnosis.presMedicineList
                                                    .map(presMedicine => {return `${presMedicine.name}, `})
                                            }
                                            {
                                                diagnosis.presClinicList
                                                    .map(presClinic => {return `${presClinic.name}, `})
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                    }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default PatientInfo;