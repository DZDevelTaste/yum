import React from 'react';

const clinic = () => {

    const clinicKind;
    const clinicName;
    const clinicDay;
    const clinicCount;

    return (
        <div>
            <div>
                처방
                <input type='text' onClick=''/>
            </div>
            <div>
                분류
                처방
                1일 투여횟수
                총 투여일수
            </div>
            <div>
                {clinicKind}
                {clinicName}
                {clinicDay}
                {clinicCount}
                <span background=''/>
            </div>
        </div>
    );
};

export default clinic;