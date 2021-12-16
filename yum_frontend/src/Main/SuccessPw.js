import React, {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import style from '../assets/scss/main/successPw.scss';

const SuccessPw = () => {
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');
    const current = decodeURI(window.location.href);
    const search = current.split("/")[4];
    var no = parseInt(search);
    
    let user = {
        no: no,
        password: password
    }
    const login1 = (e) => {
        e.preventDefault();
        var pw = document.getElementById('pw').value;
        
          if(pw === ''){
            alert('비밀번호를 입력해주세요');
            return false;
        }
        alert("정상적으로 비밀번호가 재설정되었습니다.");
        fetchJoin();
    };
    useEffect(() => {
        fetchPW(no);
    }, [no]); 
    const fetchPW = async() => {
        try {
            const response = await fetch(`http://localhost:8080/api/successId/${no}`, {
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
            
            setUsers(json.data);

        } catch (error) {
            console.error(error);
        }
    }
    const fetchJoin = async() => {
        try {
            const response = await fetch(`http://localhost:8080/api/updatePw`, {
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
            
            location.href= '/';
        } catch (error) {
            console.error(error);
        }
    }
     //비밀번호 유효성 검사
     const checkPassword = (e) => {
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

        if(!regExp.test(e.target.value)) {
            alert("잘못된 비밀번호 형식입니다.");
            return false;
        }
        if(document.getElementById('pw').value !='' && document.getElementById('pw2').value!=''){
            if(document.getElementById('pw').value==document.getElementById('pw2').value){
                document.getElementById('check').innerHTML='비밀번호가 일치합니다.'
                document.getElementById('check').style.color='blue';
            }
            else{
                document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다.';
                document.getElementById('check').style.color='red';
            }
        }
    };

    return (
        <div>
            <div className={style.header}>비밀번호 재설정</div>
            <form method="post" onSubmit={login1} >
                <label className={style.name}>{users.name}님 {users.email}</label>
                <div className={style.password}>
                    <label>비밀번호</label>
                    <input type="password" name="password" id="pw" placeholder="PASSWORD" onBlur={checkPassword} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={style.check}>
                    <label>비밀번호 확인</label>
                    <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkPassword}/>
                    <span id="check" />
                    <input type="submit" value="비밀번호 변경" />
                </div>
		    </form>
            <ul>
                <ui className={style.login}><NavLink to={'/'}>로그인</NavLink></ui>
            </ul>
        </div>
    );
};

export default SuccessPw;