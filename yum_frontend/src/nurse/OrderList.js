import React, { Fragment, useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import OrderPatient from './OrderPatient';

import styles from '../assets/scss/Content.scss';
// import styles2 from '../assets/scss/PatientList.scss';
import styles2 from '../assets/scss/OrderPatient.scss';


const OrderList = ({addOrder}) => {
    const [orders, setOrders] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [updateState, setUpdateState] = useState(false);

    const notifyKeywordChange = (keyword) => {
        setKeyword(keyword);
    }

    const notifyStateNoChange = (noChange) => {
        console.log('[notifyStateNoChange]', noChange);
        setUpdateState(noChange);
    }


    /* 접수 리스트 불러오기 */
    useEffect(async () => {
        try {
            const response = await fetch(`/api/nurse/orderList`, {
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
            setUpdateState(false);
        } catch (err) {
            console.error(err)
        }
    }, [addOrder, updateState]);
    
    return (
        <Fragment>
            <SearchBar callback={notifyKeywordChange} />
            <table className={styles2.ListTable}>
                <thead>
                    <tr>
                        <th className={styles2.date}>접수시간</th>
                        <th className={styles2.name}>이름</th>
                        <th className={styles2.gender}>성별</th>
                        <th className={styles2.rrn}>주민등록번호</th>
                        <th className={styles2.state}>진료현황</th>
                        <th className={styles2.phone}>연락처</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders
                            .filter( order => order.patientVo.name.indexOf(keyword) !== -1)
                            .map( order => <OrderPatient
                                                    callback={notifyStateNoChange}
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