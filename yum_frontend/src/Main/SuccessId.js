import React, { useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
const SuccessId = () => {
    const name = json.data.name;
    const email = json.data.email;

    return (
        <div>
            <h1>아이디 찾기 완료</h1>
		    <label>{`${name}님의 아이디는 ${email}입니다.`}</label>

            <li><NavLink to={'/'}>로그인</NavLink></li>
            <li><NavLink to={'/join'}>회원가입</NavLink></li>
            <li><NavLink to={'/searchPw'}>비밀번호 찾기</NavLink></li>
        </div>
    );
};

export default SuccessId;