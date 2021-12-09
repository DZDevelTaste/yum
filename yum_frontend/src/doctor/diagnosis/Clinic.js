import React, { useState } from 'react';
import Modal from 'react-modal';

const clinic = () => {
    const [modalData, setModalData] = useState({isOpen: false})

    const clinicKind = 0;
    const clinicName = 0;
    const clinicDay = 0;
    const clinicCount = 0;

    const divStyle ={
        display: 'inline-block',
        border: '1px solid black',
        width: 400,
        height: 300,
        float: 'left'
    }

    return (
        <div style={divStyle}>
            <div>
                처방
                <input type='text' onClick={() => setModalData({isOpen: true})}/>
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
            <Modal isOpen={modalData.isOpen} style={{position: 'absolute', top: '50%', left: '50%', transform: 'traslate(-50%, -50%)'}, {content: {width: 450, height: 250}}}>
                <div>처방 <button onClick={() => setModalData({isOpen: false})}>X</button></div>
                <div>
                    <label><input type='checkbox' value='medicine' />약품</label>
                    <label><input type='checkbox' value='inject' />주사</label>
                    <label><input type='checkbox' value='dressing' />드레싱</label>
                    <label><input type='checkbox' value='cast' />깁스</label>
                    <label><input type='checkbox' value='physicalTherapy' />물리치료</label>
                    <label><input type='checkbox' value='xRay' />X-Ray</label>
                </div>
                <div><input type='text' /* onChange={} */ /></div>
                
                <div>
                    <div>
                        <div>질병코드 병명</div>
                        <div></div>
                        {/* 주형이 코드 받아오자 */}
                        
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default clinic;