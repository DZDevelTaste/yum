import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import SearchBar from '../../SearchBar';
import MainPatient from './MainPatient';

import main from '../../assets/scss/nurse/Main.scss';

const MainList = ({currentState, callback, changeState}) => {
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
        findOrderList();
    }, [currentDate, currentState, updateState, updateList, changeState]);
    
    return (
        <Fragment>
            <div className={main.searchBox}>
                <input
                    type='date' 
                    value={currentDate}
                    onChange={e => setCurrentDate(e.target.value)}/>
                <SearchBar setKeyword={setKeyword} title='환자 검색' />
            </div>
            <table className={main.ListTable}>
                <thead className={main.TableHead}>
                    <tr>
                        <th className={main.date}>접수시간</th>
                        <th className={main.name}>이름</th>
                        <th className={main.age}>나이</th>
                        <th className={main.desc}>사유</th>
                        <th className={main.state}>진료현황</th>
                        <th className={main.detailInfo}>상세정보</th>
                        <th className={main.cancle}>접수취소</th>
                        <th className={main.receive}>수납</th>
                    </tr>
                </thead>
                <tbody className={main.TableBody}>
                    {
                        orders
                            .filter( order => order.patientVo.name.indexOf(keyword) !== -1)
                            .map( order => <MainPatient
                                                    key={order.no}
                                                    setUpdateState={setUpdateState}
                                                    setUpdateList={setUpdateList}
                                                    order={Object.assign({}, order, {desc: (order.desc === null ? '' : order.desc)})}
                                                    descForm={descForm}
                                                    setDescForm={setDescForm}
                                                    callback={callback}
                                                />)
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default MainList;