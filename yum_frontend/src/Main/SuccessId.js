import React, { useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';
import style from '../assets/scss/main/successId.scss';
const SuccessId = () => {
    const [users, setUsers] = useState([]);
    const current = decodeURI(window.location.href);
    const search = current.split("/")[4];
    var no = parseInt(search);
    

    useEffect(() => {
        fetchID(no);
    }, [no]); 

    const fetchID = async() => {
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
    return (
        <div>
            <div className={style.header}>아이디 찾기 완료</div>
		    <div className={style.bodyy}>{`${users.name}님의 아이디는 ${users.email}입니다.`}</div>
            <ul>
                <li className={style.login}><NavLink to={'/'}>로그인</NavLink></li>
                <li className={style.searchPw}><NavLink to={'/searchPw'}>비밀번호 찾기</NavLink></li>
            </ul>
        </div>
    );
};

export default SuccessId;