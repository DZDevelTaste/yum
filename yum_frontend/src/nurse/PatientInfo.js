import React, { Fragment, useEffect, useState } from 'react';

const PatientInfo = ({no, callback}) => {
    const [chooseButton, setChooseButton] = useState(false);
    const [patientInfo, setPatientInfo] = useState({});
    const [diagnosisList, setDiagnosisList] = useState([]);
    const [updateInfo, setUpdateInfo] = useState({});
    // console.log("no", no);

    /* patientNo 값이 들어온 경우(환자를 선택한 경우) 실행 */
    useEffect(() => {
        if(no != 0 || no != '') {
            selectPatient();
            setChooseButton(false);
        }
    }, [no]);


    /* patientNo를 받아왔을 때 해당 환자의 정보를 가져온다 */
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

            /* 받아온 Json Data를 PatientVo는 PatientInfo, DiagnosisList는 diagnosisList에 set */
            // console.log(jsonResult.data.diagnosisList);
            // console.log(jsonResult.data.patientVo);
            // setPatientInfo(jsonResult.data.patientVo);
            
            setPatientInfo(
                Object.assign(
                    {}, 
                    jsonResult.data.patientVo, 
                    {
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

    /* 
        수정 버튼을 눌렸을 때 입력폼으로,
        확인/취소 버튼을 눌렸을 경우 text로 변경
     */
    const changeEditForm = (e) => {
        if((!chooseButton) && (no != 0 || no != '')){
            setChooseButton(true);
            setUpdateInfo(patientInfo);
            return;
        }

        setChooseButton(false);
    }

    /* 환자 업데이트 이벤트 */
    const updatePatientInfo = async (e) => {
        if(patientInfo === updateInfo) {
            changeEditForm();
        }
        try {
            const response = await fetch('http://localhost:8080/api/nurse/updatePatientInfo', {
                method: 'put',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(updateInfo)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            setPatientInfo(updateInfo);
            changeEditForm();
            callback(true);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <div className='patientInfo'>
                <h2>환자 정보</h2>
                {
                    !chooseButton ? 
                        <Fragment>
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
                            <button onClick={changeEditForm}>수정</button>
                        </Fragment> :
                        <Fragment>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>이름</td>
                                        <td>
                                            <input 
                                                type='text' 
                                                name='name' 
                                                value={updateInfo.name}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {name: e.target.value}))
                                                        }
                                                    }/>
                                        </td>
                                        <td>성별</td>
                                        <td>{patientInfo.gender == null ? '' : patientInfo.gender === 'M' ? '남' : '여'}</td>
                                    </tr>
                                    <tr>
                                        <td>주민등록번호</td>
                                        <td colSpan='3'>
                                            <input 
                                                type='text' 
                                                name='rrn' 
                                                value={updateInfo.rrn}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {rrn: e.target.value}))
                                                        }
                                                    }/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>연락처</td>
                                        <td colSpan='3'>
                                            <input 
                                                type='text' 
                                                name='phone' 
                                                value={updateInfo.phone}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {phone: e.target.value}))
                                                        }
                                                    }/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>키</td>
                                        <td>
                                        <input 
                                                type='text' 
                                                name='length' 
                                                value={updateInfo.length}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {length: e.target.value}))
                                                        }
                                                    }/>cm
                                            </td>
                                        <td>몸무게</td>
                                        <td>
                                            <input 
                                                type='text' 
                                                name='weight' 
                                                value={updateInfo.weight}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {weight: e.target.value}))
                                                        }
                                                    }/>kg
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>주소</td>
                                        <td colSpan='3'>
                                            <input 
                                                type='text' 
                                                name='address' 
                                                value={updateInfo.address}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {address: e.target.value}))
                                                        }
                                                    }/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>보험여부</td>
                                        <td colSpan='3'>
                                            <input 
                                                type='radio' 
                                                name='insuarance' 
                                                value={'Y'}
                                                checked={updateInfo.insuarance === 'Y'}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {insuarance: e.target.value}))
                                                        }
                                                    }/>가입
                                            <input 
                                                type='radio' 
                                                name='insuarance' 
                                                value={'N'}
                                                checked={updateInfo.insuarance === 'N'}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {insuarance: e.target.value}))
                                                        }
                                                    }/>미가입
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>비고</td>
                                        <td colSpan='3'>
                                            <input 
                                                type='text' 
                                                name='desc' 
                                                value={updateInfo.desc}
                                                onChange=
                                                    {
                                                        (e) => {
                                                            setUpdateInfo(Object.assign({}, updateInfo, {desc: e.target.value}))
                                                        }
                                                    }/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={changeEditForm}>취소</button>
                            <button onClick={updatePatientInfo}>완료</button>
                        </Fragment>
                }
                
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
        </Fragment>
    );
};

export default PatientInfo;