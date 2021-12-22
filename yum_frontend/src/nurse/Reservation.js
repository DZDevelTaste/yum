import React, { useEffect, useState } from 'react';
import SiteLayout from '../layout/SiteLayout';

import styles1 from '../assets/scss/Content.scss';
import styles2 from '../assets/scss/Order.scss';
import Patients from './Patients';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';


const Reservation = () => {
    // const [selectPatient, setSelectPatient] = useState({});
    const [currentPatientNo, setCurrentPatientNo] = useState(0);
    const [selectReservationNo, setSelectReservationNo] = useState(0);
    const [reservationList, setReservationList] = useState([]);
    const [updateList, setUpdateList] = useState({});

    return (
        <SiteLayout>
            <div className={styles2.LeftBox}>
                <div className={styles1.TopBox}>
                    <h2>환자 리스트</h2>
                    <Patients 
                        setCurrentPatientNo={setCurrentPatientNo}/>
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
                    currentPatientNo={currentPatientNo}
                    selectReservationNo={selectReservationNo}
                    setSelectReservationNo={setSelectReservationNo}
                    setCurrentPatientNo={setCurrentPatientNo} />
            </div>
        </SiteLayout>
    );
};

export default Reservation;