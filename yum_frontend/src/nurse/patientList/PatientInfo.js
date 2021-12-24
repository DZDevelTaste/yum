import React, { Fragment, useEffect, useRef, useState } from 'react';

import InfoStyles from '../../assets/scss/nurse/PatientInfo.scss';
import postcodeStyles from '../../assets/scss/Postcode.scss';



const PatientInfo = ({currentPatientNo, setCurrentPatientNo, setUpdatePatient, changeAddForm, setChangeAddForm}) => {
    const [chooseButton, setChooseButton] = useState(false);
    const [patientInfo, setPatientInfo] = useState({});
    const [diagnosisList, setDiagnosisList] = useState([]);
    const [updateInfo, setUpdateInfo] = useState({gender: 'M', insuarance: 'N'});
    const [phone, setPhone] = useState({phone1: '010'});
    const [rrn, setRrn] = useState({});
    const [addr, setAddr] = useState({});
    const [formSuccess, setFormSuccess] = useState(false);
    const postcodeRef = useRef(null);

    const loadLayout = (e) => {
        window.daum.postcode.load(() => {
            const postcode = new window.daum.Postcode({
                oncomplete: function (data) {
                    let address = data.address;
                    let extraAddress = ''; // 참고항목
            
                    // 내려오는 변수가 값이 없는 경우 공백('') 값을 가짐 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져옴
                    if (data.addressType === 'R') { // addressType - 검색된 기본 주소 타입: R(도로명), J(지번)
                        if (data.bname !== '') { // bname - 법정동/법정리 이름
                            // bname 값이 있을 경우 extraAddress에 추가
                            extraAddress += data.bname;
                        }
                        if (data.buildingName !== '') { // buidingName - 건물명
                            // extraAddress가 빈값이 아니면 ', 건물명'으로 빈값일 경우 '건물명'으로 추가
                            extraAddress += (
                                extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
                            );
                        }
            
                        if(extraAddress !== ''){
                            address += ` (${extraAddress})`;
                        }
                    }
                    // console.log(data.zonecode); 
                    // console.log(fullAddress);   // e.g. '서울 성동구 왕십리로2길20 (성수동1가)'
                    const addressData = {
                        zonecode: data.zonecode,
                        address: address,
                    }
            
                    setAddr({ zonecode: data.zonecode, address: address });
                },
            });

            postcode.open({
                popupTitle: '주소 검색',
                popupKey: 'addressPopup1',
                left: (e.clientX / 2),
                top: (e.clientY / 2)
            });

        });
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.body.append(script);
    }, []);

    /* patientNo 값이 들어온 경우(환자를 선택한 경우) 실행 */
    useEffect(() => {
        if(currentPatientNo !== 0) {
            if(changeAddForm){
                setChangeAddForm(false);
            }
            selectPatient();
            setChooseButton(false);
        }
    }, [currentPatientNo]);

    useEffect(() => {
        if(changeAddForm){
            cleanForm();
            setChooseButton(true);
        }
    }, [changeAddForm]);

    /* patientNo를 받아왔을 때 해당 환자의 정보를 가져온다 */
    const selectPatient = async () => {
        try {
            const response = await fetch(`/api/nurse/patientInfo/${currentPatientNo}`, {
                method: 'get',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            /* 받아온 Json Data를 PatientVo는 PatientInfo, DiagnosisList는 diagnosisList에 set */
            // console.log(jsonResult.data.diagnosisList);
            // console.log(jsonResult.data.patientVo);
            // setPatientInfo(jsonResult.data.patientVo);
            
            const resultRrn = jsonResult.data.patientVo.rrn.split('-');
            const resultPhone = jsonResult.data.patientVo.phone.split('-');
            const resultAddr = jsonResult.data.patientVo.address;
            
            const resultZonecode = resultAddr.substr(resultAddr.indexOf('(',0)+1, 5);       // 우편번호
            const resultAddress = resultAddr.indexOf(' / ') !== -1 
                                    ? resultAddr.substring(resultAddr.indexOf(')', 0)+2, resultAddr.indexOf(' / ')) 
                                    : resultAddr.substring(resultAddr.indexOf(')', 0)+2);        // 기본 주소 
            const resultDetailAddress = resultAddr.indexOf(' / ') !== -1 
                                        ? resultAddr.substr(resultAddr.indexOf(' / ')+3) : '';     // 상세주소

            setPatientInfo(
                Object.assign(
                    {}, 
                    jsonResult.data.patientVo, 
                    {
                        address: resultAddr.replace(' / ', ' '),
                        length: jsonResult.data.patientVo.length.toFixed(2),
                        weight: jsonResult.data.patientVo.weight.toFixed(2)
                    }
                )
            )
            
            

            setRrn(
                {
                    rrn1: resultRrn[0], 
                    rrn2: resultRrn[1] 
                });

            setPhone(
                {
                    phone1: resultPhone[0],
                    phone2: resultPhone[1],
                    phone3: resultPhone[2]                
                }
            )

            setAddr(
                {
                    zonecode: resultZonecode,
                    address: resultAddress,
                    detailAddress: resultDetailAddress
                }
            )
            setDiagnosisList(jsonResult.data.diagnosisList);
        } catch (err) {
            console.error(err);
        }
    }
    
    /* 닫기 버튼 이벤트 */
    const cleanForm = () => {
        setChooseButton(false);
        setPatientInfo({});
        setUpdateInfo({gender: 'M', insuarance: 'N'});
        setRrn({});
        setAddr({});
        setPhone({phone1: '010'});
        setCurrentPatientNo(0);
    }

    const formCheck = () => {
        if(patientInfo === updateInfo) {
            changeEditForm();
            return;
        }
        
        if(updateInfo.name == undefined || updateInfo.name.trim() === '') {
            alert('이름을 입력해주세요.');
            return;
        }
        if(rrn.rrn1 == undefined || rrn.rrn1.trim() === '' || rrn.rrn2 == undefined || rrn.rrn2.trim() === '') {
            alert('주민등록번호를 입력해주세요.');
            return;
        }
        if(phone.phone2 == undefined || phone.phone2.trim() === '' || phone.phone2 == undefined || phone.phone2.trim() === '') {
            alert('연락처를 입력해주세요.');
            return;
        }

        if(updateInfo.length == undefined || updateInfo.length === '') {
            alert('키를 입력해주세요.');
            return;
        }

        if(updateInfo.weight == undefined || updateInfo.weight === '') {
            alert('몸무게를 입력해주세요.');
            return;
        }
        
        if(addr.address == undefined || addr.address == '') {
            alert('주소를 입력해주세요');
            return;
        }


        // detailAddr(상세주소)가 입력이 되지 않았을 경우(undefined 또는 '' 빈 값일 때) => '(우편번호) 기본 주소' 형식으로 DB에 저장
        // 입력이 되었을 경우 => '(우편번호) 기본 주소 / 상세 주소' 형식으로 저장 
        let addrResult = 
            (addr.detailAddr === undefined) 
            ? ('(' + addr.zonecode+ ') ' + addr.address) : (addr.detailAddr.trim() === '') 
            ? ('(' + addr.zonecode+ ') ' + addr.address) : ('(' + addr.zonecode+ ') ' + addr.address + ' / ' + addr.detailAddr);

        // 주민등록번호 'xxxxxx-xxxxxxx' 형식으로 합치기
        let rrnResult = rrn.rrn1 + '-' + rrn.rrn2;

        // 연락처 'xxx-xxxx-xxxx' 형식으로 합치기
        let phoneResult = phone.phone1 + '-' + phone.phone2+ '-' + phone.phone3;
        if (currentPatientNo !== 0){
            setOrder(Object.assign({}, order, 
                {patientVo: 
                    Object.assign({}, patientVo, {rrn: rrnResult, phone: phoneResult, address: addrResult})
                }
            ));
        } else {
            setUpdateInfo(Object.assign({}, updateInfo,{rrn: rrnResult, phone: phoneResult, address: addrResult}));
        }
        setFormSuccess(true);
    }

    useEffect(() => {
        if(formSuccess && (currentPatientNo !== 0)){
            updatePatientInfo();
            return;
        }
        if(formSuccess && (currentPatientNo === 0)){
            addPatientInfo();
            return;
        }
    }, [formSuccess]);

    /* 
        수정 버튼을 눌렸을 때 입력폼으로,
        확인/취소 버튼을 눌렸을 경우 text로 변경
     */
    const changeEditForm = (e) => {
        if((!chooseButton) && (currentPatientNo !== 0)){
            setChooseButton(true);
            setUpdateInfo(patientInfo);
            setFormSuccess(false);
            return;
        }

        setChooseButton(false);
    }

    /* 환자 추가 이벤트 */
    const addPatientInfo = async (e) => {
        try {
            const response = await fetch('/api/nurse/addPatient', {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(updateInfo)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            setPatientInfo(updateInfo);
            setUpdatePatient(updateInfo);
            changeEditForm();
        } catch (err) {
            console.error(err);
        }
    }

    /* 환자 업데이트 이벤트 */
    const updatePatientInfo = async (e) => {
        
        try {
            const response = await fetch('/api/nurse/updatePatientInfo', {
                method: 'put',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(updateInfo)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            setPatientInfo(updateInfo);
            setUpdatePatient(updateInfo);
            changeEditForm();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <div className={InfoStyles.patientInfo}>
                <h3>환자 정보</h3>
                {
                    !chooseButton ? 
                        <Fragment>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>이름</td>
                                        <td>{patientInfo.name}</td>
                                        <td>성별</td>
                                        <td>{patientInfo.gender == null ? '' : patientInfo.gender === 'M' ? '남' : '여'}</td>
                                    </tr>
                                    <tr>
                                        <td>주민등록번호</td>
                                        <td colSpan='3'>{patientInfo.rrn}</td>
                                    </tr>
                                    <tr>
                                        <td>연락처</td>
                                        <td colSpan='3'>{patientInfo.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>키</td>
                                        <td>{patientInfo.length == null ? '' : `${patientInfo.length}cm`}</td>
                                        <td>몸무게</td>
                                        <td>{patientInfo.weight == null ? '' : `${patientInfo.weight}kg`}</td>
                                    </tr>
                                    <tr>
                                        <td>주소</td>
                                        <td colSpan='3'>{patientInfo.address}</td>
                                    </tr>
                                    <tr>
                                        <td>보험여부</td>
                                        <td colSpan='3'>{patientInfo.insuarance == null ? '' : patientInfo.insuarance === 'Y' ? '가입' : '미가입'}</td>
                                    </tr>
                                    <tr>
                                        <td>비고</td>
                                        <td colSpan='3'>{patientInfo.desc}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {
                                currentPatientNo !== 0
                                ?   
                                <div className={InfoStyles.btnBox}>
                                    <button onClick={changeEditForm}>수정</button>
                                    <button onClick={cleanForm}>닫기</button>
                                </div>
                                : null
                            }
                        </Fragment> :
                        <Fragment>
                            <div className={InfoStyles.OrderForm}>
                                <div>
                                    <label>이름</label>
                                    <input 
                                        type='text' 
                                        className={InfoStyles.name}
                                        value={updateInfo.name || ''}
                                        onChange={(e) => setUpdateInfo(Object.assign({}, updateInfo, {name: e.target.value}))}/>
                                </div>
                                <div>
                                    <label>성별</label>

                                    <input 
                                        type='radio' 
                                        name='gender' 
                                        value={'M'}
                                        checked={updateInfo.gender === 'M' || patientInfo.gender == null}
                                        onChange={(e) => setUpdateInfo(Object.assign({}, updateInfo, {gender: e.target.value}))}/> <label>남</label>
                                    <input 
                                        type='radio' 
                                        name='gender' 
                                        value={'F'}
                                        checked={updateInfo.gender === 'F'}
                                        onChange={(e) => setUpdateInfo(Object.assign({}, updateInfo, {gender: e.target.value}))}/><label>여</label>
                                </div>
                                <div>
                                    <label>주민등록번호</label>
                                    <input 
                                        type='text' 
                                        className={InfoStyles.rrn}
                                        value={rrn.rrn1 || ''}
                                        onChange={(e) => setRrn(Object.assign({}, rrn, {rrn1: e.target.value}))}/>
                                            -
                                    <input 
                                        type='text' 
                                        className={InfoStyles.rrn}
                                        value={rrn.rrn2 || ''}
                                        onChange={(e) => setRrn(Object.assign({}, rrn, {rrn2: e.target.value}))}/>
                                </div>
                                <div>
                                    <label>연락처</label>
                                    <select 
                                        className={InfoStyles.phone1}
                                        value={phone.phone1} 
                                        onChange={(e) => setPhone(Object.assign({}, phone, {phone1: e.target.value}))}>
                                        <option value="010">010</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>
                                    -
                                    <input 
                                        type='text' 
                                        className={InfoStyles.phone}
                                        value={phone.phone2 || ''}
                                        onChange={(e) => setPhone(Object.assign({}, phone, {phone2: e.target.value}))}/>
                                    -
                                    <input 
                                        type='text' 
                                        className={InfoStyles.phone}
                                        value={phone.phone3 || ''}
                                        onChange={(e) => setPhone(Object.assign({}, phone, {phone3: e.target.value}))}/>
                                </div>
                                <div>
                                    <label>키</label>
                                    <input 
                                            type='text' 
                                            className={InfoStyles.length}
                                            value={updateInfo.length || ''}
                                            onChange={(e) => setUpdateInfo(Object.assign({}, updateInfo, {length: e.target.value}))}/> cm
                                    <label>몸무게</label>
                                    <input 
                                        type='text' 
                                        className={InfoStyles.weight}
                                        value={updateInfo.weight || ''}
                                        onChange={(e) => setUpdateInfo(Object.assign({}, updateInfo, {weight: e.target.value}))}/> kg
                                </div>
                                <div className={postcodeStyles.addr}>
                                    <label>주소</label>
                                    <input
                                        className={postcodeStyles.Zonecode}
                                        type='text'
                                        placeholder='우편번호'
                                        value={addr.zonecode || ''}
                                        onClick={loadLayout}
                                        onChange={ (e) =>  setAddr(Object.assign({}, addr, {zonecode: e.target.value})) }
                                        />
                                    <button id='AddrBtn' className={postcodeStyles.AddrBtn} onClick={loadLayout}>주소찾기</button>
                                    <input
                                        className={postcodeStyles.Address}
                                        type='text'
                                        placeholder='주소'
                                        value={addr.address || ''}
                                        onClick={loadLayout}
                                        onChange={ (e) =>  setAddr(Object.assign({}, addr, {address: e.target.value})) }
                                        />
                                    <div className='postcodeApi' ref={postcodeRef}></div> 

                                    <input
                                        className={postcodeStyles.DetailAddr}
                                        type='text'
                                        placeholder='상세주소'
                                        value={addr.detailAddr || ''}
                                        onChange={ (e) => setAddr(Object.assign({}, addr, {detailAddr: e.target.value})) }
                                        />
                                </div>
                                <div>
                                    <label>보험여부</label>
                                        <input 
                                            type='radio' 
                                            name='insuarance' 
                                            value={'Y'}
                                            checked={updateInfo.insuarance === 'Y'}
                                            onChange={(e) =>  setUpdateInfo(Object.assign({}, updateInfo, {insuarance: e.target.value}))}/>가입
                                        <input 
                                            type='radio' 
                                            name='insuarance' 
                                            value={'N'}
                                            checked={updateInfo.insuarance === 'N' || patientInfo.insuarance == null}
                                            onChange={(e) => setUpdateInfo(Object.assign({}, updateInfo, {insuarance: e.target.value}))}/>미가입
                                </div>
                                <div>
                                    <label>비고</label>
                                        <textarea 
                                            className={InfoStyles.desc}
                                            value={updateInfo.desc || ''}
                                            onChange={(e) => setUpdateInfo(Object.assign({}, updateInfo, {desc: e.target.value}))}>
                                        </textarea>
                                </div>
                            </div>
                            <div className={InfoStyles.btnBox}>
                                <button onClick={changeEditForm}>취소</button>
                                <button onClick={formCheck}>완료</button>
                            </div>
                        </Fragment>
                }
                
            </div>

            <div className={InfoStyles.diagnosisList}>
                <h3>진료 이력</h3>
                <table>
                    <thead>
                    <tr>
                        <th>내원일</th>
                        <th>담당의</th>
                        <th>질병</th>
                        <th>처방</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        diagnosisList
                            .map(diagnosis => { 
                                return (
                                    <tr 
                                        className='diagnosis'
                                        key={diagnosis.no}>
                                        <td>{diagnosis.date}</td>
                                        <td>{diagnosis.name}</td>
                                        <td>
                                            {
                                                diagnosis.presDiseaseList   // 질병 리스트 출력
                                                    .map(presDisease => {return `${presDisease.name}, `})
                                            }
                                        </td>
                                        <td>
                                            {
                                                diagnosis.presMedicineList  // 처방 약품 리스트 출력
                                                    .map(presMedicine => {return `${presMedicine.name}, `})
                                            }
                                            {
                                                diagnosis.presClinicList    // 처방 약품외 리스트 출력
                                                    .map(presClinic => {return `${presClinic.name}, `})
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                    }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default PatientInfo;