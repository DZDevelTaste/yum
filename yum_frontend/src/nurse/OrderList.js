import React, { Fragment, useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import OrderPatient from './OrderPatient';

import styles from '../assets/scss/Content.scss';
import styles2 from '../assets/scss/PatientList.scss';


const OrderList = ({addOrder}) => {
    const [orders, setOrders] = useState([]);
    const [keyword, setKeyword] = useState('');

    const notifyKeywordChange = (keyword) => {
        setKeyword(keyword);
    }

    useEffect(async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/nurse/orderList`, {
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
            setOrders(jsonResult.data);
        } catch (err) {
            console.error(err)
        }
    }, [addOrder]);
    
    return (
        <Fragment>
            <SearchBar callback={notifyKeywordChange} />
            <table className={styles2.ListTable}>
                <thead>
                <tr>
                    <th className={styles.date}>접수시간</th>
                    <th className={styles.name}>이름</th>
                    <th className={styles.gender}>성별</th>
                    <th className={styles.rrn}>주민등록번호</th>
                    <th className={styles.state}>진료현황</th>
                    <th className={styles.phone}>연락처</th>
                </tr>
                </thead>
                <tbody>
                    {
                        orders
                            .filter( order => order.patientVo.name.indexOf(keyword) !== -1)
                            .map( order => <OrderPatient
                                                    // callback={notifyNoChange}
                                                    key={order.no}
                                                    order={order}
                                                />)
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default OrderList;