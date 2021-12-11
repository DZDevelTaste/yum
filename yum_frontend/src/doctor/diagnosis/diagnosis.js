import React, { useEffect, useState } from 'react';
import Clinic from './Clinic';
import Disease from './Disease';
import Memo from './Memo';

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
        <div>
            <Disease callback={getDiseaseNo}/>
            <Clinic callback1={getClinicNo} callback2={getMedicineInfo} />
            <Memo callback={getMemo}/>
        </div>
    );
};

export default diagnosis;