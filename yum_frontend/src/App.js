import React from 'react';
import { Route, Router, Routes } from 'react-router';
import DoctorMain from './doctor/DoctorMain';

const App = () => {
    return (
            <Routes>
                <Route path='/' element={<DoctorMain />}/>
            </Routes>
    );
};

export default App;