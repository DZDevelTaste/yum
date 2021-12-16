import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const name = sessionStorage.getItem("name");
    const job = sessionStorage.getItem("no");
    const LogoutUser = async(e) => {
        e.preventDefault();
        try {
            sessionStorage.clear();

            location.href = '/';
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>YUM</h1>
            <div>
            <div>{`${name} ${job}님`}</div>
            <ul>
                <li onClick={LogoutUser}>로그아웃</li>
                <li><NavLink to={'/update'}>회원정보 수정</NavLink></li>
            </ul>
            </div>
        </div>
    );
};

export default Header;