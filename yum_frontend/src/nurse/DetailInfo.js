import React, { Fragment, useEffect, useRef, useState } from 'react';


const DetailInfo = ({patientNo, setModalData}) => {
    const [patientInfo, setPatientInfo] = useState({});
    const [diagnosisList, setDiagnosisList] = useState([]);

    /* patientNo 값이 들어온 경우(환자를 선택한 경우) 실행 */
    useEffect(() => {
        selectPatient();
    }, []);

    /* patientNo를 받아왔을 때 해당 환자의 정보를 가져온다 */
    const selectPatient = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/nurse/patientInfo/${patientNo}`, {
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

            const resultAddr = jsonResult.data.patientVo.address;
            

            setPatientInfo(
                Object.assign(
                    {}, 
                    jsonResult.data.patientVo, 
                    {
                        address: resultAddr.replace(' / ', ' '),
                        length: jsonResult.data.patientVo.length.toFixed(2),
                        weight: jsonResult.data.patientVo.weight.toFixed(2)
                    }
                )
            )
            
            setDiagnosisList(jsonResult.data.diagnosisList);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Fragment>
            <div className='patientInfo'>
                <h2>환자 정보</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>{patientInfo.name}</td>
                            <td>성별</td>
                            <td>{patientInfo.gender == null ? '' : patientInfo.gender === 'M' ? '남' : '여'}</td>
                        </tr>
                        <tr>
                            <td>주민등록번호</td>
                            <td colSpan='3'>{patientInfo.rrn}</td>
                        </tr>
                        <tr>
                            <td>연락처</td>
                            <td colSpan='3'>{patientInfo.phone}</td>
                        </tr>
                        <tr>
                            <td>키</td>
                            <td>{patientInfo.length == null ? '' : `${patientInfo.length}cm`}</td>
                            <td>몸무게</td>
                            <td>{patientInfo.weight == null ? '' : `${patientInfo.weight}kg`}</td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td colSpan='3'>{patientInfo.address}</td>
                        </tr>
                        <tr>
                            <td>보험여부</td>
                            <td colSpan='3'>{patientInfo.insuarance == null ? '' : patientInfo.insuarance === 'Y' ? '가입' : '미가입'}</td>
                        </tr>
                        <tr>
                            <td>비고</td>
                            <td colSpan='3'>{patientInfo.desc}</td>
                        </tr>
                    </tbody>
                </table>
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
                                                diagnosis.presDiseaseList   // 질병 리스트 출력
                                                    .map(presDisease => {return `${presDisease.name}, `})
                                            }
                                        </td>
                                        <td>
                                            {
                                                diagnosis.presMedicineList  // 처방 약품 리스트 출력
                                                    .map(presMedicine => {return `${presMedicine.name}, `})
                                            }
                                            {
                                                diagnosis.presClinicList    // 처방 약품외 리스트 출력
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
            <button onClick={() => setModalData({isOpen: false})}>확인</button>
        </Fragment>
    );
};

export default DetailInfo;