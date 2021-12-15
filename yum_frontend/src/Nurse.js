import React from 'react';

const Nurse = () => {
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
            너얼스으
            <input type='button' value='로그아웃' onClick={LogoutUser}/>
        </div>
    );
};

export default Nurse;