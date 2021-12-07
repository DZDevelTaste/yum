import React from 'react';
import diagnosis from './diagnosis/diagnosis';
import patient from './patient/patient';

const App = () => {
    return (
        <div id='body'>
            <div id='patient'>
                <patient />
            </div>
            <div id='diagnosis'>
                <diagnosis />
            </div>
        </div>
    );
};

export default App;