import React, { useState } from 'react';
import main from '../assets/scss/Main.scss';
import SiteLayout from '../layout/SiteLayout';
import MainList from './MainList';


const Main = () => {
    const [currentState, setCurrentState] = useState(0);
    const stateArray = ['전체', '예약', '진료대기', '진료중', '수납대기', '완료'];

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
            <div className='orderListBox'>
                <MainList
                    currentState={currentState}/>
            </div>
        </SiteLayout>
    );
};

export default Main;