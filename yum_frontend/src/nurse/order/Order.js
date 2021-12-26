import React, {useEffect, useRef, useState} from 'react'; 
import SockJsClient from 'react-stomp';

import SiteLayout from '../../layout/SiteLayout';
import OrderForm from './OrderForm';
import Patients from '../Patients';
import OrderList from './OrderList';
import Msg from '../../nurseMsg';

import styles1 from '../../assets/scss/Content.scss';
import toast, { Toaster } from 'react-hot-toast';

const Order = () => {
    const [messages, setMessages] = useState([]);
    const [deleteNum, setDeleteNum] = useState();
    const [currentPatientNo, setCurrentPatientNo] = useState(0);
    const [addPatient, setAddPatient] = useState({});
    const [addOrder, setAddOrder] = useState({});
    const [changeNum, setChangeNum] = useState(0);

    const $websocket = useRef(null); 

    useEffect(() => {
        setChangeNum(changeNum + 1);
    }, [messages])

    useEffect(() => {
        if(deleteNum !== ''){
            console.log('deleteNum:', deleteNum);
            messages.splice(deleteNum, 1);
            setDeleteNum('');
            setMessages(messages);
        }
    }, [deleteNum])

    const notifyUpdateForm = (notifyForm) => {
        console.log('notifyForm result', notifyForm);
        
        setCurrentPatientNo(0);

        if(notifyForm === 'reset'){
            return;
        }

        if(notifyForm.newPatient != null) {
            setAddPatient(notifyForm.newPatient);
        }

        setAddOrder(notifyForm.orderNo);
    }

    const NotifyToast = (data) => {
        if(data.kind === 'state'){
            toast.success(`${data.patient.name}님의 진료상태가 변경되었습니다.`);
        }
        if(data.kind === 'delete'){
            toast.success(`${data.patient.name}님 접수를 취소하였습니다.`);
        }
        if(data.kind === 'order'){
            toast.success(`${data.patient.name}님 접수 등록을 완료하였습니다.`);
        }
        if(data.result === false) {
            toast.error(`${data.patient.name}님은 이미 접수하였습니다.`);
            setCurrentPatientNo(0);
            return;
        }
    }

    return (
        <SiteLayout>
            <div className={styles1.LeftBox}>
                <div className={styles1.TopBox}>
                    <h3>환자 리스트</h3>
                    <Patients 
                        setCurrentPatientNo={setCurrentPatientNo}
                        updateInfo={addPatient}/>
                </div>
                <div className={styles1.BottomBox}>
                    <h3>접수 리스트</h3>
                    <OrderList
                        callback={NotifyToast}
                        addOrder={addOrder}
                        changeState={changeNum}/>
                </div>
            </div>

            <div className={styles1.RightBox}>
                <OrderForm 
                    callback={NotifyToast}
                    notifyUpdateForm={notifyUpdateForm}
                    no={currentPatientNo} />
            </div>
            
            <SockJsClient url="http://localhost:8080/yum" 
                    topics={['/topic/nurse']}
                    onMessage={msg => { 
                        setMessages([...messages, msg ]);
                    }} 
                    ref={$websocket} /> 
                <div>
                    {
                        messages.map( (msg, index) => {
                            return(
                                <> 
                                    <Msg 
                                        key={index}
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
                <Toaster/>
        </SiteLayout>
    );
};

export default Order;