import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from '../../assets/scss/component/doctor/diagnosis/Disease.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import { faCheck, faDonate, faTimes } from '@fortawesome/free-solid-svg-icons';

const disease = ({callback}) => {
    const [modalData, setModalData] = useState({isOpen: false})
    const [diseases, setDiseases] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [changeValue, setChangeValue] = useState(0);

    const [presDiseases, setPresDiseases] = useState([]); // value for insert

    useEffect(() => {
        fetchDisease();
    }, [])

    useEffect(() => {
        callback(presDiseases);
    }, [presDiseases])

    useEffect(()=>{
        setPresDiseases(presDiseases)
    }, [changeValue])

    const fetchDisease = async() => {
        try {
            const response = await fetch('/api/doctor/searchDisease', {
                method: 'get',
                credentials: 'include',
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

            setDiseases([...json.data, ...diseases]);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={style.diseaseBody} >
            <div className={style.head} >
                <span>병명 </span>
                <input type='text' onClick={() => setModalData({isOpen: true})} />
            </div>
            <div className={style.menu}>
                <div className={style.codeMenu}>
                    질병코드
                </div>
                <div className={style.disNameMenu}>
                    질병명
                </div>
                <div className={style.deleteMenu}>
                </div>
            </div>
            <div className={style.diseaseList}>
                {
                    presDiseases.length > 0 &&
                    presDiseases.map(presDisease => {
                        return(
                            <div className={style.selectedDisease}>
                                <div className={style.disCode}>{presDisease.code}</div>
                                <div className={style.disName}>{presDisease.name}</div>
                                    <div className={style.deleteBtnDiv}>
                                    <button className={style.deleteBtn} onClick={() => {
                                        if(confirm(`${presDisease.name} 병명을 삭제하시겠습니까?`) == true){
                                            console.log(presDiseases.indexOf(presDisease));
                                            presDiseases.splice(presDiseases.indexOf(presDisease), 1)
                                            setChangeValue(changeValue + 1);
                                        }
                                    }}>
                                            <FontAwesomeIcon icon={faTimes} size="lg" color="#CF1313"/>
                                    </button>
                                </div>
                                
                            </div>
                        )
                    }) 
                }
            </div>
            
            
            <Modal 
                isOpen={modalData.isOpen} 
                ariaHideApp={false} 
                onRequestClose={ () => setModalData(false) }
                shouldCloseOnOverlayClick={ true }
                className={style.modal}
                style={{content: {width: 500, height: 400}}}>
                
                <div className={style.modalHead}>
                    <div className={style.title}>병명</div>
                    <button className={style.closeButton} onClick={() => setModalData({isOpen: false})}>
                        <FontAwesomeIcon icon={faTimes} size="lg" color="#CF1313"/>
                    </button>
                </div>
                <div >
                    <input className={style.inputBox} type='text'  onChange={ e => setKeyword(e.target.value)}  />
                </div>    
                
                <div className={style.modalBody}>
                    <div className={style.menu}>
                        <div className={style.codeMenu}>질병코드</div>
                        <div className={style.nameMenu}> 병명</div>
                    </div>
                    <div className={style.lists}>
                        {

                        }
                        {
                            
                            diseases
                                .filter(disease => disease.name.indexOf(keyword) !== -1)
                                .map(disease => {
                                    return (
                                        <div className={style.list} onClick={ () => {
                                                if(presDiseases.includes(disease)){
                                                    alert('이미 선택된 질병입니다');
                                                } else{
                                                    setModalData({isOpen: false});
                                                    disease.diseaseNo = disease.no;
                                                    delete disease.no;
                                                    setPresDiseases([...presDiseases, disease]);
                                                }}}>
                                            <div className={style.code}>{`${disease.code}`}</div>
                                            <div className={style.name}>{`${disease.name}`}</div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default disease;