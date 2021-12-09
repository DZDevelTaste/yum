import React, { useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
// 이메일 유효성 검사

const SearchPw = () => {
    const [name, setName] = useState('');
    const [rrn, setRrn] = useState('');
    const [rrn1, setRrn1] = useState('');
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');

    const emailChange = (e) => {
        setEmail(e.target.value);
    }
    const email1Change = (e) => {
        setEmail1(e.target.value);
    }
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
        email: email,
        email1: email1,
        name: name,
        rrn: rrn,
        rrn1: rrn1
    }
    const login1 = (e) => {
        e.preventDefault();
        var name = document.getElementById('name').value;
        var rrn = document.getElementById('rrn').value;
        var email = document.getElementById('id').value;
       
         if(name === ''){
            alert('이름를 입력해주세요');
            return false;
        }  if(rrn === ''){
            alert('주민등록번호를 입력해주세요');
            return false;
        }
        if(email === ''){
            alert('아이디를 입력해주세요');
            return false;
        }
        fetchJoin();
        
    };
    const fetchJoin = async() => {
        try {
            const response = await fetch(`http://localhost:8080/api/successPw`, {
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
            
            if(json.data == null) {
                alert("잘못된 정보입니다.");
                document.getElementById('id').value='';
                document.getElementById('id1').value='';
                document.getElementById('name').value='';
                document.getElementById('rrn').value='';
                document.getElementById('rrn1').value='';
                return false;
            }

            alert(`${json.data.name}님의 아이디는 ${json.data.email}입니다.`);
            
        } catch (error) {
            console.error(error);
        }
    }
    // 이메일 유효성 검사
    const checkEmail = (e) => {
        var regExp = /^[a-zA-Z0-9+-\_.]/i;
        
        if(!regExp.test(e.target.value)) {
            alert("잘못된 이메일 형식입니다.");
            document.getElementById('id').focus;
            return false;
            
        }
    };
    // 이메일 select박스 값 집어넣기
    const email_check = () => {
        var email1 = document.getElementById('id1').value;
        var email2 = document.getElementById('id2').value;

        if(email2 == 1) {
            document.getElementById('id1').disabled = false;
            document.getElementById('id1').value='';
            setEmail1(document.getElementById('id1').value);
        } else {
            document.getElementById('id1').disabled = true;
            document.getElementById('id1').value=email2;
            setEmail1(document.getElementById('id1').value);
        }
    };
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
            <h1>비밀번호 찾기</h1>
            <form method="post" onSubmit={login1} >
                    <label>이름</label>
                    <input type="text" name="name" id="name" placeholder="이름" onChange={nameChange}/>
                    <label>아이디</label>
                    <input type="text" name ="email" id="id" placeholder="아이디" onBlur={checkEmail} onChange={emailChange}/>
                    <label>@</label>
                    <input type="text" id="id1" name="email1" onChange={email1Change}/>
                    <label><select id="id2" name="email1" onChange={email_check}>
                            <option value="1">직접입력</option>
                            <option value="naver.com">naver.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                    </select></label>
                    <label>주민등록번호</label>
                    <input type="text" name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6' onChange={rrnChange}/>
                    <label>-</label>
                    <input type="password" name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check} onChange={rrn1Change}/>
                    <input type="submit" value="비밀번호 찾기"/>
            </form>      
            <li><NavLink to={'/'}>로그인</NavLink></li>
            <li><NavLink to={'/join'}>회원가입</NavLink></li>
            <li><NavLink to={'/searchId'}>아이디 찾기</NavLink></li>
        </div>
    );
};

export default SearchPw;