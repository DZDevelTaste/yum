import React from 'react';

const memo = () => {

    const divStyle ={
        display: 'inline-block',
        border: '1px solid black',
        width: 500,
        height: 300,
        float: 'left'
    }

    return (
        <div style={divStyle}>
            진료 메모
            <input type='text'/>
            <input type='submit' value='진료 완료'/>
        </div>
    );
};

export default memo;