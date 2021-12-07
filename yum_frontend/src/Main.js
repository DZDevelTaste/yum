import React from 'react';

const Main = () => {
    return (
        <div>
            <form id="join" name="join" method="post" action="${pageContext.request.contextPath}">
                <label>이메일</label><input type="text" name="email" onchange="ee()" />
                <label>비밀번호</label>
                <input type="text" name="password" />
                <input type="submit" value="로그인" />
                <a href="${pageContext.request.contextPath}">회원가입 </a>
                <a href="${pageContext.request.contextPath}">아이디 찾기 </a>
                <a href="${pageContext.request.contextPath}">비밀번호 찾기 </a>
		    </form>
        </div>
    );
};

export default Main;