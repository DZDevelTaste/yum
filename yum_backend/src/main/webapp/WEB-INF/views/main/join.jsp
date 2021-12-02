<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kakao API</title>
</head>
<body>
		<form id="join" name="join" method="post" action="${pageContext.request.contextPath }/user/join">
		<tr>
			<th>이메일</th>
			<td><input type="text" name="email"></td>
		</tr>
		<tr>
			<th>비밀번호</th>
			<td><input type="text" name="password"></td>
		</tr>
		<tr>
			<th>비밀번호 확인</th>
			<td><input type="text" name="re_password"></td>
		</tr>
		<tr>
			<th>이름</th>
			<td><input type="text" name="user_name"></td>
		</tr>
		<tr>
			<th>주민등록번호</th>
			<td><input type="text" name="user_number"></td>
		</tr>
			<th>직급</th>
			<td><label>간호사</label> <input type="radio" name="job" value="nurse" checked="checked">
			<label>의사</label> <input type="radio" name="job" value="doctor"></td>
		<tr>
			<th>전화번호</th>
			<td><input type="text" name="user_phonenumber"></td>
		</tr>
		<tr>
			<th>우편번호</th>
			<td><input type="text" id="zonecode_kakao" name="zonecode"
				readonly /></td>
		</tr>
		<tr>
			<td><button id='btn'>우편번호 입력</button></td>
		</tr>
		<tr>
			<th>주소</th>
			<td><input type="text" id="address_kakao" name="address"
				readonly /></td>
		</tr>
		<tr>
			<th>상세 주소</th>
			<td><input type="text" name="address_detail" /></td>
		</tr>
		<tr>
			<th>성별</th>
			<td><label>남</label> <input type="radio" name="gender" value="male"	checked="checked">
			<label>여</label> <input type="radio" name="gender" value="female"></td>
		</tr>
			<input type="submit" value="가입하기">
		</form>
</body>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
window.onload = function(){
    document.getElementById("btn").addEventListener("click", function(){ //주소입력칸을 클릭하면
        //카카오 지도 발생
        new daum.Postcode({
            oncomplete: function(data) { //선택시 입력값 세팅
	  			document.getElementById("zonecode_kakao").value = data.zonecode; // 우편번호 넣기
                document.getElementById("address_kakao").value = data.address; // 주소 넣기
                document.querySelector("input[name=address_detail]").focus(); //상세입력 포커싱
		}
        }).open();
    });
}
</script>
</html>