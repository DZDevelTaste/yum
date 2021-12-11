import React, { useEffect, useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientPastOrder from './PatientPastOrder';

const patientList = ({callback}) => {

    const [orders, setOrders] = useState([]);
    const [patientNo, setPatientNo] = useState(0);
    const [orderNo, setOrderNo] = useState(0);      // value for insert

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        callback(orderNo);
    }, [orderNo])

    const fetchOrders = async() => {

        try {
            const response = await fetch(`/api/doctor`, {
                method: 'get',
                mode: 'cors',  
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            if(json.result !== 'success') {
                throw json.message;
            }
            
            setOrders([...json.data,...orders]);
            

        } catch (error) { 
            console.error(error);
        }
    }
    
    useEffect(() => {
        updatePatientNo;
    }, [patientNo])

    const updatePatientNo = (changedPatientNo) => {
        setPatientNo(changedPatientNo);
    }

    const divStyle ={
        display: 'inline-block',
        border: '1px solid black',
        width: 300,
        height: 300,
        float: 'left'
    }

    return (
        <div>
        <div id='patientList' style={divStyle}>
            환자 리스트
            {
                orders.map(order => {
                    return (
                        <div onClick={() => {
                                updatePatientNo(order.patientNo) 
                                setOrderNo(order.no)}}>
                            <p>{order.patientName} {order.state}</p>
                        </div>
                    )
                })
                
            }
            
        </div>
        <div>
            <PatientInfo patientNo={ patientNo } />
        </div>
        <div>
            <PatientPastOrder patientNo={ patientNo } />
        </div>
        </div>
    );
};

export default patientList;