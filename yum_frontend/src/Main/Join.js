import React, {Fragment, useEffect, useState} from 'react';
import style from '../assets/scss/main/join.scss'
import Logo from '../../public/favicon.ico';
import SemiLogo from '../../public/title.png';


const Join = () => {
        const [checkDbId, setCheckDbId] = useState(false);
        const [email, setEmail] = useState('');
        const [email1, setEmail1] = useState('');
        const [password, setPassword] = useState('');
        const [name, setName] = useState('');
        const [gender, setGender] = useState('');
        const [rrn, setRrn] = useState('');
        const [rrn1, setRrn1] = useState('');
        const [job, setJob] = useState('');
        const [phone, setPhone] = useState('010');
        const [phone1, setPhone1] = useState('');
        const [phone2, setPhone2] = useState('');
        const [addressNumber, setAddressNumber] = useState('');
        const [address, setAddress] = useState('');
        const [addressDetail, setAddressDetail] = useState('');
        



        let user = {
            email: email + "@" + email1,
            name: name,
            password: password,
            rrn: rrn + "-"+ rrn1,
            address: "(" + addressNumber + ")" + address + " / " + addressDetail,
            job: job,
            gender: gender,
            phone: phone +"-"+phone1+"-"+phone2,
        }

        let dummyEmail = {
            email: email + "@" + email1
        }
    
        const dummy = async() => {
            try {
                const response = await fetch(`/api/check`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(dummyEmail)
                });
                
                if(!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
    
                const json = await response.json();
                
                if(json.data == true) {
                    document.getElementById('checkEmail').innerHTML='이미 존재하는 이메일입니다.'
                    document.getElementById('checkEmail').style.color='red';
                    document.getElementById('id').value='';
                    document.getElementById('id').focus();
                } else {
                    document.getElementById('checkEmail').innerHTML='사용 가능한 이메일입니다.'
                    document.getElementById('checkEmail').style.color='blue';
                    setCheckDbId(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
        
    // 전부 입력되었는지 검사
    const login1 = (e) => {
        e.preventDefault();
        if (checkDbId == false) {
            alert("아이디 중복확인을 해주세요.");
            return false;
        }
        alert("회원가입이 완료되었습니다.");
        fetchJoin();
    };
    
    const fetchJoin = async() => {
        try {
            const response = await fetch(`/api/join`, {
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
        var rr = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

        if(!rr.test(e)) {
            document.getElementById('check').innerHTML='올바른 비밀번호 형식이 아닙니다.';
            document.getElementById('check').style.color='red';
            document.getElementById('pw').value='';
            document.getElementById('pw').focus();
        }
    };

    const checkcheck = () => {
        if(password !='' && document.getElementById('pw2').value!=''){
            if(document.getElementById('pw').value==document.getElementById('pw2').value){
                document.getElementById('check').innerHTML='비밀번호가 일치합니다.'
                document.getElementById('check').style.color='blue';
                return true;
            }
            else{
                document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다.';
                document.getElementById('check').style.color='red';
                document.getElementById('pw2').focus();
                return false;
            }
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
            return false;
        }
        if(!re1.test(rrn1)) {
            window.alert('올바른 주민등록번호 형식이 아닙니다.');
            document.getElementById('rrn').value='';
            document.getElementById('rrn1').value='';
            return false;
        }
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
    
    const loadLayout = (e) => {
        e.preventDefault();
        window.daum.postcode.load(() => {
            const postcode = new window.daum.Postcode({
                oncomplete: function (data) {
                    let address = data.address;
                    let extraAddress = ''; // 참고항목
            
                    // 내려오는 변수가 값이 없는 경우 공백('') 값을 가짐 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져옴
                    if (data.addressType === 'R') { // addressType - 검색된 기본 주소 타입: R(도로명), J(지번)
                        if (data.bname !== '') { // bname - 법정동/법정리 이름
                            // bname 값이 있을 경우 extraAddress에 추가
                            extraAddress += data.bname;
                        }
                        if (data.buildingName !== '') { // buidingName - 건물명
                            // extraAddress가 빈값이 아니면 ', 건물명'으로 빈값일 경우 '건물명'으로 추가
                            extraAddress += (
                                extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
                            );
                        }
            
                        if(extraAddress !== ''){
                            address += ` (${extraAddress})`;
                        }
                    }
                    // console.log(data.zonecode); 
                    // console.log(fullAddress);   // e.g. '서울 성동구 왕십리로2길20 (성수동1가)'
                    const addressData = {
                        zonecode: data.zonecode,
                        address: address,
                    }
            
                    setAddressNumber(addressData.zonecode);
                    setAddress(addressData.address);
                },
            });
            postcode.open({
                popupTitle: '주소 검색'
            });
        });
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.body.append(script);
    }, []);

    return (
        <Fragment>
        <div className={style.yammi}>
            <img className={style.image}src={Logo}/>
            <img className={style.image1}src={SemiLogo}/>
            <form method="post" onSubmit={login1} >
                <div className={style.header}>회원가입</div>
                <div className={style.email}>
                    <label>
                        <div id={'idTitle'}>아이디</div>
                    <input type="text" name ="email" id="id" placeholder="ID" onChange={(e) => setEmail(e.target.value)} required/>
                    @
                    <input type="text" id="id1" name="email1" onChange={(e) => setEmail1(e.target.value)} required/>
                    <select id="id2" name="email1" onChange={email_check}>
                            <option value="1">직접입력</option>
                            <option value="naver.com">naver.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                    </select>
                    </label>
                    <span id="checkEmail" className={style.state}></span>
                    <input type="button" value="중복 확인" className={style.checkEmail} onClick={dummy} required/>
                </div>
                <div className={style.password}>
                    <div>비밀번호</div>
                        <input type="password" name="password" id="pw" placeholder="PASSWORD" onBlur={(e) => checkPassword(e.target.value)} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className={style.check}>
                    <div>비밀번호 확인</div>
                        <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkcheck} required/>
                        <span id="check" >8~10자의 숫자와 영문을 입력해주세요</span>
                </div>
                <div className={style.name}>
                    <div>이름</div>
                    <input type="text" name="name" id="name" placeholder="이름" onChange={(e => setName(e.target.value))} required/>
                </div>
                <div className={style.rrn}>
                    <div>주민등록번호</div>
                        <input type="text" name="rrn" id="rrn" placeholder="주민등록번호" maxLength='6' onChange={(e) => setRrn(e.target.value)} required/>
                        <span>-</span>
                        <input type="password" name="rrn1" id="rrn1" maxLength='7' onBlur={rrn_check} onChange={(e) => setRrn1(e.target.value)} required/>
                </div>
                <div className={style.job}>
                    <div>직급</div>
                    <div>
                        <label><span className={style.nurse}>간호사</span><input type="radio" className={style.nurseBtn} name="job" id="job" value='N' onChange={(e) => setJob(e.target.value)} required/></label>
                        <label><span className={style.doctor}>의사</span><input type="radio" className={style.doctorBtn} name="job" id="job" value='D' onChange={(e) => setJob(e.target.value)} required/></label>
                    </div>
                </div>
                <div className={style.phone}>
                    <div className={style.phoneTitle}>
                        전화번호
                    </div>
                    <div>
                        <select id="phone" name="phone" onChange={(e) => setPhone(e.target.value)} required>
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
                        <input type="text" name="phone1" className={style.phoneN1} id="phone2" maxLength='4' onChange={(e) => setPhone1(e.target.value)} required/>
                        <input type="text" name="phone2" className={style.phoneN2} id="phone3" maxLength='4' onChange={(e) => setPhone2(e.target.value)} required/>
                    </div>
                </div>
                <div className={style.address}>
                    <div>주소</div>
                    <div className={style.addBox}>
                        <input
                            className={style.number}
                            type='text'
                            placeholder='우편번호'
                            value={addressNumber || ''}
                            onClick={loadLayout}
                            onChange={ (e) => setAddressNumber(e.target.value)}
                            />
                        <button id='AddrBtn' className={style.AddrBtn} onClick={loadLayout}>주소찾기</button>
                        <input
                            className={style.address}
                            type='text'
                            placeholder='주소'
                            value={address || ''}
                            onClick={loadLayout}
                            onChange={ (e) => setAddress(e.target.value)}
                            />
                        <input
                            className={style.detail}
                            type='text'
                            placeholder='상세주소'
                            value={addressDetail || ''}
                            onChange={ (e) =>  setAddressDetail(e.target.value) }
                            />
                    </div>
                </div>
                <div className={style.gender}>
                    <div>성별</div>
                        <label className={style.male}>남</label> <input type="radio" className={style.maleBtn} name="gender" id="gender" value='M' onChange={(e) => setGender(e.target.value)} required/>
                        <label className={style.female}>여</label> <input type="radio" className={style.femaleBtn} name="gender" id="gender" value='F'  onChange={(e) => setGender(e.target.value)} required/>
                </div>
                <input type="submit" className={style.join} value="회원가입" />
		    </form>        
        </div>
    </Fragment>
    );
};

export default Join;