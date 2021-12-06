import React from 'react';
import clinic from './clinic';
import disease from './disease';
import memo from './memo';

const diagnosis = () => {
    return (
        <div>
            <disease />
            <clinic />
            <memo />
        </div>
    );
};

export default diagnosis;