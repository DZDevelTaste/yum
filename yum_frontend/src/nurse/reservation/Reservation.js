import React, {useEffect, useRef, useState} from 'react'; 
import SockJsClient from 'react-stomp';
import SiteLayout from '../../layout/SiteLayout';
import styles1 from '../../assets/scss/Content.scss';
import Patients from '../Patients';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import Msg from '../../nurseMsg';
import toast, { Toaster } from 'react-hot-toast';



const Reservation = () => {
    const [currentPatientNo, setCurrentPatientNo] = useState(0);
    const [selectReservationNo, setSelectReservationNo] = useState(0);
    const [reservations, setReservations] = useState([]);
    const [updateList, setUpdateList] = useState({});
    const [messages, setMessages] = useState([]);
    const [deleteNum, setDeleteNum] = useState();
    const [changeNum, setChangeNum] = useState(0);

    const $websocket = useRef(null); 

    useEffect(() => {
        if(deleteNum !== ''){
            messages.splice(deleteNum, 1);
            setDeleteNum('');
            setMessages(messages);
        }
    }, [deleteNum])

    useEffect(() => {
        setChangeNum(changeNum + 1);
        console.log(changeNum);
    }, [messages])

    const NotifyToast = (data) => {
        console.log('reservation', data);
        if(data.kind === 'add'){
            toast.success(`${data.patient.name}님 예약이 ${data.date}에 완료되었습니다.`);
        }
        if(data.kind === 'update'){
            toast.success(`${data.patient.name}님의 예약이 ${data.date}로 변경되었습니다.`);
        }
        if(data.kind === 'delete'){
            toast.success(`${data.patient.name}님의 예약을 취소하였습니다.`);
        }
    }    

    return (
        <SiteLayout>
            <div className={styles1.LeftBox}>
                <div className={styles1.TopBox}>
                    <h3>환자 리스트</h3>
                    <Patients 
                        setCurrentPatientNo={setCurrentPatientNo}/>
                </div>
                <div className={styles1.BottomBox}>
                    <h3>예약 리스트</h3>
                    <ReservationList
                        setReservations={setReservations}
                        setSelectReservationNo={setSelectReservationNo}
                        updateList={updateList}
                        setUpdateList={setUpdateList}
                        callback={NotifyToast}
                        changeState={changeNum}/>
                </div>
            </div>

            <div className={styles1.RightBox}>
                <ReservationForm 
                    setUpdateList={setUpdateList}
                    reservations={reservations}
                    currentPatientNo={currentPatientNo}
                    selectReservationNo={selectReservationNo}
                    setSelectReservationNo={setSelectReservationNo}
                    setCurrentPatientNo={setCurrentPatientNo}
                    callback={NotifyToast}
                />
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
            <Toaster />
        </SiteLayout>
    );
};

export default Reservation;