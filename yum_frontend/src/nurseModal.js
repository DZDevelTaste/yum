
import React, {useEffect, useRef, useState} from 'react'; 
import SockJsClient from 'react-stomp';
import Msg from './msg';


function Messages () { 

    const [messages, setMessages] = useState([]);
    const [deleteNum, setDeleteNum] = useState();
    const [changeNum, setChangeNum] = useState(0);
    const [modalData, setModalData] = useState({isOpen: false})

    const $websocket = useRef(null); 

    const getDeleteNum = (deleteNum) => {
        setDeleteNum(deleteNum);
        setChangeNum(changeNum + 1);
    }

    useEffect(() => {
        messages.splice(deleteNum, 1);
        setChangeNum(changeNum + 1);
        if(messages.length < 1){
            setDeleteNum();
        }
    }, [deleteNum])

    useEffect(() => {
        setMessages(messages);
    }, [changeNum])

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
    
    return ( 
        <div> 
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
                                        callback={getDeleteNum}>
                                    </Msg>
                                    <div>messages</div>
                                </>
                            )
                        })
                    }
                </div>
                <button onClick={ () => sendMessage()}>
                    checkSocket
                </button> 
        </div> 
    );
} 

export default Messages;