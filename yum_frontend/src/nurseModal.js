
import React, {useEffect, useRef, useState} from 'react'; 
import SockJsClient from 'react-stomp';
import Msg from './nurseMsg';


function Messages () { 

    const [messages, setMessages] = useState([]);
    const [deleteNum, setDeleteNum] = useState();
    const [changeNum, setChangeNum] = useState(0);
    const [modalData, setModalData] = useState({isOpen: false})

    const $websocket = useRef(null); 

    useEffect(() => {
        if(deleteNum !== ''){
            console.log('deleteNum:', deleteNum);
            messages.splice(deleteNum, 1);
            setChangeNum(changeNum + 1);
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
    
    return ( 
        <div> 
            <SockJsClient url="http://34.64.204.254:8080/yum" 
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