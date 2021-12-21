import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../assets/scss/layout/Navigation.scss';

const navigation = () => {
    const job = sessionStorage.getItem("job");
    return (
        <div className={styles.LeftSide}>
        { job == 'N' ?
        <nav className={styles.Main}>
            <NavLink to={'/nurse'} end>메인</NavLink>
            <NavLink to={'/nurse/patients'}>환자리스트</NavLink>
            <NavLink to={'/nurse/order'}>접수</NavLink>
            <NavLink to={'/nurse/reservation'}>예약관리</NavLink>
            <NavLink to={'/schedule'}>스케쥴러</NavLink>
        </nav>
        : job == 'D' ? 
        <nav className={styles.Main}>
            <NavLink to={'/doctor'} end>메인</NavLink>
            <NavLink to={'/schedule'}>스케쥴러</NavLink>
        </nav> : 
        <nav className={styles.Main}>
        <NavLink to={'/admin'} end>사용자 관리</NavLink>
        <NavLink to={'/admin/disease'}>질병 리스트 관리</NavLink>
        <NavLink to={'/admin/medicine'}>의약품 리스트 관리</NavLink>
        <NavLink to={'/schedule'}>스케쥴러</NavLink>
        </nav>
        }
        </div>
    );
};

export default navigation;