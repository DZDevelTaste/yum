import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { Fragment } from 'react/cjs/react.production.min';
import '../assets/scss/Content.scss';
import styles2 from '../assets/scss/OrderPatient.scss';

const Patient = ({order, callback}) => {
    const [isOpenHandler, setIsOpenHandler] = useState(false);
    
    let rrn = order.patientVo.rrn;
    let phone = order.patientVo.phone;
    

    const updateState = async (selectOSN) => {
        
        try {
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
                    onClick={() => setIsOpenHandler(true)}>
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
                ariaHideApp={false}
                isOpen={isOpenHandler}>
                <ul>
                    <li onClick={() => updateState(1)}>예약</li>
                    <li onClick={() => updateState(2)}>진료대기</li>
                    <li onClick={() => updateState(3)}>진료중</li>
                </ul>

            </Modal>
        </Fragment>
    );
};

export default Patient;