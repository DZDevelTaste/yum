import React from 'react';

const Join = () => {
    return (
        <div>
            <form id="join" name="join" method="post" onSubmit="return login();" action="${pageContext.request.contextPath}/join">
                <label>아이디</label>
                <input type="text" name ="email" id="id"/>
                <label>@</label>
	            <input type="text" id="id1" name="email1" class="ui_input" onfucus="" />
				<label><select id="id2" name="email1" title="이메일 주소 선택" class="ui_select" onchange="email_check()">
						<option value="1">직접입력</option>
						<option value="naver.com">naver.com</option>
						<option value="nate.com">nate.com</option>
						<option value="gmail.com">gmail.com</option>
						<option value="yahoo.com">yahoo.com</option>
						<option value="hanmail.net">hanmail.net</option>
				</select></label>
                <label>비밀번호</label>
                <input type="password" name="password" id="pw" onchange="check_pw()" />
                <label>비밀번호 확인</label>
                <input type="password" name="uPassword2" id="pw2" onchange="check_pw()"/>&nbsp;<span id="check" />
                <label>이름</label>
                <input type="text" name="name" id="name" />
                <label>주민등록번호</label>
                <input type="text" name="rrn" id="rrn" />
                <label>-</label>
                <input type="password" name="rrn1" id="rrn1" onchange="rrn_check()" />
                <label>직급</label>
                <label>간호사</label> <input type="radio" name="job" id="job" value='N' checked />
                <label>의사</label> <input type="radio" name="job" id="job" value='D' />
                <label>전화번호</label>
                <input type="text" name="phone" id="phone1" value="010" disabled />
                <select id="phone" name="phone" title="" class="ui_select" onchange="phone_check()">
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
                <input type="text" max="9999" maxlength="4" name="phone1" id="phone2" onkeyup="onlynumberic(event)" />
                <label>-</label>
                <input type="text" max="9999" maxlength="4" name="phone2" id="phone3" onkeyup="onlynumberic(event)" />
                <label>우편번호</label>
                <input type="text" id="zonecode_kakao" name="zonecode" readonly />
                <input type='button' id="zonecode_kakao" value='우편번호 입력'/>
                <label>주소</label>
                <input type="text" id="address_kakao" name="address" readonly />
                <label>상세 주소</label>
                <input type="text" name="addressDetail" id="addressDetail"/>
                <label>성별</label>
                <label>남</label> <input type="radio" name="gender" id="gender" value='M'checked="checked" />
                <label>여</label> <input type="radio" name="gender" id="gender" value='F' />
                <input type="submit" value="가입하기" id="go" />
		    </form>        
        </div>
    );
};

export default Join ;