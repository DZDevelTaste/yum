import React, {useEffect, useRef, useState} from 'react'; 
import SockJsClient from 'react-stomp';

import SiteLayout from '../layout/SiteLayout';

import styles1 from '../assets/scss/Content.scss';
import styles2 from '../assets/scss/Order.scss';
import Patients from './Patients';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import Msg from '../msg';



const Reservation = () => {
    // const [selectPatient, setSelectPatient] = useState({});
    const [selectNo, setSelectNo] = useState(0);
    const [selectReservationNo, setSelectReservationNo] = useState(0);
    const [reservationList, setReservationList] = useState([]);
    const [updateList, setUpdateList] = useState(false);
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

    useEffect(() => {
        console.log('Reservation Component selectNo: ', selectNo);
    }, [selectNo]);

    const notifyUpdateForm = () => {
        console.log('updateFormmmmmmmmmmmmmmmm');
    }

    return (
        <SiteLayout>
            <div className={styles2.LeftBox}>
                <div className={styles1.TopBox}>
                    <h2>환자 리스트</h2>
                    <Patients 
                        setSelectNo={setSelectNo}/>
                </div>
                <div className={styles1.BottomBox}>
                    <h2>예약 리스트</h2>
                    <ReservationList
                        callback={setReservationList}
                        setSelectReservationNo={setSelectReservationNo}
                        updateList={updateList}
                        setUpdateList={setUpdateList}/>
                </div>
            </div>

            <div className={styles1.RightBox}>
                <ReservationForm 
                    setUpdateList={setUpdateList}
                    reservationList={reservationList}
                    selectNo={selectNo}
                    selectReservationNo={selectReservationNo}
                    setSelectReservationNo={setSelectReservationNo}
                    setSelectNo={setSelectNo} />
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

export default Reservation;