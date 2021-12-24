import React, { useState } from 'react';
import SiteLayout from '../../layout/SiteLayout';
import MainList from './MainList';

import main from '../../assets/scss/nurse/Main.scss';
import toast, { Toaster } from 'react-hot-toast';


const Main = () => {
    const [currentState, setCurrentState] = useState(0);
    const stateArray = ['전체', '예약', '진료대기', '진료중', '수납대기', '완료'];

    const NotifyToast = (data) => {
        toast.success(`${data.patient.name}님의 진료상태가 변경되었습니다.`);
    }
    return (
        <SiteLayout>
            <div className={main.stateBtn}>
                {
                    stateArray
                        .map((state, index) => {
                            return(
                                <button 
                                    key={index}
                                    className={currentState === index ? main.active : null} 
                                    value={index}
                                    onClick={() => setCurrentState(index)}>
                                    {state}
                                </button>
                            );
                        })
                }
            </div>
            <div className={main.MainContentBox}>
                <MainList
                    currentState={currentState}
                    callback={NotifyToast}/>
            </div>

            <Toaster/>
        </SiteLayout>
    );
};

export default Main;