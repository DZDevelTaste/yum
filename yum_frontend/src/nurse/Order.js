import React, {useEffect, useRef, useState} from 'react'; 
import SockJsClient from 'react-stomp';

import SiteLayout from '../layout/SiteLayout';
import OrderForm from './OrderForm';
import Patients from './Patients';
import OrderList from './OrderList';
import Msg from '../msg';

import styles1 from '../assets/scss/Content.scss';
import styles2 from '../assets/scss/Order.scss';

const Order = () => {
    const [selectNo, setSelectNo] = useState('');
    const [addPatient, setAddPatient] = useState(false);
    const [addOrder, setAddOrder] = useState(false);
    const [messages, setMessages] = useState([]);
    const [deleteNum, setDeleteNum] = useState();
    const [modalData, setModalData] = useState({isOpen: false})

    const $websocket = useRef(null); 

    useEffect(() => {
        if(deleteNum !== ''){
            console.log('deleteNum:', deleteNum);
            messages.splice(deleteNum, 1);
            setDeleteNum('');
            setMessages(messages);
        }
    }, [deleteNum])
    
    const sendMessage = async () => {
        try {
            const response = await fetch('/message/api2', {
                method: 'post',
                mode: 'cors',  
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "patientName": messages.patientName,
                    "from": "nurse",
                    "to": "doctor",
                  })
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

        } catch (error) { 
            console.error(error);
        }
    }

    const notifyUpdateForm = (notifyForm) => {
        console.log('notifyForm result', notifyForm);
        
        setSelectNo(0);
        if(notifyForm === 'reset'){
            return;
        }

        if(notifyForm.newPatient != null) {
            setAddPatient(notifyForm.newPatient);
        }

        setAddOrder(notifyForm.orderNo);
    }

    return (
        <SiteLayout>
            <div className={styles2.LeftBox}>
                <div className={styles1.TopBox}>
                    <h2>환자 리스트</h2>
                    <Patients 
                        setSelectNo={setSelectNo}
                        updateInfo={addPatient}/>
                </div>
                <div className={styles1.BottomBox}>
                    <h2>접수 리스트</h2>
                    <OrderList
                        addOrder={addOrder}/>
                </div>
            </div>

            <div className={styles1.RightBox}>
                <OrderForm 
                    callback={notifyUpdateForm}
                    no={selectNo} />
            </div>
            
            <SockJsClient url="http://localhost:8080/yum" 
                    topics={['/topic/nurse']}
                    onMessage={msg => { 
                        setMessages([...messages, msg ]);
                    }} 
                    ref={$websocket} /> 
                <div>
                    {
                        messages.map( msg => {
                            return(
                                <> 
                                    <Msg 
                                        patientName={msg.patientName} 
                                        from={msg.from} 
                                        to={msg.to} 
                                        timestamp={msg.timestamp} 
                                        state={msg.state} 
                                        height={messages.indexOf(msg) * 14}
                                        indexNum = {messages.indexOf(msg)}
                                        setDeleteNum={setDeleteNum}>
                                    </Msg>
                                </>
                            )
                        })
                    }
                </div>

        </SiteLayout>
    );
};

export default Order;