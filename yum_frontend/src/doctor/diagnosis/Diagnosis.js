import React from 'react';
import Clinic from './Clinic';
import Disease from './Disease';
import Memo from './Memo';

const diagnosis = () => {
    return (
        <div>
            <form action='/do/no/post' method='POST'>
                <Disease />
                <Clinic />
                <Memo />
            </form>

        </div>
    );
};

export default diagnosis;