import React, { useEffect, useState } from 'react';
import PatientState from './PatientState';
import PatientInfo from './PatientInfo';

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
            console.log(orders);
            setOrders([...json.data,...orders]);
            console.log(orders);
            

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        updatePatientNo;
        console.log("patientList:", patientNo);
    }, [patientNo])

    const updatePatientNo = (changedPatientNo) => {
        setPatientNo(changedPatientNo);
    }

    return (
        <div id='patientList'>
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
            <PatientState />
            <PatientInfo patientNo={ patientNo } />
            {/* <PatientPastOrder patientNo={patientNo} /> */}
        </div>
    );
};
1
export default patientList;