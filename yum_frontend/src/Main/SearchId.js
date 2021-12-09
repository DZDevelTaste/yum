import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
const SearchId = () => {
    const [name, setName] = useState('');
    const [rrn, setRrn] = useState('');
    const [rrn1, setRrn1] = useState('');
    const nameChange = (e) => {
        setName(e.target.value);
    }
    const rrnChange = (e) => {
        setRrn(e.target.value);
    }
    const rrn1Change = (e) => {
        setRrn1(e.target.value);
    }
    let user = {
        name: name,
        rrn: rrn,
        rrn1: rrn1
    }
    const login1 = (e) => {
        e.preventDefault();
        var name = document.getElementById('name').value;
        var rrn = document.getElementById('rrn').value;
       
         if(name === ''){
            alert('이름를 입력해주세요');
            return false;
        }  if(rrn === ''){
            alert('주민등록번호를 입력해주세요');
            return false;
        }
        fetchJoin();
        return true;
    };
    
    const fetchJoin = async() => {
        try {
            const response = await fetch(`http://localhost:8080/api/successId`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(user)
            });
            
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            
            if(json.data === null) {
                alert("잘못된 정보입니다.");
                document.getElementById('name').value='';
                document.getElementById('rrn').value='';
                document.getElementById('rrn1').value='';
                return false;
            }

            location.href= '/successId';

        } catch (error) {
            console.error(error);
        }
    }
    // 주민등록번호 유효성
    const rrn_check = () => {
        var rrn = document.getElementById('rrn').value;
        var rrn1 = document.getElementById('rrn1').value;
        
        var re = /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])/;
        var re1 = /[1-4][0-9]{6}$/;
        
        if(!re.test(rrn)) {
            alert('올바른 주민등록번호 형식이 아닙니다.');
            document.getElementById('rrn').value='';
            document.getElementById('rrn1').value='';
            document.getElementById('rrn').focus();
            return;
        }
        if(!re1.test(rrn1)) {
            alert('올바른 주민등록번호 형식이 아닙니다.');
            document.getElementById('rrn').value='';
            document.getElementById('rrn1').value='';
            document.getElementById('rrn1').focus();
            return;
        }
    };
    return (
        <div>
            <h1>아이디 찾기</h1>
                
                <form method="post" onSubmit={login1} >
                    <label>이름</label>
                    <input type="text" name="name" id="name" placeholder="이름" onChange={nameChange}/>
                    <label>주민등록번호</label>
                    <input type="text" name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6' onChange={rrnChange}/>
                    <label>-</label>
                    <input type="password" name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check} onChange={rrn1Change}/>
                    <input type="submit" value="아이디 찾기"/>
                </form>
                <li><NavLink to={'/'}>로그인</NavLink></li>
                <li><NavLink to={'/join'}>회원가입</NavLink></li>
                <li><NavLink to={'/searchPw'}>비밀번호 찾기</NavLink></li>
        </div>
    );
};

export default SearchId;
