import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import style from '../assets/scss/main/searchId.scss'
import Logo from '../../public/favicon.ico'
import SemiLogo from '../../public/title.png'

const SearchId = () => {
    const [name, setName] = useState('');
    const [rrn, setRrn] = useState('');
    const [rrn1, setRrn1] = useState('');

    let user = {
        name: name,
        rrn: rrn + "-"+ rrn1,
    }
    const login1 = (e) => {
        e.preventDefault();
        fetchJoin();
    };
    
    const fetchJoin = async() => {
        try {
            const response = await fetch('/api/successId', {
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
            
            if(json.data === null) {
                alert("잘못된 정보입니다.");
                document.getElementById('name').value='';
                document.getElementById('rrn').value='';
                document.getElementById('rrn1').value='';
                return false;
            }
            let no = json.data.no;
            
            location.href= '/successId/' + no;

        } catch (error) {
            console.error(error);
        }
    }
    
    // 주민등록번호 유효성
    const rrn_check = () => {
        var rrn = document.getElementById('rrn').value;
        var rrn1 = document.getElementById('rrn1').value;
        
        var re = /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])/;
        var re1 = /[1-4][0-9]{6}$/;
        
        if(!re.test(rrn)) {
            alert('올바른 주민등록번호 형식이 아닙니다.');
            document.getElementById('rrn').value='';
            document.getElementById('rrn1').value='';
            document.getElementById('rrn').focus();
            return;
        }
        if(!re1.test(rrn1)) {
            alert('올바른 주민등록번호 형식이 아닙니다.');
            document.getElementById('rrn').value='';
            document.getElementById('rrn1').value='';
            document.getElementById('rrn').focus();
            return;
        }
    };
    return (
        <div>
            <img className={style.image}src={Logo}/>
            <img className={style.image1}src={SemiLogo}/>
            <div className={style.header}>아이디 찾기</div>
                <form method="post" onSubmit={login1} >
                <div className={style.name}>
                    <label>이름</label>
                    <input type="text" name="name" id="name" placeholder="이름" onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className={style.rrn}>
                    <label>주민등록번호</label>
                    <input type="text" name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6' onChange={(e) => setRrn(e.target.value)} required/>
                    <span>-</span>
                    <input type="password" name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check} onChange={(e) => setRrn1(e.target.value)} required/>
                    <input type="submit" value="아이디 찾기"/>
                </div>
                </form>
                <ui className={style.login}><NavLink to={'/'}>로그인</NavLink></ui>
                <ui className={style.searchPw}><NavLink to={'/searchPw'}>비밀번호 찾기</NavLink></ui>
        </div>
    );
};

export default SearchId;
