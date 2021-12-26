import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SockJsClient from 'react-stomp';
import main from '../../assets/scss/nurse/Main.scss';
import SiteLayout from '../../layout/SiteLayout';
import Msg from '../../nurseMsg';
import MainList from './MainList';



const Main = () => {
    const [currentState, setCurrentState] = useState(0);
    const stateArray = ['전체', '예약', '진료대기', '진료중', '수납대기', '완료'];
    const [messages, setMessages] = useState([]);
    const [deleteNum, setDeleteNum] = useState('');
    const [changeNum, setChangeNum] = useState(0);

    const $websocket = useRef(null); 

    useEffect(() => {
        if(deleteNum !== ''){
            console.log('deleteNum:', deleteNum);
            messages.splice(deleteNum, 1);
            setDeleteNum('');
            setMessages(messages);
        }
    }, [deleteNum])

    useEffect(() => {
        setChangeNum(changeNum + 1);
    }, [messages])


    const NotifyToast = (data) => {
        if(data.kind === 'state'){
            toast.success(`${data.patient.name}님의 진료상태가 변경되었습니다.`);
        }
        if(data.kind === 'delete'){
            toast.success(`${data.patient.name}님 접수를 취소하였습니다.`);
        }
        if(data.kind === 'receive'){
            toast.success(`${data.patient.name}님이 수납 완료하였습니다.`);
        }
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