import React, { useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import styles from '../assets/scss/Content.scss';

const Patient = ({order, callback}) => {
    const [isOpen, setIsOpen] = useState(false);

    let rrn = order.patientVo.rrn;
    let phone = order.patientVo.phone;

    return (
        <Fragment>
            <tr className='OrderPatient' /* onClick={(e) => callback(patient.no)} */>
                <td className={styles.date}>{order.date}</td>
                <td className={styles.name}>{order.patientVo.name}</td>
                <td className={styles.gender}>{
                        order.patientVo.gender === 'M'
                            ? '남'
                            : '여'
                    }</td>
                <td className={styles.rrn}>{rrn.replace(/([0-9]{6})$/gi, "******")}</td>
                <td
                    className={`${styles.state} 
                        ${order.state === '진료중' ? styles.treatment
                            : order.state === '예약' ? styles.reservation
                            : order.state === '수납대기' ? styles.waiting
                            : order.state === '완료' ? styles.finish
                            : ''}`}
                    /* onClick={} */>
                    {order.state}
                </td>
                <td className={styles.phone}>
                    {
                        /-[0-9]{3}-/.test(phone)
                            ? phone.replace(/-[0-9]{3}-/g, "-***-")
                            : phone.replace(/-[0-9]{4}-/g, "-****-")
                    }
                </td>
            </tr>
        </Fragment>

        
    );
};

export default Patient;