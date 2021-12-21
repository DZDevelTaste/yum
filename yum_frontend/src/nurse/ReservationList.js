import React, { Fragment, useEffect, useState } from 'react';

import styles2 from '../assets/scss/OrderPatient.scss';
import SearchBar from '../SearchBar';
import ReservationPatient from './ReservationPatient';



const ReservationList = ({updateList, setUpdateList, setSelectReservationNo, callback}) => {
    const [reservationList, setReservationList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectDate, setSelectDate] = useState('');
    const [deleteOrderNo, setDeleteOrderNo] = useState(0);

    const notifyKeywordChange = (keyword) => {
        setKeyword(keyword);
    }


    /* 접수 리스트 불러오기 */
    useEffect(async () => {
        // console.log('selectDate', selectDate);
        try {
            const response = await fetch(`/api/nurse/reservationList?date=${selectDate}`, {
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
            setUpdateList(false);
            setReservationList(jsonResult.data);
            callback(jsonResult.data);
        } catch (err) {
            console.error(err)
        }
    }, [updateList, selectDate]);
    
    return (
        <Fragment>
            <input 
                type='date' 
                name='selectDate'
                value={selectDate || ''}
                onChange={e => setSelectDate(e.target.value)}
                />
            <SearchBar callback={notifyKeywordChange} />
            <table className={styles2.ListTable}>
                <thead>
                    <tr>
                        <th className={styles2.name}>이름</th>
                        <th className={styles2.rrn}>주민등록번호</th>
                        <th className={styles2.phone}>연락처</th>
                        <th className={styles2.date}>예약시간</th>
                        <th className={styles2.updateBtn}>수정</th>
                        <th className={styles2.cancleBtn}>예약취소</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservationList
                            .filter( order => order.patientVo.name.indexOf(keyword) !== -1)
                            .map( reservation => <ReservationPatient
                                                    setSelectReservationNo={setSelectReservationNo}
                                                    key={reservation.no}
                                                    reservation={reservation}
                                                    setUpdateList={setUpdateList}
                                                />)
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default ReservationList;