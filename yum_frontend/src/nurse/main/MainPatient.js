import React, { Fragment, useRef, useState } from 'react';
import Modal from 'react-modal';
// import '../../assets/scss/Content.scss';
import main from '../../assets/scss/nurse/Main.scss';

import modalStyles from '../../assets/scss/nurse/Modal.scss';
import DetailInfo from './DetailInfo';
import Receive from './receive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import { faCheck, faDonate, faTimes } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('body');

const MainPatient = ({order, setUpdateState, setUpdateList, descForm, setDescForm, callback}) => {
    library.add(far);
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
    const updateState = async (currentState) => {
        if(currentState === order.orderstateNo) {
            setModalData(Object.assign({}, modalData, {kind: 'state', isOpen: false}));
            return;
        }

        if(!window.confirm(`${order.patientVo.name}님의 진료상태를 변경하겠습니까?`)){
            setModalData(Object.assign({}, modalData, {kind: 'state', isOpen: false}));
            return;
        }
        try {
            // console.log(modalInnerRef.current.parentNode)
            let updateOrder = {};
            updateOrder.no = order.no;
            updateOrder.orderstateNo = currentState;

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
            callback({patient: order.patientVo, kind: 'state'});
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
            callback({patient: order.patientVo, kind: 'delete'});
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

    const sendMessage = async (order) => {
        try {
            const response = await fetch('/message/api2', {
                method: 'post',
                mode: 'cors',  
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "patientName": order.patientVo.name,
                    "from": "nurse",
                    "to": "doctor",
                    "state": "start",
                    "order": order
                  })
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

        } catch (error) { 
            console.error(error);
        }
    }


    return (
        <Fragment>
            <tr className={main.OrderPatientList}>
                <td className={main.date}>{order.date}</td>
                <td className={main.name}>{order.patientVo.name}</td>
                <td className={main.age}>{order.patientVo.age}</td>
                {
                    (descForm.no === order.no && descForm.type === 'input' && (order.orderstateNo === 1 || order.orderstateNo === 2)) 
                    ? (<td className={main.desc}>
                        <input 
                            type='text' 
                            value={updateDesc} 
                            onChange={e => setUpdateDesc(e.target.value)}/>
                        <button onClick={() => updateDescEvent()}><FontAwesomeIcon icon={faCheck}/></button>
                    </td>)
                    : <td 
                        className={`${main.desc} ${(order.orderstateNo === 1 || order.orderstateNo === 2) ? main.changeOk : ''}`}
                        onClick={() => setDescForm(Object.assign({}, descForm, {no: order.no, type: 'input'}))}>
                        {(order.desc === '' || order.desc === null ? '-' : order.desc)}
                    </td>
                }
                
                <td
                    className={`${main.state} 
                        ${order.state === '진료중' ? main.treatment
                            : order.state === '예약' ? main.reservation
                            : order.state === '수납대기' ? main.waiting
                            : order.state === '완료' ? main.finish
                            : ''}`}
                    onClick={stateClickEvent}>
                    {order.state}
                </td>
                <td className={main.detailInfo}>
                    <button
                        className={main.detailInfoBtn}
                        onClick={() => setModalData(Object.assign({}, modalData, {kind: 'detailInfo', isOpen: true}))}>
                        <FontAwesomeIcon icon={["far", "user"]} size="lg"/>
                    </button>
                </td>
                <td className={main.cancle}>
                {
                    order.orderstateNo === 1 || order.orderstateNo === 2 ? 
                        <button
                            className={main.cancleBtn}
                            onClick={cancleEvent}>
                                <FontAwesomeIcon icon={faTimes} size="lg" color="#CF1313"/>
                        </button>
                        : null
                }
                </td>
                <td className={main.receive}>
                {
                    order.orderstateNo === 4
                        ? <button 
                            className={main.receiveBtn}
                            onClick={() => setModalData(Object.assign({}, modalData, {kind: 'receive', isOpen: true}))}
                            >
                            <FontAwesomeIcon icon={faDonate} size="lg" />
                                
                        </button>
                        : null
                }
                </td>
            </tr>
            
            <Modal
                className={
                    modalData.kind === 'state' ? modalStyles.StateModal : 
                    modalData.kind === 'detailInfo' ? modalStyles.DetailInfoModal :
                    modalData.kind === 'receive' ? modalStyles.ReceiveModal : ''}
                overlayClassName={modalStyles.Overlay}
                onRequestClose={ () => setModalData({isOpen: false})}
                isOpen={modalData.isOpen}>
                    {
                        modalData.kind === 'state' ? (
                            <ul ref={modalInnerRef}>
                                <li onClick={() => updateState(1)}>예약</li>
                                <li onClick={() => updateState(2)}>진료대기</li>
                                <li onClick={() => {updateState(3); sendMessage(order);}}>진료중</li>
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
                                setUpdateState={setUpdateState}
                                callback={callback}/>
                        : ''
                    }
            </Modal>
        </Fragment>
    );
};

export default MainPatient;