import React, {useEffect, useRef, useState} from 'react'; 
import styles1 from '../assets/scss/Content.scss';
import SiteLayout from '../layout/SiteLayout';
import PatientInfo from './PatientInfo';
import Patients from './Patients';
import SockJsClient from 'react-stomp';
import Msg from '../msg';



const PatientList = () => {
    const [selectNo, setSelectNo] = useState('');
    const [updateInfo, setUpdateInfo] = useState(false);
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

    // const notifyNoChange = (selectNo) => {
    //     setSelectNo(selectNo);
    // }
    const notifyInfoChange = (chkResult) => {
        setUpdateInfo(chkResult);

        setUpdateInfo(false);
    }
    
    return (
        <SiteLayout>
            <div className={styles1.LeftBox}>
                <Patients 
                    setSelectNo={setSelectNo}
                    updateInfo={updateInfo}/>
            </div>
            <div className={styles1.RightBox}>
                <PatientInfo 
                    callback={notifyInfoChange}
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

export default PatientList;