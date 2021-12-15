import React, { useEffect, useRef, useState } from 'react';
import Diagnosis from './diagnosis/Diagnosis';
import Patient from './patient/Patient';

const App = () => {

    const [diseaseNo, setDiseaseNo] = useState([]);
    const [clinicNo, setClinicNo] = useState([]);
    const [medicineInfo, setMedicineInfo] = useState([]);
    const [orderNo, setOrderNo] = useState(0);
    const [memo, setMemo] = useState('');;
    const [data, setData] = useState([]);

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

    useEffect(() => {
        setData({
            desc: String(memo),
            orderNo: orderNo,
            userNo: 5,
            presDiseaseList: diseaseNo,
            presMedicineList: medicineInfo,
            presClinicList: clinicNo
        })

    }, [orderNo, diseaseNo, clinicNo, medicineInfo, memo])



    const submitDiagnosis = () => {
        // fetchJoin();
        console.log(data);
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
            
            window.location.href='/';

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div id='body'>
            

            <div id='patient'>
                <Patient callback={getOrderNo}/>
            </div>
            <div id='diagnosis'>
                <Diagnosis callback1={getDiseaseNo} callback2={getClinicNo} callback3={getMedicineInfo} callback4={getMemo}/>
            </div>
            <button onClick={() => submitDiagnosis()}>진료 완료</button>
        </div>
    );
};

export default App;