import React, { useEffect, useState } from 'react';
import style from '../../assets/scss/medicine/MedicineInfo.scss';
const MedicineInfo = ({no}) => {
    const [medicineVo, setMedicineVo] = useState([]);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [efficacy, setEfficacy] = useState('');
    const [precaution, setPrecaution] = useState('');
    const [caution, setCaution] = useState('');
    const [sideEffect, setSideEffect] = useState('');


    useEffect(() => {
        setCode(medicineVo ? medicineVo.code : '')
        setName(medicineVo ? medicineVo.name : '')
        setCompany(medicineVo ? medicineVo.company : '')
        setIngredient(medicineVo ? medicineVo.ingredient : '')
        setEfficacy(medicineVo ? medicineVo.efficacy : '')
        setPrecaution(medicineVo ? medicineVo.precaution : '')
        setCaution(medicineVo ? medicineVo.caution : '')
        setSideEffect(medicineVo ? medicineVo.sideEffect : '')
    }, [medicineVo])

    let medicine1 = {
        code: code,
        name: name,
        company: company,
        ingredient: ingredient,
        efficacy: efficacy,
        precaution: precaution,
        caution: caution,
        sideEffect: sideEffect
    }
    let medicine2 = {
        no: no,
        code: code,
        name: name,
        company: company,
        ingredient: ingredient,
        efficacy: efficacy,
        precaution: precaution,
        caution: caution,
        sideEffect: sideEffect
    }

    useEffect(() => {
        fetchInfo(no);
    }, [no]); 

    const fetchInfo = async(No) => {
        try {
            const response = await fetch(`/api/admin/medicine/medicineInfo/${No}`, {
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

            if(json.result !== 'success') {
                throw json.message;
            }
            
            setMedicineVo(json.data);

        } catch (error) {
            console.error(error);
        }
    }
    const updateMedicine = (e) => {
        e.preventDefault();
        alert("의약품 정보가 수정되었습니다");
        fetchupdate();
    } 
    
    const fetchupdate = async() => {

        try {
            const response = await fetch('/api/admin/medicine/update', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(medicine2)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            console.log(json.data)
            location.href= '/admin/medicine'            

        } catch (error) {
            console.error(error);
        }
    }

    const addMedicine = (e) => {
        e.preventDefault();
        alert("의약품이 등록되었습니다.");
        fetchadd();
    }

    const fetchadd = async() => {

        try {
            const response = await fetch('/api/admin/medicine/add', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(medicine1)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            console.log(json.data);
            location.href= '/admin/medicine';            

        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className={style.wangbody}>
            <span className={style.title}>의약품 정보</span>
            { medicineVo ?
            <div className={style.smallbody}>
                <div className={style.small}>
                <form method='post' onSubmit={updateMedicine} >
                    <div className={style.code}>
                        <span >의약품 코드 :</span>
                        <input type="text" onChange={(e) => setCode(e.target.value)} value={code}/>
                    </div>
                    <div className={style.name}>
                        <span >의약품 명 :</span>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                    </div>
                    <div className={style.company}>
                        <span>제조사 :</span>
                        <input type="text" onChange={(e) => setCompany(e.target.value)} value={company}/>
                    </div>
                    <div className={style.ingredient}>
                        <span>성분 :</span>
                        <input type="text" onChange={(e) => setIngredient(e.target.value)} value={ingredient}/>
                    </div>
                    <div className={style.sangse}>
                        <span>상세 설명</span>
                        <div className={style.efficacy}>
                            <span>① 효능 :</span>
                            <input type="text" onChange={(e) => setEfficacy(e.target.value)} value={efficacy}/>
                        </div>
                        <div className={style.precaution}>
                            <span>② 복용 전 주의사항 :</span>
                            <input type="text" onChange={(e) => setPrecaution(e.target.value)} value={precaution}/>
                        </div>
                        <div className={style.caution}>
                        <span>③ 복용 시 주의사항 :</span>
                        <input type="text" onChange={(e) => setCaution(e.target.value)} value={caution}/>
                        </div>
                        <div className={style.sideEffect}>
                        <span>④ 부작용 :</span>
                        <input type="text" onChange={(e) => setSideEffect(e.target.value)} value={sideEffect}/>
                        </div>
                    </div>
                        <input type="submit" className={style.submit}value="수정" />
                    </form>
                </div>
            </div> 
                : 
            <div className={style.smallbody}>
                <div className={style.small}>
                <form method='post' onSubmit={addMedicine} >
                    <div className={style.code}>
                        <span>의약품 코드 :</span>
                        <input type="text" onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <div className={style.name}>
                        <span>의약품 명 :</span>
                        <input type="text" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={style.company}>
                        <span>제조사 :</span>
                        <input type="text" onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div className={style.ingredient}>
                    <span>성분 :</span>
                    <input type="text" onChange={(e) => setIngredient(e.target.value)} />
                    </div>
                    <div className={style.sangse}>
                        <span>상세 설명</span>
                        <div className={style.efficacy}>
                            <span>① 효능 :</span>
                            <input type="text" onChange={(e) => setEfficacy(e.target.value)} />
                        </div>
                        <div className={style.precaution}>
                            <span>② 복용 전 주의사항 :</span>
                            <input type="text" onChange={(e) => setPrecaution(e.target.value)} />
                        </div>
                        <div className={style.caution}>
                            <span>③ 복용 시 주의사항 :</span>
                            <input type="text" onChange={(e) => setCaution(e.target.value)} />
                        </div>
                        <div className={style.sideEffect}>
                            <span>④ 부작용 :</span>
                            <input type="text" onChange={(e) => setSideEffect(e.target.value)} />
                        </div>
                    </div>
                    <input type="submit" className={style.add} value="등록"/>
                </form>
                </div>
            </div>
            } 
        </div>
    );
};

export default MedicineInfo;