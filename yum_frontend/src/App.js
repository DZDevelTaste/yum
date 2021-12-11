import React from 'react';
import {Routes, Route} from 'react-router';

import Main from './nurse/Main';
import Order from './nurse/Order';
import Reservation from './nurse/Reservation';
import PatientList from './nurse/PatientList';

const App = () => {
    return (
        <Routes>
            <Route exact path='/nurse' element={<Main />}/>
            <Route path='/nurse/patients' element={<PatientList />}/>
            <Route path='/nurse/order' element={<Order />}/>
            <Route path='/nurse/reservation' element={<Reservation />}/>
        </Routes>
    );
};

export default App;