import React from 'react';

// 주민등록번호 유효성
const rrn_check = () => {
    var rrn = document.getElementById('rrn').value;
    var rrn1 = document.getElementById('rrn1').value;
    
    var re = /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])/;
    var re1 = /[1-4][0-9]{6}$/;
    
    if(!re.test(rrn)) {
        window.alert('올바른 주민등록번호 형식이 아닙니다.');
        document.getElementById('rrn').value='';
        document.getElementById('rrn1').value='';
        document.getElementById('rrn').focus();
        return;
    }
    if(!re1.test(rrn1)) {
        window.alert('올바른 주민등록번호 형식이 아닙니다.');
        document.getElementById('rrn').value='';
        document.getElementById('rrn1').value='';
        document.getElementById('rrn1').focus();
        return;
    }
};
const SearchId = () => {
    return (
        <div>
            <h1>아이디 찾기</h1>
            <form id="join" name="join" method="post" action="${pageContext.request.contextPath }/searchemailsuccess">
                <label>이름</label>
                <input type="text" name="name" id="name" />
                <label>주민등록번호</label>
                <input type="text" name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6'/>
                <label>-</label>
                <input type="password" name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check}/>
                <input type="submit" value="아이디 찾기"/>
                <a href="${pageContext.request.contextPath }">로그인</a>
                <a href="${pageContext.request.contextPath }/searchpassword">비밀번호 찾기</a>
            </form>
        </div>
    );
};

export default SearchId;