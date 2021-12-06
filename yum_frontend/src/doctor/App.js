import React from 'react';
import patientList from './patientList';
import patientInfo from './patientInfo';
import patientPastOrder from './patientPastOrder';
import diagnosis from './diagnosis/diagnosis';

const App = () => {
    return (
        <div>
            {patientList}
            {patientInfo}
            {patientPastOrder}
            {diagnosis}
        </div>
    );
};

export default App;