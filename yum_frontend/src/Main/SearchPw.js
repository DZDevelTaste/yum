import React, { useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
import style from '../assets/scss/main/searchPw.scss'
import Logo from '../../public/favicon.ico'
import SemiLogo from '../../public/title.png'

// 이메일 유효성 검사

const SearchPw = () => {
    const [name, setName] = useState('');
    const [rrn, setRrn] = useState('');
    const [rrn1, setRrn1] = useState('');
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');

    let user = {
        email: email +"@"+ email1,
        name: name,
        rrn: rrn + "-" + rrn1,
    }
    const login1 = (e) => {
        e.preventDefault();
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
                document.getElementById('id2').value='1';
                document.getElementById('name').value='';
                document.getElementById('rrn').value='';
                document.getElementById('rrn1').value='';
                return false;
            }

            let no = json.data.no;

            location.href = 'successPw/' + no;
            
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
        } else {
            document.getElementById('id1').disabled = true;
            document.getElementById('id1').value=email2;
            setEmail1(email2);
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
            <img className={style.image}src={Logo}/>
            <img className={style.image1}src={SemiLogo}/>
            <div className={style.header}>
                비밀번호 찾기
            </div>
            <form method="post" onSubmit={login1} >
                <div className={style.name}>
                    <label>이름</label>
                    <input type="text" name="name" id="name" placeholder="이름" onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className={style.email}>
                    <label>이메일</label>
                    <input type="text" className={style.email1} name ="email" id="id" placeholder="ID" onBlur={checkEmail} onChange={(e) => setEmail(e.target.value)} required/>
                    <span>@</span>
                    <input type="text" className={style.email2} id="id1" name="email1" onChange={(e) => setEmail1(e.target.value)} required/>
                    <select id="id2" name="email1" defaultValue="1" onChange={email_check}>
                            <option value="1">직접입력</option>
                            <option value="naver.com">naver.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                    </select>
                </div>
                <div className={style.rrn}>
                    <label>주민등록번호</label>
                    <input type="text" className={style.rrn1} name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6' onChange={(e) => setRrn(e.target.value)} required/>
                    <span>-</span>
                    <input type="password" className={style.rrn2} name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check} onChange={(e) => setRrn1(e.target.value)} required/>
                    <input type="submit" value="비밀번호 찾기"/>
                </div>
            </form>      
            <ui className={style.login}><NavLink to={'/'}>로그인</NavLink></ui>
        </div>
    );
};

export default SearchPw;