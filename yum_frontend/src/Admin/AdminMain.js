import React, { useState, useEffect } from 'react';
import AdminSearch from './AdminSearch';
const AdminMain = () => {
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState([]);
    const [keyword, setKeyword] = useState('');
    
    const notifyKeywordChanged = (keyword) => {
        setKeyword(keyword);
      };
    const checkChange = (e) => {
        setCheck(e.target.value);
    }

    let Check ={
        no: check
    }
    useEffect(() => {
        fetchAdmin();
    }, []);

    const fetchAdmin = async() => {
        try {
            const response = await fetch('http://localhost:8080/api/admin', {
                melabelod: 'get',
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
        <div>
            <h1>관리자 유저 리스트</h1>
            <AdminSearch keyword={keyword} callback={notifyKeywordChanged}/>
            <div>
                <label>번호 </label>
                <label>이름 </label>
                <label>아이디   </label>
                <label>주소 </label>
                <label>직급 </label>
                <label>성별 </label>
                <label>승인여부 </label>
            </div>	
            <form method='post' onSubmit={update}>
            {
                users
                .filter(user => user.name.indexOf(keyword) !== -1)
                    .map(user => {
                    return (
                        <div>
                            <input type="checkbox" name="checkList" value={`${user.no}`}  onChange={checkChange}/>
                            <label>{`${user.no}`}   </label>
                            <label>{`${user.name}`} </label>
                            <label>{`${user.email}`}    </label>
                            <label>{`${user.address}`}  </label>
                            <label>{`${user.job}`}  </label>
                            <label>{`${user.gender}`}   </label>
                            <label>{`${user.auth}`}  </label>
                            <input type="button" value="delete" onClick={userDelete}/>
                        </div>
                    )
            })
            }
            <input type="submit" value="승인"/>
            </form>
        </div>
    );
};

export default AdminMain;