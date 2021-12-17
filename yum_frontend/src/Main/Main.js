import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import style from '../assets/scss/main/main.scss';
import Logo from '../../public/favicon.ico'
import SemiLogo from '../../public/title.png'
const Main = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let InfomationUser = {
        email : email,
        password : password
    }

    const LoginSuccess = async(e) => {
        e.preventDefault();
        sessionStorage.clear();
        try {
            const response = await fetch('http://localhost:8080/api/user/auth', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(InfomationUser)
            });
            console.log(response);
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            if(json.data == null) {
                alert('ID 혹은 PASSWORD가 틀렸습니다.');
                return false;
            }
            if(json.data.auth == 'N') {
                alert('승인되지 않은 사용자입니다.');
                return false;
            }
            // authUser로 가져온 값을 sessionStorage에 setItem으로 담아놓으면 어느 컴포넌트에서든 getItem으로 꺼내어 사용할 수 있다.
            sessionStorage.setItem("no", json.data.no);
            sessionStorage.setItem("name", json.data.name);
            sessionStorage.setItem("job", json.data.job);

            if(json.data.job == 'N') {
                
                location.href = '/nurse'
            } else if(json.data.job == 'D') {
                
                location.href = '/doctor'
            } else if(json.data.job == 'A'){
              
                location.href = '/admin'
            }

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={style.main}>
            <img className={style.image}src={Logo}/>
            <img className={style.image1}src={SemiLogo}/>
            <form method="post" onSubmit={LoginSuccess}>
                <input type="text" className={style.id} name ="email" id="id" placeholder="ID" onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" className={style.pw} id="pw" name="password" placeholder='PASSWORD' onChange={(e) => setPassword(e.target.value)} required/> 
                <input type="submit" id="submit" className={style.login} value="로그인"/>
            </form>
                <ul>
                    <ui className={style.join}><NavLink to={'/join'}>회원가입</NavLink></ui>
                    <ui className={style.searchId}><NavLink to={'/searchId'}>아이디 찾기</NavLink></ui>
                    <ui className={style.searchPw}><NavLink to={'/searchPw'}>비밀번호 찾기</NavLink></ui>
                </ul>
        </div>
    );
};

export default Main;