import React, {useState} from 'react';
import DaumPostcode from 'react-daum-postcode';

const Join = () => {

    // 전부 입력되었는지 검사
    const login = () => {
        var id = document.getElementById('id').value;
        var pw = document.getElementById('pw').value;
        var name = document.getElementById('name').value;
        var rrn = document.getElementById('rrn').value;
        var address_kakao = document.getElementById('address_kakao').value;
        var addressDetail = document.getElementById('addressDetail').value;
        var job = document.getElementById('job').value;
        var phone = document.getElementById('phone').value;
        var gender = document.getElementById('gender').value;
        
        if(!id){
            window.alert('아이디를 입력해주세요');
            document.getElementById('id').focus();
            return false;
        } else if(!pw){
            window.alert('비밀번호를 입력해주세요');
            document.getElementById('pw').focus();
            return false;
        } else if(!name){
            window.alert('이름를 입력해주세요');
            document.getElementById('name').focus();
            return false;
        } else if(!rrn){
            window.alert('주민등록번호를 입력해주세요');
            document.getElementById('rrn').focus();
            return false;
        } else if(!address_kakao){
            window.alert('주소를 입력해주세요');
            document.getElementById('address_kakao').focus();
            return false;
        } else if(!addressDetail){
            window.alert('상세주소를 입력해주세요');
            document.getElementById('addressDetail').focus();
            return false;;
        } else if(!job){
            window.alert('직급을 선택해주세요');
            document.getElementById('job').focus();
            return false;
        } else if(!phone){
            window.alert('전화번호를 입력해주세요');
            document.getElementById('phone').focus();
            return false;
        } else if(!gender){
            window.alert('성별을 선택해주세요');
            document.getElementById('gender').focus();
            return false;
        }
        window.alert('회원가입이 완료 되었습니다.');
        return true
    };

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
    // 이메일 유효성 검사
    const checkEmail = (e) => {
        var regExp = /^[a-zA-Z0-9+-\_.]/i;
        
        if(!regExp.test(e.target.value)) {
            alert("잘못된 이메일 형식입니다.");
        }
    }
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
    // 주소찾기 API
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    window.onload = function(){
        document.getElementById("kakao").addEventListener("click", function(){ //주소입력칸을 클릭하면
            //카카오 지도 발생
            new daum.Postcode({
                oncomplete: function(data) { //선택시 입력값 세팅
                    document.getElementById("zonecode_kakao").value = data.zonecode;
                    document.getElementById("address_kakao").value = data.address; // 주소 넣기
                    document.getElementById("addressDetail").focus(); //상세입력 포커싱
                }
            }).open();
        })
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
    // 전화번호 select박스 값 집어넣기
    const phone_check = () => {
        var phone = document.getElementById('phone').value;
        var phone1 = document.getElementById('phone1').value;
        
        document.getElementById('phone1').value = phone;
    };
    return (
        <div>
            <form id="join" name="join" method="post" onSubmit={login} action="${pageContext.request.contextPath}/join">
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
                <label>비밀번호</label>
                <input type="password" name="password" id="pw" placeholder="PW" onBlur={checkPassword}/>
                <label>비밀번호 확인</label>
                <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkPassword}/>&nbsp;<span id="check" />
                <label>이름</label>
                <input type="text" name="name" id="name" placeholder="이름"/>
                <label>주민등록번호</label>
                <input type="text" name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6'/>
                <label>-</label>
                <input type="password" name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check}/>
                <label>직급</label>
                <label>간호사</label> <input type="radio" name="job" id="job" value='N' checked />
                <label>의사</label> <input type="radio" name="job" id="job" value='D' />
                <label>전화번호</label>
                <input type="text" name="phone" id="phone1" value="010" disabled />
                <select id="phone" name="phone" title="" onChange={phone_check}>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="012">012</option>
                            <option value="013">013</option>
                            <option value="014">014</option>
                            <option value="015">015</option>
                            <option value="016">016</option>
                            <option value="017">017</option>
                            <option value="018">018</option>
                            <option value="019">019</option>
                </select>
                <label>-</label>
                <input type="number" name="phone1" id="phone2" maxLength='4'/>
                <label>-</label>
                <input type="number" name="phone2" id="phone3" maxLength='4'/>
                <label>우편번호</label>
                <input type="text" id="zonecode_kakao" name="zonecode" placeholder="우편번호" />
                <input type='button' id="kakao" value='우편번호 입력'/>
                <label>주소</label>
                <input type="text" id="address_kakao" name="address" placeholder="주소" />
                <label>상세 주소</label>
                <input type="text" name="addressDetail" id="addressDetail" placeholder="상세주소"/>
                <label>성별</label>
                <label>남</label> <input type="radio" name="gender" id="gender" value='M' checked="checked" />
                <label>여</label> <input type="radio" name="gender" id="gender" value='F' />
                <input type="submit" value="가입하기" id="go" />
		    </form>        
        </div>
    );
};

export default Join;