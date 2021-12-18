
import React, {useEffect, useRef, useState} from 'react'; 
import SockJsClient from 'react-stomp';
import Modal from 'react-modal';

function Messages () { 

    const [messages, setMessages] = useState({});
    const [modalData, setModalData] = useState({isOpen: false})

    useEffect(() => {
        console.log(messages);
        
    }, [messages])

    const $websocket = useRef(null); 

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
                        setMessages( msg );
                        setModalData({isOpen: true});
                    }} 
                    ref={$websocket} /> 
                <div>
                    message
                </div>
                <button onClick={ () => sendMessage()}>
                    checkSocket
                </button> 
                <Modal 
                    isOpen={modalData.isOpen} 
                    ariaHideApp={false} 
                    overlayClassName="overlay"
                    style={{
                            position: 'absolute', 
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -50%)'
                        }, {
                            content: {
                                width: 450, 
                                height: 250
                            }
                    }}>
                        <div>
                            {
                                messages.state == 'start' ? 
                                messages.patientName + '환자 진료실로 입장시켜주세요.' : 
                                messages.patientName + '진료를 마쳤습니다. 수납해주세요'
                            }
                        </div>
                        <div>
                            <button onClick={() => {
                                setModalData({isOpen: false})
                            }}>
                                X
                            </button>
                        </div>

                </Modal>
        </div> 
    );
} 

export default Messages;