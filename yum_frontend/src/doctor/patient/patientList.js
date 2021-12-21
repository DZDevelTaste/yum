import React, { useEffect, useRef, useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientPastOrder from './PatientPastOrder';
import SockJsClient from 'react-stomp';
import Modal from 'react-modal';
import style from '../../assets/scss/component/doctor/patient/PatientList.scss'

const patientList = ({callback1, callback2}) => {
    const [modalData, setModalData] = useState({isOpen: false})
    const [orders, setOrders] = useState([]);
    const [patientNo, setPatientNo] = useState(0);
    const [orderNo, setOrderNo] = useState(0);              // value for insert
    const [patientName, setPatientName] = useState('');     // value for doctorMain
    const [changeState, setChangeState] = useState(false);

    const $websocket = useRef(null); 

    useEffect(() => {
        console.log(changeState);
    }, []);

    useEffect(() => {
        callback1(orderNo);
    }, [orderNo])

    useEffect(() => {
        callback2(patientName);
    }, [patientName])

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
                    "state": "start"
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

    return (
        <>
            <SockJsClient url="http://localhost:8080/yum" 
                        topics={['/topic/doctor']}
                        onMessage={msg => { console.log (msg); }} 
                        ref={$websocket} /> 
            <div className={style.patientList} >
                <div className={style.patientListTitle}>
                    환자 리스트
                </div>
                <div className={style.orders} >
                    
                    {
                        orders.map( (order) => {
                            return (
                                <div className={style.order} onClick={() => {

                                            // changeState == true ?
                                            // alert('동시 진료는 불가능합니다.') :
                                            // (
                                            //     confirm(`${order.patientName} 환자의 진료를 시작하시겠습니까?`) == true &&
                                            //     updateOrderstate(order),
                                            //     updatePatientNo(order.patientNo),
                                            //     setOrderNo(order.no),
                                            //     setChangeState(true),
                                            //     sendMessage(order.patientName),
                                            //     setPatientName(order.patientName)
                                            // )
                                            if(confirm(`${order.patientName} 환자의 진료를 시작하시겠습니까?`) == true){
                                                updateOrderstate(order);
                                                updatePatientNo(order.patientNo) ;
                                                setOrderNo(order.no); 
                                                setChangeState(true);
                                                sendMessage(order.patientName);
                                                setPatientName(order.patientName);
                                            }
                                            
                                        }}>
                                        
                                        <div className={style.firstDiv}>
                                            {order.patientName} 
                                        </div>
                                        <div className={style.secondDiv}>
                                        </div>
                                        <div className={style.lastDiv}>
                                        {
                                            order.state == '진료중' ? 
                                            <b>{order.state}</b> :
                                            order.state
                                        }
                                        </div>
                                </div>
                            )
                        })
                        
                    }
                </div>
            </div>
            <div className={style.patientInfo} >
                <PatientInfo patientNo={ patientNo } />
            </div>
            <div className={style.patientPastOrder} >
                <PatientPastOrder patientNo={ patientNo } />
            </div>
            <Modal isOpen={modalData.isOpen} 
                ariaHideApp={false} 
                overlayClassName="overlay"
                style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}, {content: {width: 450, height: 250}}}>

            </Modal>
        </>
    );
};

export default patientList;