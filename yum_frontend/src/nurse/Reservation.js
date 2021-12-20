import React, { useEffect, useState } from 'react';
import SiteLayout from '../layout/SiteLayout';

import styles1 from '../assets/scss/Content.scss';
import styles2 from '../assets/scss/Order.scss';
import Patients from './Patients';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';


const Reservation = () => {
    // const [selectPatient, setSelectPatient] = useState({});
    const [selectNo, setSelectNo] = useState(0);
    const [selectReservationNo, setSelectReservationNo] = useState(0);
    const [reservationList, setReservationList] = useState([]);
    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
        console.log('Reservation Component selectNo: ', selectNo);
    }, [selectNo]);

    const notifyUpdateForm = () => {
        console.log('updateFormmmmmmmmmmmmmmmm');
    }

    return (
        <SiteLayout>
            <div className={styles2.LeftBox}>
                <div className={styles1.TopBox}>
                    <h2>환자 리스트</h2>
                    <Patients 
                        setSelectNo={setSelectNo}/>
                </div>
                <div className={styles1.BottomBox}>
                    <h2>예약 리스트</h2>
                    <ReservationList
                        callback={setReservationList}
                        setSelectReservationNo={setSelectReservationNo}
                        updateList={updateList}
                        setUpdateList={setUpdateList}/>
                </div>
            </div>

            <div className={styles1.RightBox}>
                <ReservationForm 
                    setUpdateList={setUpdateList}
                    reservationList={reservationList}
                    selectNo={selectNo}
                    selectReservationNo={selectReservationNo}
                    setSelectReservationNo={setSelectReservationNo}
                    setSelectNo={setSelectNo} />
            </div>
        </SiteLayout>
    );
};

export default Reservation;