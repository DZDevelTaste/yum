import React, { useState } from 'react';

const MedicineInfo = () => {
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

    let medicine = {
        code: code,
        name: name,
        company: company,
        ingredient: ingredient,
        efficacy: efficacy,
        precaution: precaution,
        caution: caution,
        sideEffect: sideEffect
    }

    const addMedicine = (e) => {
        e.preventDefault();
        alert("의약품이 등록되었습니다.");
        fetchadd();
    }

    const fetchadd = async() => {

        try {
            const response = await fetch('http://localhost:8080/api/admin/medicine/add', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(medicine)
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
    return (
        <div>
            <form method='post' onSubmit={addMedicine}>
                <label>의약품 코드</label>
                <input type="text" onChange={codeChange}/>
                <label>의약품 명</label>
                <input type="text" onChange={nameChange}/>
                <label>제조사</label>
                <input type="text" onChange={companyChange}/>
                <label>성분</label>
                <input type="text" onChange={ingredientChange}/>
                <label>상세 설명
                    <label>① 효능</label>
                    <input type="text" onChange={efficacyChange}/>
                    <label>② 복용 전 주의사항</label>
                    <input type="text" onChange={precautionChange}/>
                    <label>③ 복용 시 주의사항</label>
                    <input type="text" onChange={cautionChange}/>
                    <label>④ 부작용</label>
                    <input type="text" onChange={sideEffectChange}/>
                </label>
                <input type="submit" value="등록" />
            </form>
        </div>
    );
};

export default MedicineInfo;