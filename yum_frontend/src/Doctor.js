import React from 'react';

const Doctor = () => {
    const LogoutUser = async(e) => {
        e.preventDefault();
        try {
            sessionStorage.clear();

            location.href = '/';
        } catch (error) {
            console.error(error);
        }
    }
    console.log(sessionStorage.getItem("no"))
    return (
        <div>
            다악터어
            <input type='button' value='로그아웃' onClick={LogoutUser}/>
        </div>
    );
};

export default Doctor;