import React, { Fragment, useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import Patient from './Patient';
import PatientInfo from './PatientInfo';

import styles from '../assets/scss/PatientList.scss'
import SiteLayout from '../layout/SiteLayout';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectNo, setSelectNo] = useState('');
    const [changeInfo, setChangeInfo] = useState(false);

    const notifyKeywordChange = (keyword) => {
        setKeyword(keyword);
    }

    const notifyNoChange = (selectNo) => {
        setSelectNo(selectNo);
    }
    
    const notifyInfoChange = (chkResult) => {
        setChangeInfo(chkResult);
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
            <div className={styles.leftBox}>
                <SearchBar callback={notifyKeywordChange} />
                <table>
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>성별</th>
                        <th>주민등록번호</th>
                        <th>연락처</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            patients
                                .filter( patient => patient.name.indexOf(keyword) !== -1)
                                .map( patient => <Patient
                                                        callback={notifyNoChange}
                                                        key={patient.no}
                                                        no={patient.no}
                                                        name={patient.name}
                                                        gender={patient.gender}
                                                        rrn={patient.rrn}
                                                        phone={patient.phone}
                                                    />)
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.rightBox}>
                <PatientInfo 
                    callback={notifyInfoChange}
                    no={selectNo} />
            </div>
        </SiteLayout>
    );
};

export default PatientList;