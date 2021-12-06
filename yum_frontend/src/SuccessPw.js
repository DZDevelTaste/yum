import React from 'react';

const SuccessPw = () => {
    return (
        <div>
            <h1>비밀번호 재설정</h1>
            <form id="join" name="join" method="post" action="${pageContext.request.contextPath}/searchpasswordsuccess/${vo.name}">
                <label>너님의 아이디는 집가고싶어요입니다.</label>
                        <label>비밀번호</label>
                        <input type="password" name="password" id="pw"
                            onchange="check_pw()" />
                        <label>비밀번호 확인</label>
                        <input type="password" name="uPassword2" id="pw2"
                            onchange="check_pw()" />&nbsp;<span id="check"></span>
                <input type="submit" value="비밀번호 변경" />
                <a href="${pageContext.request.contextPath }">로그인</a>
                <a href="${pageContext.request.contextPath }/searchpassword">비밀번호 찾기</a>
		    </form>
        </div>
    );
};

export default SuccessPw;