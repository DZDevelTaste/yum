import React, { Fragment, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Postcode from '../Postcode';

import styles1 from '../assets/scss/OrderForm.scss';
import styles2 from '../assets/scss/Postcode.scss';


Modal.setAppElement('body');

const OrderForm = ({no, callback}) => {
    const [patientVo, setPatientVo] = useState({gender: 'M', insuarance: 'N'});
    const [phone, setPhone] = useState({phone1: '010'});
    const [rrn, setRrn] = useState({});
    const [order, setOrder] = useState({orderstateNo: 2});
    const [addr, setAddr] = useState({});
    const [isOpenHandler, setIsOpenHandler] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const modalInnerRef = useRef(null);


    useEffect(() => {
        if(no != 0 || no != '') {
            selectPatient();
            if(order.desc != null) setOrder({});
        }
    }, [no]);

    const notifyAddr = (addrData) => {
        setAddr(addrData);
        setIsOpenHandler(false);
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
            const resultAddr = jsonResult.data.patientVo.address;
            
            const resultZonecode = resultAddr.substr(resultAddr.indexOf('(',0)+1, 5);       // 우편번호
            const resultAddress = resultAddr.substring(resultAddr.indexOf(')', 0)+2, resultAddr.indexOf(' / '));        // 기본 주소 
            const resultDetailAddress = resultAddr.substr(resultAddr.indexOf(' / ')+3);     // 상세주소

            // console.log('resultAddr:', resultAddr);
            // console.log('resultZonecode:', resultZonecode);
            // console.log('resultAddress:', resultAddress);
            // console.log('resultDetailAddress:', resultDetailAddress);

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

            setAddr(
                {
                    zonecode: resultZonecode,
                    address: resultAddress,
                    detailAddress: resultDetailAddress
                }
            )
        } catch (err) {
            console.error(err);
        }
    }

    
    /* 초기화 버튼 클릭 시 값 초기화 */
    const resetForm = (e) => {
        callback('reset');
        setPatientVo({gender: 'M', insuarance: 'N'});
        setPhone({phone1: '010'});
        setRrn({});
        setAddr({});
        setOrder({orderstateNo: 2});
    }

    const stateClickEvent = (e) => {
        // 사용자가 클릭한 위치
        let x = e.clientX;
        let y = e.clientY;

        setTimeout(() => {
            const modalDiv = modalInnerRef.current.parentNode;
            modalDiv.style.top = y + "px";
            modalDiv.style.left = x + "px";
        }, 0);
        setIsOpenHandler(true);
    } 


    /* 접수폼 입력 체크 */
    const formCheck = () => {
        if(patientVo.name == undefined || patientVo.name.trim() === '') {
            alert('이름을 입력해주세요.');
            return;
        }
        if(rrn.rrn1 == undefined || rrn.rrn1.trim() === '' || rrn.rrn2 == undefined || rrn.rrn2.trim() === '') {
            alert('주민등록번호를 입력해주세요.');
            return;
        }
        if(phone.phone2 == undefined || phone.phone2.trim() === '' || phone.phone2 == undefined || phone.phone2.trim() === '') {
            alert('연락처를 입력해주세요.');
            return;
        }

        if(patientVo.length == undefined || patientVo.length === '') {
            alert('키를 입력해주세요.');
            return;
        }

        if(patientVo.weight == undefined || patientVo.weight === '') {
            alert('몸무게를 입력해주세요.');
            return;
        }
        
        if(addr.address == undefined || addr.address == '') {
            alert('주소를 입력해주세요');
            return;
        }


        // detailAddr(상세주소)가 입력이 되지 않았을 경우(undefined 또는 '' 빈 값일 때) => '(우편번호) 기본 주소' 형식으로 DB에 저장
        // 입력이 되었을 경우 => '(우편번호) 기본 주소 / 상세 주소' 형식으로 저장 
        let addrResult = 
            (addr.detailAddr === undefined) 
            ? ('(' + addr.zonecode+ ') ' + addr.address) : (addr.detailAddr.trim() === '') 
            ? ('(' + addr.zonecode+ ') ' + addr.address) : ('(' + addr.zonecode+ ') ' + addr.address + ' / ' + addr.detailAddr);

        // 주민등록번호 'xxxxxx-xxxxxxx' 형식으로 합치기
        let rrnResult = rrn.rrn1 + '-' + rrn.rrn2;

        // 연락처 'xxx-xxxx-xxxx' 형식으로 합치기
        let phoneResult = phone.phone1 + '-' + phone.phone2+ '-' + phone.phone3;
        
        setOrder(Object.assign({}, order, 
                    {patientVo: 
                        Object.assign({}, patientVo, {rrn: rrnResult, phone: phoneResult, address: addrResult})
                    }
                    ));
        setFormSuccess(true);
    }
    
    useEffect(() => {
        if(formSuccess){
            addOrder();
        }
    }, [formSuccess]);

    const addOrder = async (e) => {
        console.log('addOrder 실행 시 넘어오는 order == ', order);

        if(!formSuccess){
            return;
        }

        try {
            const response = await fetch('/api/nurse/order', {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(order)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            console.log('addOrder fetch 후 넘어온 data == ', jsonResult.data);

            
            console.log('patientVo의 no가 있는가? ==', patientVo.no);
            if(patientVo.no !== undefined) {
                callback({orderNo : jsonResult.data.no});
            } else {
                callback({orderNo: jsonResult.data.no, newPatient: jsonResult.data.patientVo.no});
            }

            setFormSuccess(false);

            resetForm();
        } catch (err) {
            console.error(err);
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
                <div className={styles2.addr}>
                    <label>주소</label>
                    <div>
                        <input
                            className={styles2.Zonecode}
                            type='text'
                            placeholder='우편번호'
                            value={addr.zonecode || ''}
                            onClick={ (e) => {e.target.blur(); stateClickEvent(e)} }
                            onChange={ () => setAddr(Object.assign({}, addr, {zonecode: addr.zonecode}) )}
                            />
                        <button id='AddrBtn' className={styles2.AddrBtn} onClick={stateClickEvent}>주소찾기</button>
                        <input
                            className={styles2.Address}
                            type='text'
                            placeholder='주소'
                            value={addr.address || ''}
                            onClick={ (e) => {e.target.blur(); stateClickEvent(e)} }
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
                    <button onClick={formCheck}>완료</button>
                </div>
            </div>
                        
            {/* 주소찾기 모달 */}
            <Modal 
                className={styles2.Modal}
                overlayClassName={styles2.Overlay}
                onRequestClose={ () => setIsOpenHandler(false) }
                isOpen={isOpenHandler}>
                
                <button
                    className={styles2.Close}
                    ref={modalInnerRef}
                    onClick={() => {setIsOpenHandler(false)}}>X</button>
                <Postcode callback={notifyAddr}/>

            </Modal>
            
        </Fragment>
    );
};

export default OrderForm;