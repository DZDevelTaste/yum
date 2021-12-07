import React from 'react';

// 이메일 유효성 검사
const checkEmail = (e) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

    if(!regExp.test(e.target.value)) {
        alert("잘못된 이메일 형식입니다.");
    }
}
// 이메일 select박스 값 집어넣기
const email_check = () => {
    var email1 = document.getElementById('id1').value;
    var email2 = document.getElementById('id2').value;

    if(email2 == 1) {
        document.getElementById('id1').disabled = false;
        document.getElementById('id1').value='';
    } else {
        document.getElementById('id1').disabled = true;
        document.getElementById('id1').value=email2;
    }
};
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
const SearchPw = () => {
    return (
        <div>
            <h1>비밀번호 찾기</h1>
            <form id="join" name="join" method="post" action="${pageContext.request.contextPath }/searchpassword">
                    <label>이름</label>
                    <input type="text" name="name" id="name" />
                    <label>아이디</label>
                    <input type="text" name ="email" id="id" placeholder="아이디" onBlur={checkEmail}/>
                    <label>@</label>
                    <input type="text" id="id1" name="email1" class="ui_input" onFocus="" />
                    <label><select id="id2" name="email1" title="이메일 주소 선택" onChange={email_check}>
                            <option value="1">직접입력</option>
                            <option value="naver.com">naver.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                    </select></label>
                    <label>주민등록번호</label>
                    <input type="text" name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6'/>
                    <label>-</label>
                    <input type="password" name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check}/>
                    <input type="submit" value="비밀번호 찾기"/>
                    <a href="${pageContext.request.contextPath }">로그인</a>
            </form>      
        </div>
    );
};

export default SearchPw;