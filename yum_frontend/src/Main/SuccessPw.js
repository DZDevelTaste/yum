import React, {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import style from '../assets/scss/main/successPw.scss';
import Logo from '../../public/favicon.ico'
import SemiLogo from '../../public/title.png'
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
    const checkcheck = () => {
        if(password !='' && document.getElementById('pw2').value!=''){
            if(document.getElementById('pw').value==document.getElementById('pw2').value){
                document.getElementById('check').innerHTML='비밀번호가 일치합니다.'
                document.getElementById('check').style.color='blue';
                return true;
            }
            else{
                document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다.';
                document.getElementById('check').style.color='red';
                document.getElementById('pw2').focus();
                return false;
            }
        }
    }

    return (
        <div>
            <img className={style.image}src={Logo}/>
            <img className={style.image1}src={SemiLogo}/>
            <div className={style.header}>비밀번호 재설정</div>
            <form method="post" onSubmit={login1} >
                <label className={style.name}>{users.name}님 {users.email}</label>
                <div className={style.password}>
                    <div>비밀번호</div>
                        <input type="password" name="password" id="pw" placeholder="PASSWORD" onBlur={(e) => checkPassword(e.target.value)} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className={style.check}>
                    <div>비밀번호 확인</div>
                        <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkcheck} required/>
                        <span id="check" >8~10자의 숫자와 영문을 입력해주세요</span>
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