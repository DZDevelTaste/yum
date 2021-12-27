import React, { useEffect, useRef, useState } from 'react';
import Diagnosis from './diagnosis/Diagnosis';
import Patient from './patient/Patient';
import style from '../assets/scss/component/doctor/DoctorMain.scss';
import SiteLayout from '../layout/SiteLayout';
import Msg from '../doctorMsg';
import SockJsClient from 'react-stomp';

const App = () => {

    const [diseaseNo, setDiseaseNo] = useState([]);
    const [clinicNo, setClinicNo] = useState([]);
    const [medicineInfo, setMedicineInfo] = useState([]);
    const [orderNo, setOrderNo] = useState(0);
    const [patientName, setPatientName] = useState('');
    const [memo, setMemo] = useState('');;
    const [data, setData] = useState([]);
    const [messages, setMessages] = useState([]);
    const [deleteNum, setDeleteNum] = useState();
    const [changeNum, setChangeNum] = useState(0);
    const [inPatientNo, setInPatientNo] = useState(0);

    const $websocket = useRef(null); 


    useEffect(() => {
        setChangeNum(changeNum + 1);
        
    }, [messages])

    useEffect(() => {
        // fetchJoin();
    }, [changeNum])

    useEffect(() => {
        if(deleteNum !== ''){
            console.log('deleteNum:', deleteNum);
            messages.splice(deleteNum, 1);
            setDeleteNum('');
            setMessages(messages);
        }
    }, [deleteNum])

    // 자식 컴포넌트에서 값 받아오기
        const getOrderNo = (orderNo) => {
            setOrderNo(orderNo);
        }

        const getDiseaseNo = (diseaseNo) => {
            setDiseaseNo(diseaseNo);
        }

        const getClinicNo = (clinicNo) => {
            setClinicNo(clinicNo);
        }

        const getMedicineInfo = (medicineInfo) => {
            setMedicineInfo(medicineInfo);
        }

        const getMemo = (memo) => {
            setMemo(memo);
        }

        const getPatientName = (patientName) => {
            setPatientName(patientName);
        }

    useEffect(() => {
        setData({
            desc: String(memo),
            orderNo: orderNo,
            userNo: sessionStorage.getItem('no'),
            presDiseaseList: diseaseNo,
            presMedicineList: medicineInfo,
            presClinicList: clinicNo
        })

    }, [orderNo, diseaseNo, clinicNo, medicineInfo, memo])



    const submitDiagnosis = (e) => {
        // e.preventDefault();
        if(orderNo == 0){
            alert('환자를 선택해주세요.');
            return;
        }
        else if(diseaseNo.length < 1){
            alert('병명을 기입해주세요.');
            return;
        }
        else if(medicineInfo.length < 1 && clinicNo.length < 1){
            if(confirm('약품과 치료를 처방하지 않았습니다. 진료를 마치시겠습니까?') == true){
                sendMessage();
                fetchJoin();
            }
        }
        else{
            sendMessage();
            fetchJoin();
        }
    }

    const sendMessage = async () => {
        try {
            const response = await fetch('/message/api', {
                method: 'post',
                mode: 'cors',  
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "patientName": patientName,
                    "from": "doctor",
                    "to": "nurse",
                    "state": "finish"
                    })
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

        } catch (error) { 
            console.error(error);
        }
    }
    
    
    const fetchJoin = async() => {
        try {
            const response = await fetch(`/api/doctor/finishDiagnosis`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            // const json = await response.json();
            
            window.location.href='/doctor';

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SiteLayout>
            <SockJsClient url="http://34.64.204.254:8080/yum" 
                    topics={['/topic/doctor']}
                    onMessage={msg => { 
                        setMessages([...messages, msg ]);
                        setInPatientNo(msg.no);
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

            <div className={style.body} > 
                <div className={style.patient} >
                    <Patient callback1={getOrderNo} callback2={getPatientName} changeState={changeNum} sendPatientNo={inPatientNo} />
                </div>
                <div className={style.diagnosis}>
                    <div className={style.diagnosisTitle} >
                        진료
                    </div>
                    <Diagnosis callback1={getDiseaseNo} callback2={getClinicNo} callback3={getMedicineInfo} callback4={getMemo}/>
                </div>
                <button className={style.button} onClick={() => {
                        submitDiagnosis()}}>
                    진료 완료
                </button>
            </div>
        </SiteLayout>
    );
};

export default App;