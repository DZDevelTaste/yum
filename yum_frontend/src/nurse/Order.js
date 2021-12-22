import React, { useEffect, useState } from 'react';

import SiteLayout from '../layout/SiteLayout';
import OrderForm from './OrderForm';
import Patients from './Patients';
import OrderList from './OrderList';

import styles1 from '../assets/scss/Content.scss';
import styles2 from '../assets/scss/Order.scss';

const Order = () => {
    const [currentPatientNo, setCurrentPatientNo] = useState(0);
    const [addPatient, setAddPatient] = useState({});
    const [addOrder, setAddOrder] = useState({});

    const notifyUpdateForm = (notifyForm) => {
        console.log('notifyForm result', notifyForm);
        
        setCurrentPatientNo(0);
        if(notifyForm === 'reset'){
            return;
        }

        if(notifyForm.newPatient != null) {
            setAddPatient(notifyForm.newPatient);
        }

        setAddOrder(notifyForm.orderNo);
    }

    return (
        <SiteLayout>
            <div className={styles2.LeftBox}>
                <div className={styles1.TopBox}>
                    <h2>환자 리스트</h2>
                    <Patients 
                        setCurrentPatientNo={setCurrentPatientNo}
                        updateInfo={addPatient}/>
                </div>
                <div className={styles1.BottomBox}>
                    <h2>접수 리스트</h2>
                    <OrderList
                        addOrder={addOrder}/>
                </div>
            </div>

            <div className={styles1.RightBox}>
                <OrderForm 
                    callback={notifyUpdateForm}
                    no={currentPatientNo} />
            </div>


        </SiteLayout>
    );
};

export default Order;