import React, { useEffect, useRef, useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientPastOrder from './PatientPastOrder';
import SockJsClient from 'react-stomp';

const patientList = ({callback}) => {

    const [orders, setOrders] = useState([]);
    const [patientNo, setPatientNo] = useState(0);
    const [orderNo, setOrderNo] = useState(0);      // value for insert
    const [changeState, setChangeState] = useState(false);

    const $websocket = useRef(null); 

    useEffect(() => {
        console.log(changeState);
    }, []);

    useEffect(() => {
        callback(orderNo);
    }, [orderNo])

    useEffect(() => {
        fetchOrders();
    }, [changeState])

    // 진료 대기중인 환자 리스트를 출력
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
            
            setOrders([...json.data, orders]);
            

        } catch (error) { 
            console.error(error);
        }
    }

    // message 보내는 함수
    const sendMessage = async (patientName) => {
        try {
            const response = await fetch('/message/api', {
                method: 'post',
                mode: 'cors',  
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "patientName": patientName,
                    "from": "doctor",
                    "to": "nurse",
                  })
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

        } catch (error) { 
            console.error(error);
        }
    }

    // 환자 진료 상태 변경
    const updateOrderstate = async (order) => {
        try {
            const response = await fetch(`/api/doctor/updateState`, {
                method: 'post',
                mode: 'cors',  
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(order)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

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
            <SockJsClient url="http://localhost:8080/yum" 
                        topics={['/topic/doctor']}
                        onMessage={msg => { console.log (msg); }} 
                        ref={$websocket} /> 

            <div id='patientList' style={divStyle}>
                환자 리스트
                {
                    orders.map( (order) => {
                        return (
                            <div onClick={() => {
                                        if(confirm(`${order.patientName} 환자의 진료를 시작하시겠습니까?`) == true){
                                            updateOrderstate(order);
                                            updatePatientNo(order.patientNo) ;
                                            setOrderNo(order.no); 
                                            setChangeState(true);
                                            sendMessage(order.patientName);
                                        }

                                    }}>
                                <p>
                                    {order.patientName} {
                                        order.state == '진료중' ? 
                                        <b>{order.state}</b> :
                                        order.state
                                    }
                                </p>
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