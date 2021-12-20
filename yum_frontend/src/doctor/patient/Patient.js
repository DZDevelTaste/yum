import React, { useEffect, useState } from 'react';
import PatientList from './PatientList';

const patient = ({callback1, callback2}) => {
    const [orderNo, setOrderNo] = useState(0);
    const [patientName, setPatientName] = useState('');
    
    const getOrderNo = (orderNo) => {
        setOrderNo(orderNo);
    }

    const getPatientName = (patientName) => {
        setPatientName(patientName);
    }

    useEffect(() => {
        callback1(orderNo);
    }, [orderNo])

    useEffect(() => {
        callback2(patientName);
    }, [patientName])

    return (
        <div id='patientView'>
            <PatientList callback1={getOrderNo} callback2={getPatientName}/>
        </div>
    );
};

export default patient;