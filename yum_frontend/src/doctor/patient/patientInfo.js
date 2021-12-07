import React from 'react';

const patientInfo = (patientNo) => {
    const patient;
    return (
        <div id='patientInfo'>
            환자 정보
            <div>
                이름: {patient.No}
                주민등록번호: {patient.rrn}
                키: {patient.height}
                몸무게: {patient.weight}
                주소: {patient.address}
            </div>
        </div>
    );
};

export default patientInfo;