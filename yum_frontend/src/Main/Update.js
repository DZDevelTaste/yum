import React, {useEffect, useState} from 'react';
import style from '../assets/scss/main/update.scss'

const Update = () => {
    const [userVo, setUserVo] = useState([]);
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [password, setPassword] = useState('');
    const [rrn, setRrn] = useState('');
    const [rrn1, setRrn1] = useState('');
    const [phone, setPhone] = useState('010');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const no = parseInt(sessionStorage.getItem("no"));
    const job = sessionStorage.getItem("job");
    
    let user = {
        no: no,
        password: password,
        address: "(" + addressNumber + ") " +address + " / " + addressDetail,
        phone: phone + "-" + phone1 + "-" + phone2,
    }
    useEffect(() => {
        ViewInfo();
    },[])
    
    

    const ViewInfo = async() => {
        try {
            const response = await fetch(`http://localhost:8080/api/update/${no}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });
            
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
    
            const json = await response.json();
            
            setUserVo(json.data);
            setEmail((json.data.email).split("@")[0]);
            setEmail1((json.data.email).split("@")[1]);
            setRrn((json.data.rrn).split("-")[0]);
            setRrn1((json.data.rrn).split("-")[1]);
            const home = json.data.address;
            setAddressNumber(home.substr(home.indexOf('(',0)+1, 5));
            setAddress(home.substring(home.indexOf(')', 0)+1, home.indexOf(' / ')));
            setAddressDetail(home.substr(home.indexOf(' / ')+3))
            setPhone1((json.data.phone).split("-")[1]);
            setPhone2((json.data.phone).split("-")[2]);
        } catch (error) {
            console.error(error);
        }
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
    fetchUpdate();
};

const update = () => {
    alert("정상적으로 수정되었습니다.");
    fetchUpdate();
}
    const fetchUpdate = async() => {
    try {
        const response = await fetch(`http://localhost:8080/api/update`, {
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
        
        if(job === 'N'){
            location.href='/nurse';
        } else if (job === 'D') {
            location.href='/doctor';
        } else if (job === 'A') {
            location.href='/admin'
        }
        
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

// 주소찾기 API
window.onload = function(){
    document.getElementById("kakao").addEventListener("click", function(){ //주소입력칸을 클릭하면
        //카카오 지도 발생
        new daum.Postcode({
            onComplete: function(data) { //선택시 입력값 세팅
                document.getElementById("zonecode_kakao").value = data.zonecode;
                document.getElementById("address_kakao").value = data.address; // 주소 넣기
                setAddressNumber(data.zonecode);
                setAddress(data.address);
                
                document.getElementById("addressDetail").focus(); //상세입력 포커싱
            }
        }).open();
    });
};

return (
    <div className={style.yammi}>
        <form method="post" onSubmit={update}>
            <div className={style.header}>회원 정보 수정</div>
            <div className={style.email}>
                <label>
                    <div id={'idTitle'}>아이디</div>
                <input type="text" name ="email" id="id" placeholder={`${email}`} disabled/>
                @
                <input type="text" id="id1" name="email1" placeholder={`${email1}`} disabled/>
                </label>
            </div>
            <div className={style.password}>
                <div>비밀번호</div>
                    <input type="password" name="password" id="pw" placeholder="PASSWORD" onBlur={checkPassword} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={style.check}>
                <div>비밀번호 확인</div>
                    <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkPassword}/>
                    <span id="check"></span>
            </div>
            <div className={style.name}>
                <div>이름</div>
                <input type="text" name="name" id="name" placeholder={`${userVo.name}`} disabled/>
            </div>
            <div className={style.rrn}>
                <div>주민등록번호</div>
                    <input type="text" name="rrn" id="rrn" placeholder={`${rrn}`} maxLength='6' disabled/>
                    <span>-</span>
                    <input type="password" name="rrn1" id="rrn1" placeholder={`${rrn1}`} maxLength='7' disabled/>
            </div>
            <div className={style.job}>
                <div>직급</div>
                <div>
                    <label><span className={style.nurse}>간호사</span><input type="radio" className={style.nurseBtn} name="job" id="radioNurse" value='N' checked={`${userVo.job}` === 'N' ? true:false}disabled/></label>
                    <label><span className={style.doctor}>의사</span><input type="radio" className={style.doctorBtn} name="job" id="raioDoctor" value='D' checked={`${userVo.job}` === 'D' ? true:false}disabled/></label>
                </div>
            </div>
            <div className={style.phone}>
                <div className={style.phoneTitle}>
                    전화번호
                </div>
                <div>
                    <select id="phone" name="phone" defaultValue="010" onChange={(e) => setPhone(e.target.value)}>
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
                    <input type="text" name="phone1" className={style.phoneN1} id="phone2" maxLength='4' value={`${phone1}`}onChange={(e) => setPhone1(e.target.value)}/>
                    <input type="text" name="phone2" className={style.phoneN2} id="phone3" maxLength='4' value={`${phone2}`}onChange={(e) => setPhone2(e.target.value)}/>
                </div>
            </div>
            <div className={style.address}>
                <div>주소</div>
                    <input type="text" className={style.number} id="zonecode_kakao" name="zonecode" value={`${addressNumber}`} onChange={(e) => setAddressNumber(e.target.value)}/>
                    <input type='button' id="kakao" value="우편번호 입력"/>
                    <input type="text" className={style.address} id="address_kakao" name="address" value={`${address}`} onChange={(e) => setAddress(e.target.value)}/>
                    <input type="text" className={style.detail} name="addressDetail" id="addressDetail" value={`${addressDetail}`} onChange={(e) => setAddressDetail(e.target.value)}/>
            </div>
            <div className={style.gender}>
                <div>성별</div>
                    <label className={style.male}>남</label> <input type="radio" className={style.maleBtn} name="gender" id="gender" value='M' checked={`${userVo.gender}` === 'M' ? true:false} disabled/>
                    <label className={style.female}>여</label> <input type="radio" className={style.femaleBtn} name="gender" id="gender" checked={`${userVo.gender}` === 'F' ? true:false} value='F' disabled/>
            </div>
            <input type="submit" className={style.join} value="수정" />
        </form>        
    </div>
);
};

export default Update;