import React, { useEffect, useState } from 'react'; 
import Modal from 'react-modal';
import style from './assets/scss/component/nurseModal/nurseModalMsg.scss'

function msg ( {patientName, from, to, timestamp, state, height, indexNum, setDeleteNum}) { 
    const [modalData, setModalData] = useState({isOpen: true})
    const [modalHeight, setModalHeight] = useState(0);
    const [modalState, setModalState] = useState('');
    const [modalIndexNum, setModalIndexNum] = useState();

    useEffect(() => {
        setModalState(state);
    }, [state])

    useEffect(() => {
        setModalHeight(height);
    }, [height])

    useEffect(() => {
        setModalIndexNum(indexNum);
    }, [indexNum])

    const callbackfunc = (indexNum) => {
        callback(indexNum);
    } 
    
    
    const bgColor = (state, height) => {
        if(state == 'start'){
            return {content: {background: 'rgba(101, 153, 255, 0.2)', top: (90 - height) + '%', width: 250, height: 120}}
        } else {
            return {content: {background: 'rgba(253, 132, 21, 0.2)', top: (90 - height) + '%',width: 250, height: 120}}
        }
    }

    return ( 
        <div>
            <Modal 
                isOpen={modalData.isOpen} 
                ariaHideApp={false} 
                shouldCloseOnOverlayClick={ true }
                overlayClassName="overlay"
                className={style.modal}
                style={bgColor(modalState, modalHeight)}>
                    <div className={style.head}>
                        <div className={style.modalTitle}>{state == 'start' ? '진료 시작' : '진료 완료'}</div>
                        <button className={style.closeBtn} onClick={() => {
                            // setModalData({isOpen: false})
                            setDeleteNum(modalIndexNum);
                        }}>
                            X
                        </button>
                    </div>
                    {
                        state == 'start' ?
                        <div className={style.modalBody}>
                            {patientName + '님 진료를  시작합니다. 진료실로 보내주세요'}
                        </div>
                        :
                        <div className={style.modalBody}>
                            {patientName + ' 님 진료가 끝났습니다. 수납해주세요'}
                        </div>    
                    }
                    

                    {/* <div className={style.modalBody}>
                        {
                            state == 'start' ? 
                            patientName + '님 진료를  시작합니다. 진료실로 보내주세요' : 
                            patientName + ' 님 진료가 끝났습니다. 수납해주세요'
                        }
                    </div> */}
                    
            </Modal>
        </div>
    );
} 

export default msg;