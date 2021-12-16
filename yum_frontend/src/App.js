import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import Main from './Main/Main';
import Join from './Main/Join';
import SearchId from './Main/SearchId';
import SearchPw from './Main/SearchPw';
import SuccessId from './Main/SuccessId';
import SuccessPw from './Main/SuccessPw';
import AdminMain from './Admin/AdminMain';
import DiseaseMain from './Admin/Disease/DiseaseMain';
import MedicineMain from './Admin/Medicine/MedicineMain';
import MedicineInfo from './Admin/Medicine/MedicineInfo';
import Schedule from './Schedule/Schedule';
import Timer from './Timer';
import Nurse from './Nurse';
import Doctor from './Doctor';
import Update from './Main/Update';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/join' element={<Join />}/>
                <Route path='/searchId' element={<SearchId />}/>
                <Route path='/searchPw' element={<SearchPw />}/>
                <Route path='/successId/:no' element={<SuccessId />}/>
                <Route path='/successPw/:no' element={<SuccessPw />}/>
                <Route path='/update' element={<Update />}/>
                <Route path='/admin' element={<AdminMain />}/>
                <Route path='/admin/disease' element={<DiseaseMain />}/>
                <Route path='/admin/medicine' element={<MedicineMain />}/>
                <Route path='/admin/medicine1' element={<MedicineInfo />}/>
                <Route path='/Schedule' element={<Schedule />} />
                <Route path='/time' element={<Timer />} />
                <Route path='/nurse' element={<Nurse />} />
                <Route path='/doctor' element={<Doctor />} />
                <Route path='/update' element={<Update />} />
            </Routes>
        </Router>
    );
};

export default App;