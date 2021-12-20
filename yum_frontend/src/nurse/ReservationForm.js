import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';

import style from '../assets/scss/ReservationForm.scss';

const ReservationForm = ({setUpdateList, reservationList, selectNo, selectReservationNo, setSelectReservationNo, setSelectNo}) => {
    /* 환자 리스트에서 선택할 경우 selectNo,
        예약 리스트에서 수정을 선택할 경우 selectReservationNo를 받아옴 */
    console.log('selectPatientNo : ', selectNo);
    console.log('selectReservationNo: ', selectReservationNo);
    console.log(reservationList);


    /* 예약 버튼 시간 */
    const AmTimeBtn = ["09:00", "09:30", "10:00", "10:30", "11:30"];
    const PmTimeBtn = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

    
    let disabledCheck = '';     // 예약된 시간을 indexOf로 값이 있는지 없는지 판단하여 버튼 disabled 할 변수 
    
    reservationList
        .map(reservationInfo => {
                disabledCheck += `20${reservationInfo.date.replace(/\//g, '-')} `;
        });
    
    const [findPatient, setFindPatient] = useState({}); // 환자 정보
    // const Timer = ['2021-12-14 09:00','2021-12-14 11:00', '2021-12-14 10:00','2021-12-15 09:30','2021-12-15 10:30','2021-12-15 14:30', '2021-12-16 11:30', '2021-12-17 15:30'];
    const minDate = moment().format('YYYY-MM-DD');  // 오늘 날짜
    const [currentDay, setCurrentDay] = useState(minDate);    // 선택 날짜(기본값: 오늘)
    const [currentTime, setCurrentTime] = useState('');         // 선택 시간
    const [formSuccess, setFormSuccess] = useState(false);
    const [orderVo, setOrderVo] = useState({orderstateNo: 1});

    // 환자 리스트에서 환자를 선택하면 patientNo를 받아와서 폼 렌더링
    useEffect(() => {
        if(selectNo !== 0){
            findPatientInfo();
        }
    }, [selectNo])
    
    // 예약 리스트에서 수정을 선택하면 orderNo를 받아와서 폼 렌더링
    useEffect(() => {
        if(selectReservationNo !== 0){
            findReservationInfo();
        }
    }, [selectReservationNo])


    /* 환자 리스트에서 환자를 선택 했을 경우 환자 정보 가져오기 */
    const findPatientInfo = async () => {
        try {
            const response = await fetch(`/api/nurse/patientInfo/${selectNo}`, {
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

            console.log("findPatientInfo: ", jsonResult.data);
            setFindPatient(jsonResult.data.patientVo);
            setCurrentDay(minDate);
            setCurrentTime('');
        } catch (err) {
            console.error(err);
        }
    }

    /* 예약 리스트에서 수정을 선택했을 때 예약 정보 가져오기 */
    const findReservationInfo = async () => {
        try {
            const response = await fetch(`/api/nurse/reservation/${selectReservationNo}`, {
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

            // console.log("findReservationInfo: ", jsonResult.data);
            setFindPatient(jsonResult.data.patientVo);
            let currentDate = jsonResult.data.date;
            setCurrentDay(currentDate.split(' ')[0]);
            setCurrentTime(currentDate.substr(currentDate.indexOf(' ')+1, 5));

        } catch (err) {
            console.error(err);
        }
    }
    
    /* 수정 후 확인 버튼을 눌렸을 때 Event */
    const submitEvent = (e) => {
        e.preventDefault();
        
        console.log(`[currentDay] '${currentDay}', [currentTime] '${currentTime}`);

        if(currentDay === '' || currentTime === '') { 
            alert('예약날짜, 시간을 선택해주세요.');
            return;
        }

        selectReservationNo !== 0 
        ? setOrderVo(Object.assign({}, orderVo, { no: selectReservationNo, date: `${currentDay} ${currentTime}` }))
        : setOrderVo(Object.assign({}, orderVo, { date: `${currentDay} ${currentTime}`, patientVo : { no: selectNo } }))
        

        setFormSuccess(true);
        
    }
    
    useEffect(() => {
        if(formSuccess === true){ 
            selectReservationNo !== 0 
            ? reservationUpdate()
            : reservationAdd()
        }
    }, [formSuccess]);

    /* 예약 추가 */
    const reservationAdd = async () => {
        console.log(orderVo);
        try {
            const response = await fetch(`/api/nurse/order`, {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(orderVo)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            console.log(jsonResult.data);
            // setFindPatient(jsonResult.data.patientVo);
            resetFormEvent();
            setUpdateList(true);
        } catch (err) {
            console.error(err);
        }
    } 

    /* 예약 수정 */
    const reservationUpdate = async () => {
        try {
            const response = await fetch(`/api/nurse/updateDate`, {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(orderVo)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            console.log(jsonResult.data);
            // setFindPatient(jsonResult.data.patientVo);
            resetFormEvent();
            setUpdateList(true);
        } catch (err) {
            console.error(err);
        }
    }

    const resetFormEvent = () => {
        setFormSuccess(false);
        setSelectNo(0);
        setFindPatient({});
        setOrderVo({orderstateNo: 1})
        setCurrentDay(minDate);
        setCurrentTime('');
    }

    return (
        <Fragment>
            <h2>예약 접수</h2>
            <div className='ReservationForm'>
                <div className='patientInfo'>
                    <div>
                        <span>이름</span>
                        <span>{findPatient.name}</span>
                    </div>
                    <div>
                        <span>성별</span>
                        <span>{findPatient.gender === 'M' ? '남' 
                        : findPatient.gender === 'F' ? '여' : ''}</span>
                    </div>
                    <div>
                        <span>주민등록번호</span>
                        <span>{findPatient.rrn != null ? findPatient.rrn.replace(/([0-9]{6})$/gi, "******") : ''}</span>
                    </div>
                    <div>
                        <span>연락처</span>
                        <span>{findPatient.phone}</span>
                    </div>

                </div>
            </div>

            <div>
                <input type='date' min={minDate} value={currentDay} onChange={(e) => {setCurrentDay(e.target.value); setCurrentTime('')}} />
                <div className={style.timeBtnList}>

                    <span>오전</span>
                    <div className={style.btnList}>
                        {
                            AmTimeBtn
                                .map((timeValue, index) =>{
                                    return(
                                        <button 
                                            className={`${style.timebtn} ${currentTime === timeValue ? style.active : ''}`}
                                            key={index} 
                                            value={timeValue}
                                            onClick={e => {selectNo!==0 || selectReservationNo!==0 ? setCurrentTime(e.target.value) : setCurrentTime('')}}
                                            disabled={disabledCheck.indexOf(`${currentDay} ${timeValue}`) !== -1 ? true : false}>
                                            {timeValue}
                                        </button>
                                    )
                                })
                        }
                    </div>
                    
                    <span>오후</span>
                    <div className={style.btnList}>
                        {
                            PmTimeBtn
                                .map((timeValue, index) =>{
                                    return(
                                        <button 
                                            className={`${style.timebtn} ${currentTime === timeValue ? style.active : ''}`}
                                            key ={index} 
                                            value={timeValue}
                                            onClick={e => {selectNo!==0 || selectReservationNo!==0 ? setCurrentTime(e.target.value) : setCurrentTime('')}}
                                            disabled={(disabledCheck.indexOf(`${currentDay} ${timeValue}`) !== -1) ? true : false}>
                                            {timeValue}
                                        </button>
                                    )
                                })
                        }
                </div>

                </div>
            </div>

            {selectNo !== 0 || selectReservationNo !== 0 ?
                <div>
                    <button onClick={() => resetFormEvent()}>취소</button>
                    <button onClick={(e) => submitEvent(e)}>확인</button>
                </div>
                : ''
            }
        </Fragment>
    )
};

export default ReservationForm;