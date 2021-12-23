import React, {useEffect, useRef, useState} from 'react'; 
import SockJsClient from 'react-stomp';
import { Outlet } from 'react-router';
import Msg from '../msg';
import SiteLayout from '../layout/SiteLayout';
import MainList from './MainList';

import main from '../assets/scss/nurse/Main.scss';
import toast, { Toaster } from 'react-hot-toast';


const Main = () => {
    const [currentState, setCurrentState] = useState(0);
    const stateArray = ['전체', '예약', '진료대기', '진료중', '수납대기', '완료'];
    const [messages, setMessages] = useState([]);
    const [deleteNum, setDeleteNum] = useState();
    const [changeNum, setChangeNum] = useState(0);

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
        setChangeNum(changeNum + 1);
        console.log(changeNum);
    }, [messages])


    const NotifyToast = (data) => {
        toast.success(`${data.patient.name}님의 진료상태가 변경되었습니다.`);
    }
    return (
        <SiteLayout>
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
            <div className={main.stateBtn}>
                {
                    stateArray
                        .map((state, index) => {
                            return(
                                <button 
                                    key={index}
                                    className={currentState === index ? main.active : null} 
                                    value={index}
                                    onClick={() => setCurrentState(index)}>
                                    {state}
                                </button>
                            );
                        })
                }
            </div>
            <div className={main.MainContentBox}>
                <MainList
                    currentState={currentState} changeState={changeNum} callback={NotifyToast}/>
            </div>

            <Toaster/>
        </SiteLayout>
    );
};

export default Main;