import React, { Fragment, useRef, useState } from 'react';
import Modal from 'react-modal';
import '../assets/scss/Content.scss';
import styles2 from '../assets/scss/OrderPatient.scss';

Modal.setAppElement('body');

const Patient = ({order, callback}) => {
    const [isOpenHandler, setIsOpenHandler] = useState(false);
    const modalInnerRef = useRef(null);      // 모달 안의 ul useRef, Modal은 ref 적용 x

    let rrn = order.patientVo.rrn;
    let phone = order.patientVo.phone;
    
    /* 진료현황 클릭 시 실행 이벤트(모달 위치 조정 및 모달 띄우기) */
    const stateClickEvent = (e) => {
        // 사용자가 클릭한 위치
        let x = e.clientX;
        let y = e.clientY;
        // console.log('click x:', x, '/ click y:', y);

        setTimeout(() => {
            // console.log('refModalInnerRef:', modalInnerRef.current.parentNode);
            
            const modalDiv = modalInnerRef.current.parentNode;       // Modal(ul 상위에 있는 Div)
            // console.log(modalDiv);
            
            // Modal 위치를 사용자가 클릭한 위치로 설정(Modal의 position은 absolute)
            modalDiv.style.top = y + "px";
            modalDiv.style.left = x + "px";
        }, 0);
        setIsOpenHandler(true);
    } 



    /* 진료 현황 업데이트 */
    const updateState = async (selectOSN) => {
        try {
            // console.log(modalInnerRef.current.parentNode)
            let updateOrder = {};
            updateOrder.no = order.no;
            updateOrder.orderstateNo = selectOSN;

            console.log(updateOrder);

            const response = await fetch('/api/nurse/updateState', {
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

            setIsOpenHandler(false);
            callback(true);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Fragment>
            <tr className='OrderPatient' /* onClick={(e) => callback(patient.no)} */>
                <td className={styles2.date}>{order.date}</td>
                <td className={styles2.name}>{order.patientVo.name}</td>
                <td className={styles2.gender}>{
                        order.patientVo.gender === 'M'
                            ? '남'
                            : '여'
                    }</td>
                <td className={styles2.rrn}>{rrn.replace(/([0-9]{6})$/gi, "******")}</td>
                <td
                    className={`${styles2.state} 
                        ${order.state === '진료중' ? styles2.treatment
                            : order.state === '예약' ? styles2.reservation
                            : order.state === '수납대기' ? styles2.waiting
                            : order.state === '완료' ? styles2.finish
                            : ''}`}
                    onClick={stateClickEvent}>
                    {order.state}
                </td>
                <td className={styles2.phone}>
                    {
                        /-[0-9]{3}-/.test(phone)
                            ? phone.replace(/-[0-9]{3}-/g, "-***-")
                            : phone.replace(/-[0-9]{4}-/g, "-****-")
                    }
                </td>
            </tr>
            
            <Modal
                className={styles2.Modal}
                overlayClassName={styles2.Overlay}
                onRequestClose={ () => setIsOpenHandler(false) }
                isOpen={isOpenHandler}>
                <ul ref={modalInnerRef}>
                    <li onClick={() => updateState(1)}>예약</li>
                    <li onClick={() => updateState(2)}>진료대기</li>
                    <li onClick={() => updateState(3)}>진료중</li>
                </ul>
            </Modal>
        </Fragment>
    );
};

export default Patient;