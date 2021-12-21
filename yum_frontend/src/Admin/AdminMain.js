import React, { useState, useEffect } from 'react';
import AdminSearch from './AdminSearch';
import style from '../assets/scss/admin/adminMain.scss'
import SiteLayout from '../layout/SiteLayout';
import '../assets/scss/Content.scss';
const AdminMain = () => {
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState([]);
    const [keyword, setKeyword] = useState('');
    
    const notifyKeywordChanged = (keyword) => {
        setKeyword(keyword);
      };
    
    let Check ={
        no: check
    }
    useEffect(() => {
        fetchAdmin();
    }, []);

    const fetchAdmin = async() => {
        try {
            const response = await fetch('http://localhost:8080/api/admin', {
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

            console.log(json.data)
            setUsers([...json.data,...users]);
        } catch (error) {
            console.error(error);
        }
    }
    const update = (e) => {
        e.preventDefault();
        alert("승인 되었습니다.");
        fetchUpdate();
    }
    const fetchUpdate = async() => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/update', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Check)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            console.log(json.data);
            location.href= '/admin';
        } catch (error) {
            console.error(error);
        }
    }
    const userDelete = (e) => {
        e.preventDefault();
        alert("삭제 되었습니다.");
        fetchdelete();
    }
    const fetchdelete = async() => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/delete', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Check)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            console.log(json.data);
            location.href= '/admin';
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <SiteLayout>
        <div className={style.wangBody}>
            <AdminSearch keyword={keyword} callback={notifyKeywordChanged}/>
            <div >
                <div className={style.titles}>
                    <span className={style.number}>번호</span>
                    <span className={style.name}>이름</span>
                    <span className={style.gender}>성별</span>
                    <span className={style.job}>직급</span>
                    <span className={style.rrn}>주민등록번호</span>
                    <span className={style.address}>주소</span>
                    <span className={style.phone}>연락처</span>
                    <span className={style.auth}>승인 여부</span>
                </div>
                <div className={style.smallBody}>
                <form method='post' onSubmit={update}>
                {
                    users
                    .filter(user => user.name.indexOf(keyword) !== -1)
                        .map(user => {
                        return (
                            <div className={style.small}>
                                <input type="checkbox" className = {style.checks}name="checkList" value={`${user.no}`}  onChange={(e) => {setCheck(e.target.value); console.log(e.target.value)}}/>
                                <span className={style.number}>{`${user.no}`}</span>
                                <span className={style.name}>{`${user.name}`}</span>
                                <span className={style.gender}>{`${user.gender}`=== 'M' ? '남' : '여'}</span>
                                <span className={style.job}>{`${user.job}`}</span>
                                <span className={style.rrn}>{`${user.rrn}`}</span>
                                <span className={style.address}>{`${user.address}`}</span>
                                <span className={style.phone}>{`${user.phone}`}</span>
                                <span className={style.auth}>{`${user.auth}`}</span>
                            </div>
                        )
                    })
                }
                <input type="button" value="삭제" onClick={userDelete}/>
                <input type="submit" className={style.auth} value="승인"/>
                </form>
                </div>
            </div>
        </div>
        </SiteLayout>
    );
};

export default AdminMain;