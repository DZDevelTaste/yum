import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Postcode from '../Postcode';

import styles1 from '../assets/scss/OrderForm.scss';
import styles2 from '../assets/scss/Postcode.scss';


Modal.setAppElement('body');

const OrderForm = ({no, callback}) => {
    const [patientVo, setPatientVo] = useState({});
    const [phone, setPhone] = useState({});
    const [rrn, setRrn] = useState({});
    const [order, setOrder] = useState({});
    const [addr, setAddr] = useState({});
    const [modalData, setModaldata] = useState({isOpen: false});

    useEffect(() => {
        if(no != 0 || no != '') {
            selectPatient();
            if(order.desc != null) setOrder({});
        }
    }, [no]);

    const notifyAddr = (addrData) => {
        setAddr(addrData);
        console.log(addrData);
        setModaldata({isOpen: false});
    } 

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

            setPatientVo(
                Object.assign(
                    {}, 
                    jsonResult.data.patientVo, 
                    {
                        length: jsonResult.data.patientVo.length.toFixed(2),
                        weight: jsonResult.data.patientVo.weight.toFixed(2)
                    }
                )
            )
            
            const resultRrn = jsonResult.data.patientVo.rrn.split('-');
            const resultPhone = jsonResult.data.patientVo.phone.split('-');

            setRrn(
                {
                    rrn1: resultRrn[0], 
                    rrn2: resultRrn[1] 
                });

            setPhone(
                {
                    phone1: resultPhone[0],
                    phone2: resultPhone[1],
                    phone3: resultPhone[2]                
                }
            )
        } catch (err) {
            console.error(err);
        }
    }

    
    /* 초기화 버튼 클릭 시 값 초기화 */
    const resetForm = (e) => {
        callback(0);
        setPatientVo({});
        setPhone({phone1: '010'});
        setRrn({});
        setOrder({});
    }

    


    /* 접수 이벤트 */
    const addOrder = async (e) => {
        if(patientVo.name == null || patientVo.name.trim() === '') {
            alert('이름을 입력해주세요.');
            return;
        }
        if(rrn.rrn1 == null || rrn.rrn1.trim() === '' || rrn.rrn2 == null || rrn.rrn2.trim() === '') {
            alert('주민등록번호를 입력해주세요.');
            return;
        }
        if(phone.phone2 == null || rrn.phone2.trim() === '' || phone.phone2 == null || phone.phone2.trim() === '') {
            alert('연락처를 입력해주세요.');
            return;
        }

        if(patientVo.length== null || patientVo.length === '') {
            alert('키를 입력해주세요.');
            return;
        }

        if(patientVo.weight== null || patientVo.weight === '') {
            alert('키를 입력해주세요.');
            return;
        }
    }



    return (
        <Fragment>
            <h2>환자 접수</h2>
            <div className={styles1.OrderForm}>
                <div>
                    <label>이름</label>
                    <input 
                        type='text' 
                        className={styles1.name}
                        value={patientVo.name || ''}
                        onChange=
                            {(e) => {
                                    if(no==0) setPatientVo(Object.assign({}, patientVo, {name: e.target.value}))
                            }}/>
                </div>
                <div>
                    <label>성별</label>

                    <input 
                        type='radio' 
                        name='gender' 
                        value={'M'}
                        checked={patientVo.gender === 'M' || patientVo.gender == null}
                        onChange=
                            {(e) => {
                                        if(no==0) setPatientVo(Object.assign({}, patientVo, {gender: e.target.value}))
                            }}/> <label>남</label>
                    <input 
                        type='radio' 
                        name='gender' 
                        value={'F'}
                        checked={patientVo.gender === 'F'}
                        onChange=
                            {(e) => {
                                if(no==0) setPatientVo(Object.assign({}, patientVo, {gender: e.target.value}))
                            }}/><label>여</label>
                </div>
                <div>
                    <label>주민등록번호</label>
                    <input 
                        type='text' 
                        className={styles1.rrn}
                        value={rrn.rrn1 || ''}
                        onChange=
                            {(e) => {
                                if(no==0) setRrn(Object.assign({}, rrn, {rrn1: e.target.value}))
                            }}/>
                            -
                    <input 
                        type='text' 
                        className={styles1.rrn}
                        value={rrn.rrn2 || ''}
                        onChange=
                            {(e) => {
                                if(no==0) setRrn(Object.assign({}, rrn, {rrn2: e.target.value}))
                            }}/>
                </div>
                <div>
                    <label>연락처</label>
                    <select 
                        className={styles1.phone1}
                        value={phone.phone1} 
                        onChange=
                            {(e) => {
                                if(no==0) setPhone(Object.assign({}, phone, {phone1: e.target.value}))
                            }}>
                        <option value="010">010</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                    </select>
                    -
                    <input 
                        type='text' 
                        className={styles1.phone}
                        value={phone.phone2 || ''}
                        onChange=
                            {(e) => {
                                if(no==0) setPhone(Object.assign({}, phone, {phone2: e.target.value}))
                            }}/>
                    -
                    <input 
                        type='text' 
                        className={styles1.phone}
                        value={phone.phone3 || ''}
                        onChange=
                            {(e) => {
                                if(no==0) setPhone(Object.assign({}, phone, {phone3: e.target.value}))
                            }}/>
                </div>
                <div>

                    <label>키</label>
                    <input 
                            type='text' 
                            className={styles1.length}
                            value={patientVo.length || ''}
                            onChange=
                                {(e) => {
                                    if(no==0) setPatientVo(Object.assign({}, patientVo, {length: e.target.value}))
                                }}/> cm
                    <label>몸무게</label>
                    <input 
                        type='text' 
                        className={styles1.weight}
                        value={patientVo.weight || ''}
                        onChange=
                            {(e) => {
                                if(no==0) setPatientVo(Object.assign({}, patientVo, {weight: e.target.value}))
                            }}/> kg
                </div>
                <div>
                    <label>주소</label>
                    <div className={styles2.addr}>
                        <input
                            className={styles2.Zonecode}
                            type='text'
                            placeholder='우편번호'
                            value={addr.zonecode || ''}
                            onClick={ (e) => {e.target.blur(); setModaldata({isOpen: true})} }
                            onChange={ () => setAddr(Object.assign({}, addr, {zonecode: addr.zonecode}) )}
                            />
                        <button className={styles2.AddrBtn} onClick={(e) => setModaldata({isOpen: true}) }>주소찾기</button>
                        <input
                            className={styles2.Address}
                            type='text'
                            placeholder='주소'
                            value={addr.address || ''}
                            onClick={ (e) => {e.target.blur(); setModaldata({isOpen: true})} }
                            onChange={ () => setAddr(Object.assign({}, addr, {address: addr.address}) )}
                            />
                        <input
                            className={styles2.DetailAddr}
                            type='text'
                            placeholder='상세주소'
                            value={addr.detailAddr || ''}
                            onChange={ (e) =>  setAddr(Object.assign({}, addr, {detailAddr: e.target.value})) }
                            />
                    </div>
                </div>
                <div>
                    <label>보험여부</label>
                        <input 
                            type='radio' 
                            name='insuarance' 
                            value={'Y'}
                            checked={patientVo.insuarance === 'Y'}
                            onChange=
                                {(e) => {
                                    if(no==0) setPatientVo(Object.assign({}, patientVo, {insuarance: e.target.value}))
                                }}/>가입
                        <input 
                            type='radio' 
                            name='insuarance' 
                            value={'N'}
                            checked={patientVo.insuarance === 'N' || patientVo.insuarance == null}
                            onChange=
                                {(e) => {
                                    if(no==0) setPatientVo(Object.assign({}, patientVo, {insuarance: e.target.value}))
                                }}/>미가입
                </div>
                <div>
                    <label>비고</label>
                        <textarea 
                            className={styles1.desc}
                            value={patientVo.desc || ''}
                            onChange=
                                {(e) => {
                                    if(no==0) setPatientVo(Object.assign({}, patientVo, {desc: e.target.value}))
                                }}>
                        </textarea>
                </div>
                <div>
                    <label>증상</label>
                        <textarea 
                            className={styles1.desc}
                            value={order.desc || ''}
                            onChange=
                                {(e) => {
                                    setOrder(Object.assign({}, order, {desc: e.target.value}))
                                }} >
                        </textarea>
                </div>
                <div className={styles1.btn}>
                    <button onClick={resetForm}>초기화</button>
                    <button onClick={addOrder}>완료</button>
                </div>
            </div>
                        

            <Modal 
                className={styles2.Modal}
                overlayClassName={styles2.Overlay}
                isOpen={modalData.isOpen}>
                
                <button 
                    className={styles2.Close}
                    onClick={(e) => {setModaldata({isOpen: false})}}>X</button>
                <Postcode callback={notifyAddr}/>

            </Modal>
            
        </Fragment>
    );
};

export default OrderForm;