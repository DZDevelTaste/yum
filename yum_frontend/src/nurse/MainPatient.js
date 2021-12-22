import React, { Fragment, useRef, useState } from 'react';
import Modal from 'react-modal';
import '../assets/scss/Content.scss';
import styles2 from '../assets/scss/OrderPatient.scss';
import modalStyles from '../assets/scss/Modal.scss';
import DetailInfo from './DetailInfo';
import Receive from './receive';


Modal.setAppElement('body');

const MainPatient = ({order, setUpdateState, setUpdateList, descForm, setDescForm}) => {
    const [updateDesc, setUpdateDesc] = useState(order.desc);
    const [modalData, setModalData] = useState({isOpen: false});
    const modalInnerRef = useRef(null);      // 모달 안의 ul useRef, Modal은 ref 적용 x

    
    /* 진료현황 클릭 시 실행 이벤트(모달 위치 조정 및 모달 띄우기) */
    const stateClickEvent = (e) => {
        if (order.orderstateNo === 4 || order.orderstateNo === 5){
            return;
        }
        // 사용자가 클릭한 위치
        let x = e.clientX;
        let y = e.clientY;

        setTimeout(() => {
            const modalDiv = modalInnerRef.current.parentNode;       // Modal(ul 상위에 있는 Div)
            
            // Modal 위치를 사용자가 클릭한 위치로 설정(Modal의 position은 absolute)
            modalDiv.style.top = y + "px";
            modalDiv.style.left = x + "px";
        }, 0);
        setModalData(Object.assign({}, modalData, {kind: 'state', isOpen: true}));
    } 

    /* 진료 현황 업데이트 */
    const updateState = async (selectOSN) => {
        if(selectOSN === order.orderstateNo) {
            setModalData(Object.assign({}, modalData, {kind: 'state', isOpen: false}));
            return;
        }
        try {
            // console.log(modalInnerRef.current.parentNode)
            let updateOrder = {};
            updateOrder.no = order.no;
            updateOrder.orderstateNo = selectOSN;

            // console.log(updateOrder);

            const response = await fetch('/api/nurse/updateState', {
                method: 'put',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(updateOrder)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const jsonResult = await response.json();
            
            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            // console.log(jsonResult.data);
            setModalData(Object.assign({}, modalData, {kind: 'state', isOpen: false}));
            setUpdateState(updateOrder);
        } catch (err) {
            console.error(err);
        }
    }

    /* 진료 취소 이벤트 */
    const cancleEvent = async () => {
        if(!window.confirm(`${order.patientVo.name}님의 접수를 취소 하시겠습니까?`)){
            return;
        }

        try {
            const response = await fetch(`/api/nurse/deleteOrder/${order.no}`, {
                method: 'delete',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const jsonResult = await response.json();

            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            setUpdateList({no: jsonResult.data.no, date:jsonResult.data.date, kind: 'delete'});
        } catch(err) {
            console.error(err);
        }
    }

    const updateDescEvent = async () => {
        if(updateDesc === order.desc) {
            setDescForm(Object.assign({}, descForm, {no: 0, type: 'text'}));
            return;
        }

        let orderVo = {};
        orderVo.no = order.no;
        orderVo.desc = updateDesc;

        try {
            const response = await fetch(`/api/nurse/updateDesc`, {
                method: 'put',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(orderVo)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const jsonResult = await response.json();

            if(jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            setUpdateList({no: jsonResult.data.no, desc:jsonResult.data.desc, kind: 'update'});
            setDescForm(Object.assign({}, descForm, {no: 0, type: 'text'}));
        } catch(err) {
            console.error(err);
        }
    }


    return (
        <Fragment>
            <tr className='OrderPatient' /* onClick={(e) => setUpdateState(patient.no)} */>
                <td className={styles2.date}>{order.date}</td>
                <td className={styles2.name}>{order.patientVo.name}</td>
                <td className={styles2.age}>{order.patientVo.age}</td>
                {
                    (descForm.no === order.no && descForm.type === 'input') 
                    ? (<td>
                        <input 
                            type='text' 
                            value={updateDesc} 
                            onChange={e => setUpdateDesc(e.target.value)}/>
                        <button onClick={() => updateDescEvent()}>확인</button>
                    </td>)
                    : <td 
                        className={styles2.desc}
                        onClick={() => setDescForm(Object.assign({}, descForm, {no: order.no, type: 'input'}))}>
                        {(order.desc === '' || order.desc === null ? '-' : order.desc)}
                    </td>
                }
                
                <td
                    className={`${styles2.state} 
                        ${order.state === '진료중' ? styles2.treatment
                            : order.state === '예약' ? styles2.reservation
                            : order.state === '수납대기' ? styles2.waiting
                            : order.state === '완료' ? styles2.finish
                            : ''}`}
                    onClick={stateClickEvent}>
                    {order.state}
                </td>
                <td className={styles2.detailInfo}>
                    <button
                        className={styles2.detailInfoBtn}
                        onClick={() => setModalData(Object.assign({}, modalData, {kind: 'detailInfo', isOpen: true}))}>
                        상세보기
                    </button>
                </td>
                <td className={styles2.cancle}>
                {
                    order.orderstateNo === 1 || order.orderstateNo === 2 ? 
                        <button
                            className={styles2.cancleBtn}
                            onClick={cancleEvent}>
                            접수취소
                        </button>
                        : null
                }
                </td>
                <td className={styles2.receive}>
                {
                    order.orderstateNo === 4
                        ? <button 
                            className={styles2.receiveBtn}
                            onClick={() => setModalData(Object.assign({}, modalData, {kind: 'receive', isOpen: true}))}
                            >수납</button>
                        : null
                }
                </td>
            </tr>
            
            <Modal
                className={
                    modalData.kind === 'state' ? modalStyles.StateModal : 
                    modalData.kind === 'detailInfo' ? modalStyles.DetailInfoModal :
                    modalData.kind === 'receive' ? modalStyles.ReceiveModal : ''}
                overlayClassName={styles2.Overlay}
                onRequestClose={ () => setModalData({isOpen: false})}
                isOpen={modalData.isOpen}>
                    {
                        modalData.kind === 'state' ? (
                            <ul ref={modalInnerRef}>
                                <li onClick={() => updateState(1)}>예약</li>
                                <li onClick={() => updateState(2)}>진료대기</li>
                                <li onClick={() => updateState(3)}>진료중</li>
                            </ul>
                        )
                        : modalData.kind === 'detailInfo' ?
                            <DetailInfo 
                                patientNo={order.patientVo.no}
                                setModalData={setModalData}/>
                        : modalData.kind === 'receive' ?
                            <Receive
                                orderNo={order.no}
                                setModalData={setModalData}
                                setUpdateState={setUpdateState}/>
                        : ''
                    }
            </Modal>
        </Fragment>
    );
};

export default MainPatient;