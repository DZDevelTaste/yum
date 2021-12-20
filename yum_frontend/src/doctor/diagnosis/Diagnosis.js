import React, { useEffect, useState } from 'react';
import Clinic from './Clinic';
import Disease from './Disease';
import Memo from './Memo';
import style from '../../assets/scss/component/doctor/diagnosis/Diagnosis.scss';

const diagnosis = ({callback1, callback2, callback3, callback4}) => {
    var [diseaseNo, setDiseaseNo] = useState([]);
    var [clinicNo, setClinicNo] = useState([]);
    var [medicineInfo, setMedicineInfo] = useState([]);
    var [memo, setMemo] = useState('');;

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
        callback1(diseaseNo);
        callback2(clinicNo);
        callback3(medicineInfo);
        callback4(memo);
    }, [diseaseNo, clinicNo, medicineInfo, memo])

    return (
        <div className={style.diagnosisFrame} >
            <div className={style.diagnosisBody} >
                <Disease callback={getDiseaseNo}/>
                <Clinic callback1={getClinicNo} callback2={getMedicineInfo} />
                <Memo callback={getMemo}/>
            </div>
        </div>
    );
};

export default diagnosis;