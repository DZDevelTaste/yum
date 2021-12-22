import React, {useEffect, useState} from 'react';
import style from '../assets/scss/main/update.scss'
import Logo from '../../public/favicon.ico'
import SemiLogo from '../../public/title.png'

const Update = () => {
    const [userVo, setUserVo] = useState([]);
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [name, setName] = useState('');
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
        name: name,
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
            setName(json.data.name);
            setAddressNumber(home.substr(home.indexOf('(',0)+1, 5));
            setAddress(home.substring(home.indexOf(')', 0)+1, home.indexOf(' / ')));
            setAddressDetail(home.substr(home.indexOf(' / ')+3))
            setPhone1((json.data.phone).split("-")[1]);
            setPhone2((json.data.phone).split("-")[2]);
        } catch (error) {
            console.error(error);
        }
    }

    

const update = (e) => {
    e.preventDefault();
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
    var rr = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

    if(!rr.test(e)) {
        document.getElementById('check').innerHTML='올바른 비밀번호가 아닙니다.';
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
        <img className={style.image}src={Logo}/>
        <img className={style.image1}src={SemiLogo}/>
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
                        <input type="password" name="password" id="pw" placeholder="PASSWORD" onBlur={(e) => checkPassword(e.target.value)} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className={style.check}>
                    <div>비밀번호 확인</div>
                        <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkcheck} required/>
                        <span id="check" >8~10자의 숫자와 영문을 입력해주세요</span>
                </div>
            <div className={style.name}>
                <div>이름</div>
                <input type="text" name="name" id="name" value={`${name}`} onChange={(e) => setName(e.target.value)} required/>
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
                    <input type="text" name="phone1" className={style.phoneN1} id="phone2" maxLength='4' value={`${phone1}`} onChange={(e) => setPhone1(e.target.value)}/>
                    <input type="text" name="phone2" className={style.phoneN2} id="phone3" maxLength='4' value={`${phone2}`} onChange={(e) => setPhone2(e.target.value)}/>
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