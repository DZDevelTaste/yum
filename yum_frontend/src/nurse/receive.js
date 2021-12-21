import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('body');

const DetailInfo = ({orderNo, setModalData, setUpdateState}) => {
    console.log('orderNo~', orderNo)
    const [updateOrder, setUpdateOrder] = useState({no: orderNo, orderstateNo: 5, expenses: '7000'});
    const [payData, setPayData] = useState({clinic: 0, insuarance: 0});
    const [order, setOrder] = useState({});
    const [patientInfo, setPatientInfo] = useState({});
    const [diagnosisInfo, setDiagnosisInfo] = useState({});

    /* orderNo 값이 들어온 경우(수납을 선택한 경우) 실행 */
    useEffect(() => {
        selectReceiveInfo();
    }, []);


    /* orderNo를 받아왔을 때 수납 정보를 가져온다 */
    const selectReceiveInfo = async () => {
        try {
            const response = await fetch(`/api/nurse/payment/${orderNo}`, {
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

            setOrder(jsonResult.data.orderVo);
            setPatientInfo(jsonResult.data.orderVo.patientVo);
            setDiagnosisInfo(jsonResult.data.diagnosisVo);

            let clinicPay = jsonResult.data.diagnosisVo.presClinicList.length * 2000;
            let insuarancePay = jsonResult.data.orderVo.patientVo.insuarance === 'Y' ? (7000 + clinicPay)*0.1 : 0;
            let totalPay = jsonResult.data.orderVo.expenses + clinicPay - insuarancePay;
            setPayData(Object.assign({}, payData, {clinic: clinicPay, insuarance: insuarancePay}));

            setUpdateOrder(
                Object.assign({}, updateOrder, {expenses: totalPay})
            )

            console.log(jsonResult.data);
        } catch (err) {
            console.error(err);
        }
    }

    const receive = async () => {
        try {
            const response = await fetch(`/api/nurse/receive`, {
                method: 'put',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(updateOrder)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            console.log(jsonResult.data);

            setModalData({isOpen: false});
            setUpdateState(jsonResult.data);
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
                    </tbody>
                </table>
            </div>

            <div className='diagnosisList'>
                <h2>진료</h2>
                <div>
                    <span>내원일</span>
                    <span>{diagnosisInfo.date}</span>
                </div>  
                <div>
                    <span>담당의</span>
                    <span>{diagnosisInfo.name}</span>
                </div>
                <div>
                    <span>병명</span>
                    <p>
                        {   
                            diagnosisInfo.presDiseaseList === undefined || diagnosisInfo.presDiseaseList === null
                            ? '없음'
                            : diagnosisInfo.presDiseaseList   // 질병 리스트 출력
                                .map(presDisease => {return `${presDisease.name}, `})
                        }
                    </p>
                </div>
                <div>
                    <span>메모</span>
                    <p>{diagnosisInfo.desc}</p>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>분류</th>
                            <th>처방</th>
                            <th>1일 투여횟수</th>
                            <th>총 투여일수</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        diagnosisInfo.presMedicineList === undefined || diagnosisInfo.presMedicineList === null
                        ? ''
                        : diagnosisInfo.presMedicineList  // 처방 약품 리스트 출력
                            .map(presMedicine => {
                                return (
                                    <tr>
                                        <td>약품</td>
                                        <td>{presMedicine.name}</td>
                                        <td>{presMedicine.presmedicineCount}</td>
                                        <td>{presMedicine.presmedicineDay}</td>
                                    </tr>
                                )
                            })
                    }
                    {
                        diagnosisInfo.presClinicList === undefined || diagnosisInfo.presClinicList === null
                        ? ''
                        :  diagnosisInfo.presClinicList
                            .map(presClinic => {
                                return (
                                    <tr>
                                        <td>{presClinic.kind}</td>
                                        <td>{presClinic.name}</td>
                                        <td> - </td>
                                        <td> - </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </table>
            </div>
            <div>
                <h3>수납 금액</h3>
                <p>
                    <span>기본진료비</span>
                    <span>{order.expenses}</span>
                </p>
                <p>
                    <span>치료</span>
                    <span>{payData.clinic}원</span>
                </p>
                <p>
                    <span>보험</span>
                    <span>{payData.insuarance}원</span>
                </p>
                <span>총액</span>
                <span>{updateOrder.expenses}원</span>
            </div>
            <div>
                <button onClick={() => receive()}>수납</button>
                <button onClick={() => setModalData({isOpen: false})}>취소</button>
            </div>
        </Fragment>
    );
};

export default DetailInfo;