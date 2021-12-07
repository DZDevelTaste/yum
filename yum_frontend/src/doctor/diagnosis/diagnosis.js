import React from 'react';
import clinic from './clinic';
import disease from './disease';
import memo from './memo';

const diagnosis = () => {
    return (
        <div>
            <form action='/do/no/post' method='POST'>
                {disease}
                {clinic}
                {memo}
            </form>

        </div>
    );
};

export default diagnosis;