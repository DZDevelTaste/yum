import React, { Fragment, useEffect, useState } from 'react';
import styles2 from '../assets/scss/PatientList.scss';
import SearchBar from '../SearchBar';
import Patient from './Patient';



const Patients = ({updateInfo, callback}) => {
    const [patients, setPatients] = useState([]);
    const [keyword, setKeyword] = useState('');
    
    const notifyKeywordChange = (keyword) => {
        setKeyword(keyword);
    }

    const notifyNoChange = (selectNo) => {
        // setSelectNo(selectNo);
        callback(selectNo);
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
    }, [updateInfo]);

    return (
        <Fragment>
            <SearchBar callback={notifyKeywordChange} />
            <table className={styles2.ListTable}>
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
                                                    patient={patient}
                                                />)
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default Patients;