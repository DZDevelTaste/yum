import React, { useEffect, useState } from 'react';

const memo = ({callback}) => {
    const [Memo, setMemo] = useState('');     //value for insert

    const divStyle ={
        display: 'inline-block',
        border: '1px solid black',
        width: 500,
        height: 300,
        float: 'left'
    }

    useEffect(() => {
        callback(Memo);
    }, [Memo])

    return (
        <div style={divStyle}>
            증상 및 메모
            <textarea onChange={ e => setMemo(e.target.value)}></textarea>
        </div>
    );
};

export default memo;