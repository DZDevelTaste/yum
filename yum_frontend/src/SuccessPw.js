import React from 'react';

//비밀번호 유효성 검사
const checkPassword = (e) => {
    //  8 ~ 10자 영문, 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

    if(!regExp.test(e.target.value)) {
        alert("잘못된 비밀번호 형식입니다.");
    }
    if(document.getElementById('pw').value !='' && document.getElementById('pw2').value!=''){
        if(document.getElementById('pw').value==document.getElementById('pw2').value){
            document.getElementById('check').innerHTML='비밀번호가 일치합니다.'
            document.getElementById('check').style.color='blue';
        }
        else{
            document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다.';
            document.getElementById('check').style.color='red';
        }
    }
}
const SuccessPw = () => {
    return (
        <div>
            <h1>비밀번호 재설정</h1>
            <form id="join" name="join" method="post" action="${pageContext.request.contextPath}/searchpasswordsuccess/${vo.name}">
                <label>너님의 아이디는 집가고싶어요입니다.</label>
                <label>비밀번호</label>
                <input type="password" name="password" id="pw" placeholder="PW" onBlur={checkPassword}/>
                <label>비밀번호 확인</label>
                <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkPassword}/>&nbsp;<span id="check" />
                <input type="submit" value="비밀번호 변경" />
                <a href="${pageContext.request.contextPath }">로그인</a>
                <a href="${pageContext.request.contextPath }/searchpassword">비밀번호 찾기</a>
		    </form>
        </div>
    );
};

export default SuccessPw;