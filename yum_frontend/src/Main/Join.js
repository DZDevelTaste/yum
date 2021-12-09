import React, {useEffect, useState} from 'react';

const Join = () => {
        const [email, setEmail] = useState('');
        const [email1, setEmail1] = useState('');
        const [password, setPassword] = useState('');
        const [name, setName] = useState('');
        const [gender, setGender] = useState('');
        const [rrn, setRrn] = useState('');
        const [rrn1, setRrn1] = useState('');
        const [job, setJob] = useState('');
        const [phone, setPhone] = useState('');
        const [phone1, setPhone1] = useState('');
        const [phone2, setPhone2] = useState('');
        const [address, setAddress] = useState('');
        const [addressDetail, setAddressDetail] = useState('');

        const emailChange = (e) => {
            setEmail(e.target.value);
        }
        const email1Change = (e) => {
            setEmail1(e.target.value);
        }
        const passwordChange = (e) => {
            setPassword(e.target.value);
        }
        const nameChange = (e) => {
            setName(e.target.value);
        }
        const genderChange = (e) => {
            setGender(e.target.value);
        }
        const rrnChange = (e) => {
            setRrn(e.target.value);
        }
        const rrn1Change = (e) => {
            setRrn1(e.target.value);
        }
        const jobChange = (e) => {
            setJob(e.target.value);
        }
        const phoneChange = (e) => {
            setPhone(e.target.value);
        }
        const phone1Change = (e) => {
            setPhone1(e.target.value);
        }
        const phone2Change = (e) => {
            setPhone2(e.target.value);
        }
        const addressChange = (e) => {
            setAddress(e.target.value);
        }
        const addressdetailChange = (e) => {
            setAddressDetail(e.target.value);
        }

        let user = {
            email: email,
            email1:email1,
            name: name,
            password: password,
            rrn: rrn,
            rrn1: rrn1,
            address: address,
            addressDetail: addressDetail,
            job: job,
            gender: gender,
            phone: phone,
            phone1: phone1,
            phone2: phone2
        }

    
    // 전부 입력되었는지 검사
    const login1 = (e) => {
        e.preventDefault();
        var id = document.getElementById('id').value;
        var pw = document.getElementById('pw').value;
        var name = document.getElementById('name').value;
        var rrn = document.getElementById('rrn').value;
        var address_kakao = document.getElementById('address_kakao').value;
        var addressDetail = document.getElementById('addressDetail').value;
        var job = document.getElementById('job').value;
        var phone = document.getElementById('phone').value;
        var gender = document.getElementById('gender').value;
        
        if(id === ''){
            alert('아이디를 입력해주세요');
            return false;
        }  if(pw === ''){
            alert('비밀번호를 입력해주세요');
            return false;
        }  if(name === ''){
            alert('이름를 입력해주세요');
            return false;
        }  if(rrn === ''){
            alert('주민등록번호를 입력해주세요');
            return false;
        }  if(address_kakao === ''){
            alert('주소를 입력해주세요');
            return false;
        }  if(addressDetail === ''){
            alert('상세주소를 입력해주세요');
            return false;;
        }  if(job === ''){
            alert('직급을 선택해주세요');
            return false;
        }  if(phone === ''){
            alert('전화번호를 입력해주세요');
            return false;
        }  if(gender === ''){
            alert('성별을 선택해주세요');
            return false;
        }
        alert("회원가입이 완료되었습니다.");
        fetchJoin();
    };
    
    const fetchJoin = async() => {
        try {
            const response = await fetch(`http://localhost:8080/api/join`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(user)
            });
            
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            
            location.href='/';
        } catch (error) {
            console.error(error);
        }
    }
    
    //비밀번호 유효성 검사
    const checkPassword = (e) => {
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

        if(!regExp.test(e.target.value)) {
            alert("잘못된 비밀번호 형식입니다.");
            return false;
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
    };
    // 이메일 유효성 검사
    const checkEmail = (e) => {
        var regExp = /^[a-zA-Z0-9+-\_.]/i;
        
        if(!regExp.test(e.target.value)) {
            alert("잘못된 이메일 형식입니다.");
            document.getElementById('id').focus;
            return false;
            
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
            return false;
        }
        if(!re1.test(rrn1)) {
            window.alert('올바른 주민등록번호 형식이 아닙니다.');
            document.getElementById('rrn').value='';
            document.getElementById('rrn1').value='';
            return false;
        }
    };
    // 주소찾기 API
    window.onload = function(){
        document.getElementById("kakao").addEventListener("click", function(){ //주소입력칸을 클릭하면
            //카카오 지도 발생
            new daum.Postcode({
                oncomplete: function(data) { //선택시 입력값 세팅
                    document.getElementById("zonecode_kakao").value = data.zonecode;
                    document.getElementById("address_kakao").value = data.address; // 주소 넣기
                    setAddress(document.getElementById("address_kakao").value);
                    document.getElementById("addressDetail").focus(); //상세입력 포커싱
                }
            }).open();
        });
    };
    // 이메일 select박스 값 집어넣기
    const email_check = () => {
        var email1 = document.getElementById('id1').value;
        var email2 = document.getElementById('id2').value;

        if(email2 == 1) {
            document.getElementById('id1').disabled = false;
            document.getElementById('id1').value='';
            setEmail1(document.getElementById('id1').value);
        } else {
            document.getElementById('id1').disabled = true;
            document.getElementById('id1').value=email2;
            setEmail1(document.getElementById('id1').value);
        }
    };
    // 전화번호 select박스 값 집어넣기
    const phone_check = () => {
        var phone = document.getElementById('phone').value;
        var phone1 = document.getElementById('phone1').value;
        
        if(phone == 1) {
            document.getElementById('phone1').disabled = false;
            document.getElementById('phone1').value='';
            setPhone(document.getElementById('phone1').value);
        } else {
            document.getElementById('phone1').disabled = true;
            document.getElementById('phone1').value=phone;
            setPhone(document.getElementById('phone1').value);
        }
    };

    return (
        <div>
            <form method="post" onSubmit={login1} >
                <label>아이디</label>
                <input type="text" name ="email" id="id" placeholder="아이디" onBlur={checkEmail} onChange={emailChange}/>
                <label>@</label>
	            <input type="text" id="id1" name="email1" onChange={email1Change}/>
				<label><select id="id2" name="email1" onChange={email_check}>
						<option value="1">직접입력</option>
						<option value="naver.com">naver.com</option>
						<option value="nate.com">nate.com</option>
						<option value="gmail.com">gmail.com</option>
						<option value="yahoo.com">yahoo.com</option>
						<option value="hanmail.net">hanmail.net</option>
				</select></label>
                <label>비밀번호</label>
                <input type="password" name="password" id="pw" placeholder="PW" onBlur={checkPassword} onChange={passwordChange}/>
                <label>비밀번호 확인</label>
                <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkPassword}/>&nbsp;<span id="check" />
                <label>이름</label>
                <input type="text" name="name" id="name" placeholder="이름" onChange={nameChange}/>
                <label>주민등록번호</label>
                <input type="text" name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6' onChange={rrnChange}/>
                <label>-</label>
                <input type="password" name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check} onChange={rrn1Change}/>
                <label>직급</label>
                <label>간호사</label> <input type="radio" name="job" id="job" value='N' onChange={jobChange}/>
                <label>의사</label> <input type="radio" name="job" id="job" value='D' onChange={jobChange}/>
                <label>전화번호</label>
                <input type="text" name="phone" id="phone1"  onChange={phoneChange}/>
                <select id="phone" name="phone" onChange={phone_check}>
                            <option value="1">직접입력</option>
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
                <input type="number" name="phone1" id="phone2" maxLength='4' onChange={phone1Change}/>
                <label>-</label>
                <input type="number" name="phone2" id="phone3" maxLength='4' onChange={phone2Change}/>
                <label>우편번호</label>
                <input type="text" id="zonecode_kakao" name="zonecode" placeholder="우편번호" />
                <input type='button' id="kakao" value="우편번호 입력"/>
                <label>주소</label>
                <input type="text" id="address_kakao" name="address" placeholder="주소" onChange={addressChange}/>
                <label>상세 주소</label>
                <input type="text" name="addressDetail" id="addressDetail" placeholder="상세주소" onChange={addressdetailChange}/>
                <label>성별</label>
                <label>남</label> <input type="radio" name="gender" id="gender" value='M' onChange={genderChange}/>
                <label>여</label> <input type="radio" name="gender" id="gender" value='F'  onChange={genderChange}/>
                <input type="submit" value="가입하기" />
		    </form>        
        </div>
    );
};

export default Join;