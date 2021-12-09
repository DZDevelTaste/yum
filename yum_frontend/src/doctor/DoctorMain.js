import React from 'react';
import Diagnosis from './diagnosis/Diagnosis';
import Patient from './patient/Patient';

const App = () => {
    return (
        <div id='body'>
            <div id='patient'>
                <Patient />
            </div>
            {/* <div id='diagnosis'>
                <Diagnosis />
            </div> */}
        </div>
    );
};

export default App;