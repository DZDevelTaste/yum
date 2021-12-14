import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <form id="join" name="join" method="post" action="${pageContext.request.contextPath}">
                <label>이메일<input type="text" name="email" placeholder='ID'/></label>
                <label>비밀번호<input type="text" name="password" placeholder='PASSWORD'/></label>
                <input type="submit" value="로그인" />
                <ul>
                    <li><NavLink to={'/join'}>회원가입</NavLink></li>
                    <li><NavLink to={'/searchId'}>아이디 찾기</NavLink></li>
                    <li><NavLink to={'/searchPw'}>비밀번호 찾기</NavLink></li>
                    <li><NavLink to={'/admin'}>관리자</NavLink></li>
                    <li><NavLink to={'/admin/disease'}>관리자(병)</NavLink></li>
                    <li><NavLink to={'/admin/medicine'}>관리자(약품)</NavLink></li>
                    <li><NavLink to={'/Schedule'}>스케쥴 관리</NavLink></li>
                </ul>
		    </form>
        </div>
    );
};

export default Main;