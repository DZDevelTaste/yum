import React from 'react';
import Join from './Join';
import SearchId from './SearchId';
import SearchPw from './SearchPw';
import SuccessId from './SuccessId';
import SuccessPw from './SuccessPw';

const App = () => {
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
            <br></br>
            <Join />
            <SearchId />
            <SearchPw />
            <SuccessId />
            <SuccessPw />
        </div>
    );
};
export default App;