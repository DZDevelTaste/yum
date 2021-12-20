import React, { useEffect, useState } from 'react';
import style from '../../assets/scss/component/doctor/diagnosis/Memo.scss';

const memo = ({callback}) => {
    const [Memo, setMemo] = useState('');     //value for insert

    useEffect(() => {
        callback(Memo);
    }, [Memo])

    return (
        <div className={style.memoBody} >
            <div className={style.head}>
                <span>
                    증상 및 메모
                </span>
                
            </div>
            <textarea onChange={ e => setMemo(e.target.value)}></textarea>
        </div>
    );
};

export default memo;