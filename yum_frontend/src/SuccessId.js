import React from 'react';

const SuccessId = () => {
    return (
        <div>
            <h1>아이디 찾기 완료</h1>
		    <label>너님의 아이디는 집가고싶어요입니다.</label>
		
            <a href="${pageContext.request.contextPath }">로그인</a>
            <a href="${pageContext.request.contextPath }/searchpassword">비밀번호 찾기</a>
        </div>
    );
};

export default SuccessId;