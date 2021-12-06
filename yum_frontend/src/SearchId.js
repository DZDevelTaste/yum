import React from 'react';

const SearchId = () => {
    return (
        <div>
            <h1>아이디 찾기</h1>
            <form id="join" name="join" method="post" action="${pageContext.request.contextPath }/searchemailsuccess">
                <label>이름</label>
                <input type="text" name="name" id="name" />
                <label>주민등록번호</label>
                <input type="text" name="rrn" id="rrn" />
                <label>-</label>
                <input type="password" name="rrn1" id="rrn1" onchange="rrn_check()" />
                <input type="submit" value="아이디 찾기"/>
                <a href="${pageContext.request.contextPath }">로그인</a>
                <a href="${pageContext.request.contextPath }/searchpassword">비밀번호 찾기</a>
            </form>
        </div>
    );
};

export default SearchId;