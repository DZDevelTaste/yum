import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import styles2 from '../assets/scss/OrderPatient.scss';
import SearchBar from '../SearchBar';
import MainPatient from './MainPatient';

const MainList = ({currentState}) => {
    const today = moment().format('YYYY-MM-DD');
    const [keyword, setKeyword] = useState('');
    const [currentDate, setCurrentDate] = useState(today);
    const [updateState, setUpdateState] = useState({});
    const [updateList, setUpdateList] = useState({});
    const [orders, setOrders] = useState([]);
    const [descForm, setDescForm] = useState({no: 0, type: 'text'});

    /* 접수 리스트 불러오기 */
    const findOrderList = async () => {
        try {
            const response = await fetch(`/api/nurse/orderList?date=${currentDate !== '' ? currentDate : ''}&osn=${currentState}`, {
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
            
            setOrders(jsonResult.data);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        console.log('흐엥');
        findOrderList();
    }, [currentDate, currentState, updateState, updateList]);
    
    return (
        <Fragment>
            <input
                type='date' 
                value={currentDate}
                onChange={e => setCurrentDate(e.target.value)}/>
            <SearchBar setKeyword={setKeyword} />
            <table className={styles2.ListTable}>
                <thead>
                    <tr>
                        <th className={styles2.date}>접수시간</th>
                        <th className={styles2.name}>이름</th>
                        <th className={styles2.age}>나이</th>
                        <th className={styles2.desc}>사유</th>
                        <th className={styles2.state}>진료현황</th>
                        <th className={styles2.detailInfo}>상세정보</th>
                        <th className={styles2.cancle}>접수취소</th>
                        <th className={styles2.receive}>수납</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders
                            .filter( order => order.patientVo.name.indexOf(keyword) !== -1)
                            .map( order => <MainPatient
                                                    key={order.no}
                                                    setUpdateState={setUpdateState}
                                                    setUpdateList={setUpdateList}
                                                    order={Object.assign({}, order, {desc: (order.desc === '' || order.desc === null ? '-' : order.desc)})}
                                                    descForm={descForm}
                                                    setDescForm={setDescForm}
                                                />)
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default MainList;