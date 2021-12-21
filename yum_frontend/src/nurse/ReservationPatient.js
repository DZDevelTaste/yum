import React, { Fragment, useRef, useState } from 'react';
import '../assets/scss/Content.scss';
import styles2 from '../assets/scss/OrderPatient.scss';


const ReservationPatient = ({reservation, setSelectReservationNo, setUpdateList}) => {
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
            setUpdateList({no: jsonResult.data.no, date:jsonResult.data.date, kind: 'delete'});
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
            <td className={styles2.date}>{reservation.date}</td>
            <td className={styles2.updateBtn}>
                <button onClick={() => setSelectReservationNo(reservation.no)}>수정</button>
            </td>
            <td className={styles2.cancleBtn}>
                <button onClick={cancleEvent}>취소</button>
            </td>
        </tr>
    );
};

export default ReservationPatient;