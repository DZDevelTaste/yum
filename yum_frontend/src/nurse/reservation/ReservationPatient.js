import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useRef, useState } from 'react';
import styles2 from '../../assets/scss/nurse/OrderPatient.scss';


const ReservationPatient = ({reservation, setSelectReservationNo, setUpdateList, callback}) => {
    let rrn = reservation.patientVo.rrn;
    let phone = reservation.patientVo.phone;


    /* 예약 취소 이벤트 */
    const cancleEvent = async () => {
        if(!window.confirm(`${reservation.patientVo.name}님의 예약을 취소 하시겠습니까?`)){
            return;
        }

        // console.log(`[${reservation.no}] ${reservation.patientVo.name} 예약 삭제해야징`);
        try {
            const response = await fetch(`/api/nurse/deleteOrder/${reservation.no}`, {
                method: 'delete',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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
            console.log(jsonResult.data);
            setUpdateList({no: reservation.no, date:reservation.date, kind: 'delete'});
            callback({patient: reservation.patientVo, date:reservation.date, kind: 'delete'});
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <tr className='OrderPatient'>
            <td className={styles2.name}>{reservation.patientVo.name}</td>
            <td className={styles2.rrn}>{rrn.replace(/([0-9]{6})$/gi, "******")}</td>
            <td className={styles2.phone}>
                {
                    /-[0-9]{3}-/.test(phone)
                        ? phone.replace(/-[0-9]{3}-/g, "-***-")
                        : phone.replace(/-[0-9]{4}-/g, "-****-")
                }
            </td>
            <td className={styles2.reservationDate}>{reservation.date}</td>
            <td className={styles2.updateBtn}>
                <button onClick={() => setSelectReservationNo(reservation.no)}>
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                </button>
            </td>
            <td className={styles2.cancleBtn}>
                <button onClick={cancleEvent}>
                    <FontAwesomeIcon icon={faTimes} size="lg" color="#CF1313"/>
                </button>
            </td>
        </tr>
    );
};

export default ReservationPatient;