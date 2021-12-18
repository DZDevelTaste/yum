import * as React from 'react';
import DoctorMain from './doctor/DoctorMain';
import Message1 from './message';
import Message2 from './message2';
// import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';

const App = () => {
    return (
            // <Router>
                <Routes>
                    <Route exact path='/' element={<DoctorMain />}/>
                    <Route path='/MeMe' element={<Message1 />} />
                    <Route path='/MeMe1' element={<Message2 />} />
                </Routes>
            // </Router>
    );
};

export default App;