import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const disease = () => {
    const [modalData, setModalData] = useState({isOpen: false})
    const [diseases, setDiseases] = useState([]);
    const [keyword, setKeyword] = useState('');
    var presDiseases = [];

    const divStyle ={
        display: 'inline-block',
        border: '1px solid black',
        width: 400,
        height: 300,
        float: 'left',
        clear: 'both'
    }

    useEffect(() => {
        fetchDisease();
    }, [keyword])

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

            console.log(json.data)
            setDiseases([...json.data,...diseases]);
            

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div style={divStyle}>
            <span>병명 </span>
            <input type='text' onClick={() => setModalData({isOpen: true})} />
            <br />
            <div>
                <div>
                    질병 코드 병명
                </div>
            </div>
            <div>
                {
                    presDiseases.map(presDisease => {
                        return(
                            <>
                                <span>${presDisease.code}</span>
                            </>
                        )
                    })
                }
            </div>
            <div>
                증상
                <input type='text' />
            </div>
            <Modal isOpen={modalData.isOpen} 
                ariaHideApp={false} 
                overlayClassName="overlay"
                style={{position: 'absolute', top: '50%', left: '50%', transform: 'traslate(-50%, -50%)'}, {content: {width: 450, height: 250}}}>
                
                <div>병명 <button onClick={() => setModalData({isOpen: false})}>X</button></div>
                <div><input type='text'  onChange={ e => setKeyword(e.target.value)}  /></div>
                
                <div>
                    <div>
                        <div>질병코드 병명</div>
                        <div>
                            {
                                diseases
                                    .filter(disease => disease.name.indexOf(keyword) !== -1 || disease.code.indexOf(keyword) !== -1 || disease.engName.indexOf(keyword) !== -1)
                                    .map(disease => {
                                        return (
                                            <div onClick={ () => {
                                                setModalData({isOpen: false},
                                                    presDiseases.push(disease))}}>
                                                <label>{`${disease.code}`}</label>
                                                <label>{`${disease.name}`}</label>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        {/* 주형이 코드 받아오자 */}
                        
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default disease;