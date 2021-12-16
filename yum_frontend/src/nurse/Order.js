import React, { useEffect, useState } from 'react';

import SiteLayout from '../layout/SiteLayout';
import OrderForm from './OrderForm';
import Patients from './Patients';
import OrderList from './OrderList';

import styles1 from '../assets/scss/Content.scss';
import styles2 from '../assets/scss/Order.scss';

const Order = () => {
    const [selectNo, setSelectNo] = useState('');
    const [addPatient, setAddPatient] = useState(false);
    const [addOrder, setAddOrder] = useState(false);

    const notifyNoChange = (selectNo) => {
        console.log(selectNo);
        setSelectNo(selectNo);
    }
    
    const notifyUpdateForm = (notifyForm) => {
        console.log('notifyForm result', notifyForm);
        
        setSelectNo(0);
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
                        callback={notifyNoChange}
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
                    no={selectNo} />
            </div>


        </SiteLayout>
    );
};

export default Order;