import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const clinic = ({callback1, callback2}) => {
    const [modalData, setModalData] = useState({isOpen: false})
    const [preses, setPreses] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [kind, setKind] = useState('');
    const [changeValue, setChangeValue] = useState(0);

    const [clinicNo, setClinicNo] = useState([]);                   // value for insert
    const [medicineInfo, setMedicineInfo] = useState([]);           // value for insert

    const divStyle ={
        display: 'inline-block',
        border: '1px solid black',
        width: 400,
        height: 300,
        float: 'left'
    }

    useEffect(() => {
        callback1(clinicNo);
        callback2(medicineInfo);

    }, [clinicNo, medicineInfo])

    useEffect(() => {
        fetchPrescription();
    }, [])

    const fetchPrescription = async() => {
        try {
            const response = await fetch('/api/doctor/findPrescription', {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            setPreses([...json.data,...preses]);

        } catch (error) {
            console.error(error);
        }
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
                {
                    clinicNo.map( clinic => {
                        return (
                            <div>
                                <span>{clinic.kind}</span>
                                <span>{clinic.name}</span>
                                <button onClick={ () => {
                                    if(confirm(`${clinic.name} 처방을 삭제하시겠습니까?`) == true){
                                        setChangeValue(changeValue + 1)
                                        clinicNo.splice(clinicNo.indexOf(clinic), 1)}
                                    }}>
                                    삭제
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {
                    medicineInfo.map( medicineinfo => {
                        return (
                                <div>
                                    <span>{medicineinfo.kind}</span>
                                    <span>{medicineinfo.name}</span>
                                    <span>
                                        <select onChange={e => medicineinfo.presmedicineDay = e.target.value}>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                            <option value='6'>6</option>
                                            <option value='7'>7</option>
                                            <option value='8'>8</option>
                                            <option value='9'>9</option>
                                            <option value='10'>10</option>
                                        </select>
                                    </span>
                                    <span>
                                        <select onChange={e => medicineinfo.presmedicineCount = e.target.value}>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                            <option value='6'>6</option>
                                            <option value='7'>7</option>
                                            <option value='8'>8</option>
                                            <option value='9'>9</option>
                                            <option value='10'>10</option>
                                        </select>
                                    </span>
                                    <button onClick={ () => {
                                        if(confirm(`${medicineinfo.name} 처방을 삭제하시겠습니까?`) == true){
                                            setChangeValue(changeValue + 1)
                                            medicineInfo.splice(medicineInfo.indexOf(medicineinfo), 1)}
                                        }}>
                                        삭제
                                    </button>
                                </div>
                        )
                    })
                }
            </div>
            <Modal isOpen={modalData.isOpen} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}, {content: {width: 450, height: 250}}}>
                <div>처방 <button onClick={() => setModalData({isOpen: false})}>X</button></div>
                <div>
                    <label><input type='radio' name='selectPres' value='약품' onChange={ e => setKind(e.target.value) }/>약품</label>
                    <label><input type='radio' name='selectPres' value='주사' onChange={ e => setKind(e.target.value) }/>주사</label>
                    <label><input type='radio' name='selectPres' value='드레싱' onChange={ e => setKind(e.target.value) }/>드레싱</label>
                    <label><input type='radio' name='selectPres' value='깁스' onChange={ e => setKind(e.target.value) }/>깁스</label>
                    <label><input type='radio' name='selectPres' value='물리치료' onChange={ e => setKind(e.target.value) }/>물리치료</label>
                    <label><input type='radio' name='selectPres' value='X-Ray' onChange={ e => setKind(e.target.value) }/>X-Ray</label>
                </div>
                <div>
                    <input type='text' onChange={ e => setKeyword(e.target.value) } /></div>
                <div>
                    <div>
                        <div>분류 처방</div>
                        {
                            preses
                            .filter( pres => pres.name.indexOf(keyword) !== -1 && pres.kind.indexOf(kind) !== -1) //미구현
                            .map( pres => {
                                return (
                                    <div onClick={() => {
                                        
                                        if(pres.kind == '약품'){
                                            pres.medicineNo = pres.no;
                                            delete pres.no;
                                            medicineInfo.includes(pres) ?
                                            alert('이미 선택된 처방입니다') : (
                                            setModalData({isOpen: false}),
                                            setMedicineInfo([...medicineInfo, pres]))
                                        } else {
                                            pres.clinicNo = pres.no;
                                            delete pres.no;
                                            clinicNo.includes(pres) ?
                                            alert('이미 선택된 처방입니다') : (
                                            setModalData({isOpen: false}),
                                            setClinicNo( [...clinicNo,  pres]))
                                        }
                                    }}>
                                        <lable>{pres.kind}</lable>
                                        <lable>{pres.name}</lable>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default clinic;