import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../assets/scss/layout/Navigation.scss';

const navigation = () => {
<<<<<<< HEAD
    return (
=======
    const job = sessionStorage.getItem("job");
    return (
        <div>
        { job == 'N' ?
>>>>>>> origin/master
        <nav className={styles.Main}>
            <NavLink to={'/nurse'} end>메인</NavLink>
            <NavLink to={'/nurse/patients'}>환자리스트</NavLink>
            <NavLink to={'/nurse/order'}>접수</NavLink>
            <NavLink to={'/nurse/reservation'}>예약관리</NavLink>
            <NavLink to={'/schedule'}>스케쥴러</NavLink>
        </nav>
<<<<<<< HEAD
=======
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
>>>>>>> origin/master
    );
};

export default navigation;