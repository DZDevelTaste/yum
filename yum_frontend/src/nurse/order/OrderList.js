import React, { Fragment, useEffect, useState } from 'react';
import styles2 from '../../assets/scss/nurse/OrderPatient.scss';
import SearchBar from '../../SearchBar';
import OrderPatient from './OrderPatient';



const OrderList = ({addOrder, changeState, callback}) => {
    const [orders, setOrders] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [updateOrderList, setUpdateOrderList] = useState({});

    /* 접수 리스트 불러오기 */
    useEffect(async () => {
        try {
            const response 
                = await fetch(`/api/nurse/orderList`, {
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
    }, [addOrder, updateOrderList, changeState]);

    return (
        <Fragment>
            <SearchBar setKeyword={setKeyword} title='환자 검색' />
            <table className={styles2.ListTable}>
                <thead>
                    <tr>
                        <th className={styles2.date}>접수시간</th>
                        <th className={styles2.name}>이름</th>
                        <th className={styles2.gender}>성별</th>
                        <th className={styles2.rrn}>주민등록번호</th>
                        <th className={styles2.state}>진료현황</th>
                        <th className={styles2.phone}>연락처</th>
                        <th className={styles2.cancle}>취소</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders
                            .filter( order => order.patientVo.name.indexOf(keyword) !== -1)
                            .map( order => <OrderPatient
                                                key={order.no}
                                                order={order}
                                                setUpdateOrderList={setUpdateOrderList}
                                                callback={callback}
                                            />)
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default OrderList;