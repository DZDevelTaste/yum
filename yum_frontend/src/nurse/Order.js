import React, { useEffect, useState } from 'react';
import SiteLayout from '../layout/SiteLayout';
import SearchBar from '../SearchBar';
import Patient from './Patient';

import styles1 from '../assets/scss/Content.scss';
import styles2 from '../assets/scss/PatientList.scss';
import OrderForm from './OrderForm';
import Patients from './Patients';

const Order = () => {
    const [patients, setPatients] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectNo, setSelectNo] = useState('');
    const [changeInfo, setChangeInfo] = useState(false);

    const notifyKeywordChange = (keyword) => {
        setKeyword(keyword);
    }

    const notifyNoChange = (selectNo) => {
        console.log(selectNo);
        setSelectNo(selectNo);
    }
    
    const notifyResetForm = (resetNo) => {
        setSelectNo(resetNo);
    }

    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/nurse/patientList', {
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

            // console.log(jsonResult.data);
            setPatients(jsonResult.data);
        } catch (err) {
            console.error(err)
        }
    }, [changeInfo]);

    return (
        <SiteLayout>
            <div className={styles1.leftBox}>
                <Patients 
                    callback={notifyNoChange}/>
            </div>
            <div className={styles1.rightBox}>
                <OrderForm 
                    callback={notifyResetForm}
                    no={selectNo} />
            </div>


        </SiteLayout>
    );
};

export default Order;