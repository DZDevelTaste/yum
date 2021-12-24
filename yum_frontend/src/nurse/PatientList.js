import React, {useEffect, useRef, useState} from 'react'; 
import styles1 from '../assets/scss/Content.scss';
import SiteLayout from '../../layout/SiteLayout';
import PatientInfo from './PatientInfo';
import Patients from './Patients';
import SockJsClient from 'react-stomp';
import Msg from '../../nurseMsg';

const PatientList = () => {
    
    const [currentPatientNo, setCurrentPatientNo] = useState(0);
    const [updatePatient, setUpdatePatient] = useState({});
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
                    setCurrentPatientNo={setCurrentPatientNo}
                    updateInfo={updatePatient}/>
            </div>
            <div className={styles1.RightBox}>
                <PatientInfo 
                    setUpdatePatient={setUpdatePatient}
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