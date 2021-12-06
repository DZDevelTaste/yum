import React from 'react';

const SearchPw = () => {
    return (
        <div>
            <h1>비밀번호 찾기</h1>
            <form id="join" name="join" method="post" action="${pageContext.request.contextPath }/searchpassword">
                    <label>이름</label>
                    <input type="text" name="name" id="name" />
                    <label>아이디</label>
                    <input type="text" name ="email" id="id"/>
                    <label>@</label>
                    <input type="text" id="id1" name="email1" class="ui_input" onfucus="" />
                    <select id="id2" name="email1" title="이메일 주소 선택" class="ui_select" onchange="email_check()">
                            <option value="1">직접입력</option>
                            <option value="naver.com">naver.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                    </select>
                    <label>주민등록번호</label>
                    <input type="text" name="rrn" id="rrn" />
                    <label>-</label>
                    <input type="password" name="rrn1" id="rrn1" onchange="rrn_check()" />
                    <input type="submit" value="아이디 찾기"/>
                    <a href="${pageContext.request.contextPath }">로그인</a>
            </form>      
        </div>
    );
};

export default SearchPw;