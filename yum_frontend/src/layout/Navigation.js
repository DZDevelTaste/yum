import React from 'react';
import { NavLink } from 'react-router-dom';

const navigation = () => {
    return (
        <nav>
            <NavLink to={'/nurse'}>메인</NavLink>
            <NavLink to={'/nurse/patients'}>환자리스트</NavLink>
            <NavLink to={'/nurse/order'}>접수</NavLink>
            <NavLink to={'/nurse/reservation'}>예약관리</NavLink>
            <NavLink to={'/schedule'}>스케쥴러</NavLink>
        </nav>
    );
};

export default navigation;