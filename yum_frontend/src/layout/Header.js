import React from 'react';
import { NavLink } from 'react-router-dom';
import SemiLogo from '../../public/header.png';
import style from '../assets/scss/layout/Header.scss';

const Header = () => {
    const name = sessionStorage.getItem("name");
    let job = sessionStorage.getItem("job");
    if (job == 'N' ? job = "간호사" : job== 'D' ? job = "의사" : job = "관리자");

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
        <div className={style.Header}>
            { 
                job == '간호사' ?
                <a href='/nurse'><img className={style.image1}src={SemiLogo}/></a> : job == '의사' ?
                <a href='/doctor'><img className={style.image1}src={SemiLogo}/></a> :
                <a href='/admin'><img className={style.image1}src={SemiLogo}/></a>
            }
            <ul className={style.user}>
                <li className={style.state}>{`${name} ${job}님`}</li>
                <li className={style.update}><NavLink to={'/update'}>회원정보수정</NavLink></li>
                <li className={style.logout} onClick={LogoutUser}>로그아웃</li>
            </ul>
        </div>
    );
};

export default Header;