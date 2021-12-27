import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from '../../assets/scss/component/doctor/diagnosis/Clinic.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import { faCheck, faDonate, faTimes } from '@fortawesome/free-solid-svg-icons';

const clinic = ({callback1, callback2}) => {
    const [modalData, setModalData] = useState({isOpen: false})
    const [preses, setPreses] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [kind, setKind] = useState('');
    const [changeValue, setChangeValue] = useState(0);

    const [clinicNo, setClinicNo] = useState([]);                   // value for insert
    const [medicineInfo, setMedicineInfo] = useState([]);           // value for insert

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
        <div className={style.clinicBody}>
            <div className={style.head}>
                <span>처방</span>
                <input type='text' onClick={() => setModalData({isOpen: true})}/>
            </div>
            <div className={style.menu}>
                <div className={style.kindMenu}>
                분류
                </div >
                <div className={style.cliNameMenu}>
                처방
                </div>
                <div className={style.medicineMenu}>
                1일 투여횟수
                </div>
                <div className={style.medicineMenu}>
                총 투여일수
                </div>
                <div className={style.deleteMenu}>
                </div>
            </div>
            {/* <div className={style.clinicBody}> */}
                {
                    medicineInfo.map( medicineinfo => {
                        return (
                            <div className={style.medicine}>
                                <div className={style.kind}>{medicineinfo.kind}</div>
                                <div className={style.name}>{medicineinfo.name}</div>
                                <div className={style.mediDayAndCount}>
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
                                </div>
                                <div className={style.mediDayAndCount}>
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
                                </div>
                                <div className={style.deleteBtnDiv}>
                                    <button className={style.deleteBtn} onClick={ () => {
                                        if(confirm(`${medicineinfo.name} 처방을 삭제하시겠습니까?`) == true){
                                            setChangeValue(changeValue + 1)
                                            medicineInfo.splice(medicineInfo.indexOf(medicineinfo), 1)}
                                        }}>
                                        <FontAwesomeIcon icon={faTimes} size="lg" color="#CF1313"/>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    clinicNo.map( clinic => {
                        return (
                            <div className={style.clinic}>
                                <div className={style.kind}>{clinic.kind}</div>
                                <div className={style.name}>{clinic.name}</div>
                                <div className={style.mediDayAndCount}></div>
                                <div className={style.mediDayAndCount}></div>
                                <div className={style.deleteBtnDiv}>
                                    <button className={style.deleteBtn} onClick={ () => {
                                        if(confirm(`${clinic.name} 처방을 삭제하시겠습니까?`) == true){
                                            setChangeValue(changeValue + 1)
                                            clinicNo.splice(clinicNo.indexOf(clinic), 1)}
                                        }}>
                                        <FontAwesomeIcon icon={faTimes} size="lg" color="#CF1313"/>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            {/* </div> */}
            <Modal 
                isOpen={modalData.isOpen} 
                ariaHideApp={false} 
                onRequestClose={ () => setModalData(false) }
                shouldCloseOnOverlayClick={ true }
                className={style.modal}
                style={{content: {width: 500, height: 400}}}>
                <div className={style.modalHead}>
                    <div className={style.title}>처방</div>
                    <button className={style.closeButton} onClick={() => setModalData({isOpen: false})}>
                        <FontAwesomeIcon icon={faTimes} size="lg" color="#CF1313"/>
                    </button>
                </div>
                <div className={style.radioDiv}>
                    <label><input type='radio' name='selectPres' value='약품' onChange={ e => setKind(e.target.value) }/>약품</label>
                    <label><input type='radio' name='selectPres' value='주사' onChange={ e => setKind(e.target.value) }/>주사</label>
                    <label><input type='radio' name='selectPres' value='드레싱' onChange={ e => setKind(e.target.value) }/>드레싱</label>
                    <label><input type='radio' name='selectPres' value='깁스' onChange={ e => setKind(e.target.value) }/>깁스</label>
                    <label><input type='radio' name='selectPres' value='물리치료' onChange={ e => setKind(e.target.value) }/>물리치료</label>
                    <label><input type='radio' name='selectPres' value='X-Ray' onChange={ e => setKind(e.target.value) }/>X-Ray</label>
                </div>
                <div >
                    <input className={style.inputBox} type='text'  onChange={ e => setKeyword(e.target.value)}  />
                </div> 
                <div className={style.modalBody}>
                    <div className={style.menu}>
                        <div className={style.kindMenu}>분류</div>
                        <div className={style.nameMenu}> 처방</div>
                    </div>
                    <div className={style.lists}>
                        
                        {
                            preses
                            .filter( pres => pres.name.indexOf(keyword) !== -1 && pres.kind.indexOf(kind) !== -1)
                            .map( pres => {
                                return (
                                    <div className={style.list} onClick={() => {
                                        
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
                                        <div className={style.kind}>{pres.kind}</div>
                                        <div className={style.name}>{pres.name}</div>
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