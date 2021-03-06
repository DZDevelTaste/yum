import React, { Fragment, useEffect, useState } from 'react';
import Logo from '../../public/favicon.ico';
import SemiLogo from '../../public/title.png';
import style from '../assets/scss/main/update.scss';

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
            const response = await fetch(`/api/update/${no}`, {
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
    alert("??????????????? ?????????????????????.");
    fetchUpdate();
}

    const fetchUpdate = async() => {
    try {
        const response = await fetch(`/api/update`, {
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

 //???????????? ????????? ??????
 const checkPassword = (e) => {
    //  8 ~ 10??? ??????, ?????? ??????
    var rr = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

    if(!rr.test(e)) {
        document.getElementById('check').innerHTML='????????? ??????????????? ????????????.';
        document.getElementById('check').style.color='red';
        document.getElementById('pw').value='';
        document.getElementById('pw').focus();
    }
};

const checkcheck = () => {
    if(password !='' && document.getElementById('pw2').value!=''){
        if(document.getElementById('pw').value==document.getElementById('pw2').value){
            document.getElementById('check').innerHTML='??????????????? ???????????????.'
            document.getElementById('check').style.color='blue';
            return true;
        }
        else{
            document.getElementById('check').innerHTML='??????????????? ???????????? ????????????.';
            document.getElementById('check').style.color='red';
            document.getElementById('pw2').focus();
            return false;
        }
    }
}
const loadLayout = (e) => {
    e.preventDefault();
    window.daum.postcode.load(() => {
        const postcode = new window.daum.Postcode({
            oncomplete: function (data) {
                let address = data.address;
                let extraAddress = ''; // ????????????
        
                // ???????????? ????????? ?????? ?????? ?????? ??????('') ?????? ?????? ???????????? ????????? ?????? ????????? ?????? ?????? ?????? ?????? ?????????
                if (data.addressType === 'R') { // addressType - ????????? ?????? ?????? ??????: R(?????????), J(??????)
                    if (data.bname !== '') { // bname - ?????????/????????? ??????
                        // bname ?????? ?????? ?????? extraAddress??? ??????
                        extraAddress += data.bname;
                    }
                    if (data.buildingName !== '') { // buidingName - ?????????
                        // extraAddress??? ????????? ????????? ', ?????????'?????? ????????? ?????? '?????????'?????? ??????
                        extraAddress += (
                            extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
                        );
                    }
        
                    if(extraAddress !== ''){
                        address += ` (${extraAddress})`;
                    }
                }
                // console.log(data.zonecode); 
                // console.log(fullAddress);   // e.g. '?????? ????????? ????????????2???20 (?????????1???)'
                const addressData = {
                    zonecode: data.zonecode,
                    address: address,
                }
        
                setAddressNumber(addressData.zonecode);
                setAddress(addressData.address);
            },
        });
        postcode.open({
            popupTitle: '?????? ??????'
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
        <form method="post" onSubmit={update}>
            <div className={style.header}>?????? ?????? ??????</div>
            <div className={style.email}>
                <label>
                    <div id={'idTitle'}>?????????</div>
                <input type="text" name ="email" id="id" placeholder={`${email}`} disabled/>
                @
                <input type="text" id="id1" name="email1" placeholder={`${email1}`} disabled/>
                </label>
            </div>
            <div className={style.password}>
                    <div>????????????</div>
                        <input type="password" name="password" id="pw" placeholder="PASSWORD" onBlur={(e) => checkPassword(e.target.value)} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className={style.check}>
                    <div>???????????? ??????</div>
                        <input type="password" name="uPassword2" id="pw2" placeholder="CHECK" onBlur={checkcheck} required/>
                        <span id="check" >8~10?????? ????????? ????????? ??????????????????</span>
                </div>
            <div className={style.name}>
                <div>??????</div>
                <input type="text" name="name" id="name" value={`${name}`} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className={style.rrn}>
                <div>??????????????????</div>
                    <input type="text" name="rrn" id="rrn" placeholder={`${rrn}`} maxLength='6' disabled/>
                    <span>-</span>
                    <input type="password" name="rrn1" id="rrn1" placeholder={`${rrn1}`} maxLength='7' disabled/>
            </div>
            <div className={style.job}>
                <div>??????</div>
                <div>
                    <label><span className={style.nurse}>?????????</span><input type="radio" className={style.nurseBtn} name="job" id="radioNurse" value='N' checked={`${userVo.job}` === 'N' ? true:false}disabled/></label>
                    <label><span className={style.doctor}>??????</span><input type="radio" className={style.doctorBtn} name="job" id="raioDoctor" value='D' checked={`${userVo.job}` === 'D' ? true:false}disabled/></label>
                </div>
            </div>
            <div className={style.phone}>
                <div className={style.phoneTitle}>
                    ????????????
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
                    <div>??????</div>
                    <div className={style.addBox}>
                        <input
                            className={style.number}
                            type='text'
                            placeholder='????????????'
                            value={addressNumber || ''}
                            onClick={loadLayout}
                            onChange={ (e) => setAddressNumber(e.target.value)}
                            />
                        <button id='AddrBtn' className={style.AddrBtn} onClick={loadLayout}>????????????</button>
                        <input
                            className={style.address}
                            type='text'
                            placeholder='??????'
                            value={address || ''}
                            onClick={loadLayout}
                            onChange={ (e) => setAddress(e.target.value)}
                            />
                        <input
                            className={style.detail}
                            type='text'
                            placeholder='????????????'
                            value={addressDetail || ''}
                            onChange={ (e) =>  setAddressDetail(e.target.value) }
                            />
                    </div>
                </div>
            <div className={style.gender}>
                <div>??????</div>
                    <label className={style.male}>???</label> <input type="radio" className={style.maleBtn} name="gender" id="gender" value='M' checked={`${userVo.gender}` === 'M' ? true:false} disabled/>
                    <label className={style.female}>???</label> <input type="radio" className={style.femaleBtn} name="gender" id="gender" checked={`${userVo.gender}` === 'F' ? true:false} value='F' disabled/>
            </div>
            <input type="submit" className={style.join} value="??????" />
        </form>        
    </div>
    </Fragment>
);
};

export default Update;