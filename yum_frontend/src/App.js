import * as React from 'react';
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
import DoctorMain from './doctor/DoctorMain';
import Update from './Main/Update';
import Message from './nurseModal';
import NurseMain from './nurse/main/Main';
import Order from './nurse/Order';
import Reservation from './nurse/Reservation';
import PatientList from './nurse/patientList/PatientList';

const App = () => {
    return (
            <Routes>
                <Route exact path='/' element={<Main />}/>
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
                <Route path='/doctor' element={<DoctorMain />}/>
                <Route path='/update' element={<Update />} />
                <Route path='/MeMe' element={<Message />} />
                <Route path='/nurse' element={<NurseMain />}/>
                <Route path='/nurse/patients' element={<PatientList />}/>
                <Route path='/nurse/order' element={<Order />}/>
                <Route path='/nurse/reservation' element={<Reservation />}/>
            </Routes>
    );
};

export default App;