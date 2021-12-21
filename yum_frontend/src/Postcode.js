import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styles from './assets/scss/Postcode.scss';

const Postcode = ({callback}) => {
    const handleComplete = (data) => {
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
            isOpen: false,
            zonecode: data.zonecode,
            address: address,
        }
        console.log(addressData)

        callback(addressData);
    }

    return (
        <DaumPostcode 
            // className={styles.Postcode}
            style={{        
                height: '100%'
            }}
            onComplete={handleComplete} // 팝업에서 검색 결과 항목을 클릭했을 떄 실행
        />
    );
};

export default Postcode;