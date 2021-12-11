import React, { useEffect, useState } from 'react';

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

    const codeChange = (e) => {
        setCode(e.target.value);
    }
    const nameChange = (e) => {
        setName(e.target.value);
    }
    const companyChange = (e) => {
        setCompany(e.target.value);
    }
    const ingredientChange = (e) => {
        setIngredient(e.target.value);
    }
    const efficacyChange = (e) => {
        setEfficacy(e.target.value);
    }
    const precautionChange = (e) => {
        setPrecaution(e.target.value);
    }
    const cautionChange = (e) => {
        setCaution(e.target.value);
    }
    const sideEffectChange = (e) => {
        setSideEffect(e.target.value);
    }

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
            const response = await fetch(`http://localhost:8080/api/admin/medicine/medicineInfo/${No}`, {
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
    const addMedicine = (e) => {
        e.preventDefault();
        alert("의약품이 등록되었습니다.");
        fetchadd();
    }
    const fetchupdate = async() => {

        try {
            const response = await fetch('http://localhost:8080/api/admin/medicine/update', {
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
    const fetchadd = async() => {

        try {
            const response = await fetch('http://localhost:8080/api/admin/medicine/add', {
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
        <div>
            의약품 정보
            { medicineVo ?
                <form method='post' onSubmit={updateMedicine} >
                    <label>의약품 코드</label>
                    <input type="text" onChange={codeChange} value={code}/>
                    <label>의약품 명</label>
                    <input type="text" onChange={nameChange} value={name}/>
                    <label>제조사</label>
                    <input type="text" onChange={companyChange} value={company}/>
                    <label>성분</label>
                    <input type="text" onChange={ingredientChange} value={ingredient}/>
                    <label>상세 설명
                        <label>① 효능</label>
                        <input type="text" onChange={efficacyChange} value={efficacy}/>
                        <label>② 복용 전 주의사항</label>
                        <input type="text" onChange={precautionChange} value={precaution}/>
                        <label>③ 복용 시 주의사항</label>
                        <input type="text" onChange={cautionChange} value={caution}/>
                        <label>④ 부작용</label>
                        <input type="text" onChange={sideEffectChange} value={sideEffect}/>
                    </label>
                    <input type="submit" value="수정" />
                </form> : 
                <form method='post' onSubmit={addMedicine} >
                <label>의약품 코드</label>
                <input type="text" onChange={codeChange} />
                <label>의약품 명</label>
                <input type="text" onChange={nameChange} />
                <label>제조사</label>
                <input type="text" onChange={companyChange} />
                <label>성분</label>
                <input type="text" onChange={ingredientChange} />
                <label>상세 설명
                    <label>① 효능</label>
                    <input type="text" onChange={efficacyChange} />
                    <label>② 복용 전 주의사항</label>
                    <input type="text" onChange={precautionChange} />
                    <label>③ 복용 시 주의사항</label>
                    <input type="text" onChange={cautionChange} />
                    <label>④ 부작용</label>
                    <input type="text" onChange={sideEffectChange} />
                </label>
                <input type="submit" value="등록" />
            </form>
            } 
        </div>
    );
};

export default MedicineInfo;