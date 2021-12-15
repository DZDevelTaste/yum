import React, { useEffect, useState } from 'react';
import {Link, NavLink} from 'react-router-dom';

const Main = () => {
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [password, setPassword] = useState('');

    let InfomationUser = {
        email : email + "@" + email1,
        password : password
    }
    
    console.log(sessionStorage.getItem("no"));
    console.log(sessionStorage.getItem("name"));
    console.log(sessionStorage.getItem("job"));

    // 이메일 유효성 검사
    const checkEmail = (e) => {
        var regExp = /^[a-zA-Z0-9+-\_.]/i;
        
        if(!regExp.test(e.target.value)) {
            alert("잘못된 이메일 형식입니다.");
            document.getElementById('id').focus;
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
    //비밀번호 유효성 검사
    const checkPassword = (e) => {
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

        if(!regExp.test(e.target.value)) {
            alert("잘못된 비밀번호 형식입니다.");
        }
        
    };
   
    const LoginSuccess = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user/auth', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(InfomationUser)
            });
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            
            // authUser로 가져온 값을 sessionStorage에 setItem으로 담아놓으면 어느 컴포넌트에서든 getItem으로 꺼내어 사용할 수 있다.
            sessionStorage.setItem("no", json.data.no);
            sessionStorage.setItem("name", json.data.name);
            sessionStorage.setItem("job", json.data.job);

            console.log(sessionStorage.getItem("no"));
            console.log(sessionStorage.getItem("name"));
            console.log(sessionStorage.getItem("job"));
            if(json.data.job == 'N') {
                
                location.href = '/nurse'
            } else if(json.data.job == 'D') {
                
                location.href = '/doctor'
            } else {
              
                location.href = '/admin'
            }

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <form method="post" onSubmit={LoginSuccess}>
                <label>아이디
                    <input type="text" name ="email" id="id" placeholder="ID" onBlur={checkEmail} onChange={(e) => setEmail(e.target.value)}/>
                    @
                    <input type="text" id="id1" name="email1" onChange={(e) => setEmail1(e.target.value)}/>
                    <select id="id2" name="email1" onChange={email_check}>
                        <option value="1">직접입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="nate.com">nate.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="yahoo.com">yahoo.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                    </select>
                </label>
                <label>비밀번호<input type="password" name="password" placeholder='PASSWORD' onBlur={checkPassword} onChange={(e) => setPassword(e.target.value)}/></label>
                <input type="submit" value="로그인"/>
                
            </form>
                <ul>
                    <li><NavLink to={'/join'}>회원가입</NavLink></li>
                    <li><NavLink to={'/searchId'}>아이디 찾기</NavLink></li>
                    <li><NavLink to={'/searchPw'}>비밀번호 찾기</NavLink></li>
                    <li><NavLink to={'/admin'}>관리자</NavLink></li>
                    <li><NavLink to={'/admin/disease'}>관리자(병)</NavLink></li>
                    <li><NavLink to={'/admin/medicine'}>관리자(약품)</NavLink></li>
                    <li><NavLink to={'/Schedule'}>스케쥴 관리</NavLink></li>
                </ul>
        </div>
    );
};

export default Main;