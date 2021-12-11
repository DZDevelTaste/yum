import React, { useEffect, useState } from 'react';
import Diagnosis from './diagnosis/Diagnosis';
import Patient from './patient/Patient';

const App = () => {
    
    const [orderNo, setOrderNo] = useState(0);
    const [diseaseNo, setDiseaseNo] = useState([{}]);
    const [clinicNo, setClinicNo] = useState([]);
    const [medicineInfo, setMedicineInfo] = useState([]);
    const [memo, setMemo] = useState('');;

    const [data, setData] = useState({
        desc: '',
        orderNo: '',
        userNo: '',
        presDiseaseList: [],
        presMedicineList: [],
        presClinicList: []
    });
    
    const [data1, setData1] = useState([]);

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
        console.log(orderNo);
        console.log(diseaseNo);
        console.log(clinicNo);
        console.log(medicineInfo);
        console.log(memo);
        setData({
            desc: memo,
            orderNo: orderNo,
            userNo: 1,
            presDiseaseList: [{
                'diseaseNo': diseaseNo
            }],
            presMedicineList: [clinicNo],
            presClinicList: [medicineInfo]
        })

    }, [orderNo, diseaseNo, clinicNo, medicineInfo, memo])



    const submitDiagnosis = () => {
        // console.log(orderNo);
        // console.log(diagnosisInfo);
        fetchJoin();
    }
    
    const fetchJoin = async() => {
        try {
            const response = await fetch(`/api/doctor/insertDisease`, {
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
            const json = await response.json();
            
            
            location.href='/';
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