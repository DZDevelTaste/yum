import React from 'react';
import patientOrderList from './patientOrderList';

const patientPastOrder = (patientNo) => {
    return (
        <div id='patientPastOrder'>
            과거 이력
            <div id=''>
                내원일
                담당의
                병명
                처방
            </div>
            <patientOrderList patientNo={patientNo}/>
        </div>
    );
};

export default patientPastOrder;