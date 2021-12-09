import React, { useEffect, useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientPastOrder from './PatientPastOrder';

const patientList = () => {

    const [orders, setOrders] = useState([]);
    const [patientNo, setPatientNo] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, []);

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
                        <div onClick={() => updatePatientNo(order.patientNo) }>
                            <p>{order.no} {order.patientName}</p>
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