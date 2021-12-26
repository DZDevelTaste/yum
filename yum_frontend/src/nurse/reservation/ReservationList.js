import React, { Fragment, useEffect, useState } from 'react';

import styles2 from '../../assets/scss/nurse/OrderPatient.scss';
import SearchBar from '../../SearchBar';
import ReservationPatient from './ReservationPatient';



const ReservationList = ({updateList, setUpdateList, setSelectReservationNo, setReservations, changeState, callback}) => {
    const [reservationList, setReservationList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectDate, setSelectDate] = useState('');

    /* 예약 리스트 불러오기 */
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
            setReservationList(jsonResult.data);
            setReservations(jsonResult.data);
        } catch (err) {
            console.error(err)
        }
    }, [updateList, selectDate, changeState]);
    
    return (
        <Fragment>
            <div className={styles2.SearchBox}>
                <input 
                    type='date' 
                    name='selectDate'
                    value={selectDate || ''}
                    onChange={e => setSelectDate(e.target.value)}
                    />
                <SearchBar setKeyword={setKeyword} title='환자 검색' />
            </div>
            <table className={styles2.ListTable}>
                <thead>
                    <tr>
                        <th className={styles2.name}>이름</th>
                        <th className={styles2.rrn}>주민등록번호</th>
                        <th className={styles2.phone}>연락처</th>
                        <th className={styles2.reservationDate}>예약시간</th>
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
                                                    callback={callback}
                                                />)
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default ReservationList;