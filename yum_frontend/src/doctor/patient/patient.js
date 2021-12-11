import React, { useEffect, useState } from 'react';
import PatientList from './PatientList';

const patient = ({callback}) => {
    const [orderNo, setOrderNo] = useState(0);
    const getOrderNo = (orderNo) => {
        setOrderNo(orderNo);
    }

    useEffect(() => {
        callback(orderNo);
    }, [orderNo])

    // useEffect(() => {
    //     console.log(orderNo);
    // }, [orderNo])
    
    return (
        <div id='patientView'>
            <PatientList callback={getOrderNo}/>
        </div>
    );
};

export default patient;