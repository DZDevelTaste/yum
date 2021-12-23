import React, { useEffect, useState } from 'react';
import moment from 'moment';

const time = () => {
    const Timer = ['2021-12-14 09:00','2021-12-14 11:00', '2021-12-14 10:00','2021-12-15 09:30','2021-12-15 10:30','2021-12-15 14:30', '2021-12-16 11:30', '2021-12-17 15:30'];
    const minDate = moment().format('YYYY-MM-DD');
    const [dateForm, setDateForm] = useState(minDate);
    const [timeForm, setTimeForm] = useState('09:00');
    const [chk, setChk] = useState('');
    var datech = [];

    useEffect(() => {
        disabledBtn(timeForm, dateForm);
    },[dateForm, timeForm])

    const disabledBtn = (timeForm, dateForm) => {
        for(let i=0; i<Timer.length; i++){
            datech[i] = Timer[i]
            if(datech[i].indexOf(dateForm) === 0) {
                setChk(datech);
            } 
        }
    }
    
    return (
        <div>
            <input type='date' min={minDate} defaultValue={minDate} onChange={(e) => {setDateForm(e.target.value)}}/>
                <div>
                    <div>
                        <label>AM</label>
                        <div>
                            <button value='09:00' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 09:00`) !== -1 ? true : false}>09:00</button>
                            <button value='09:30' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 09:30`) !== -1 ? true : false}>09:30</button>
                            <button value='10:00' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 10:00`) !== -1 ? true : false}>10:00</button>
                            <button value='10:30' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 10:30`) !== -1 ? true : false}>10:30</button>
                            <button value='11:00' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 11:00`) !== -1 ? true : false}>11:00</button>
                            <button value='11:30' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 11:30`) !== -1 ? true : false}>11:30</button>
                        </div>
                    </div>
                    <div>
                        <label>PM</label>
                        <div>
                            <button value='13:00' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 13:00`) !== -1 ? true : false}>13:00</button>
                            <button value='13:30' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 13:30`) !== -1 ? true : false}>13:30</button>
                            <button value='14:00' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 14:00`) !== -1 ? true : false}>14:00</button>
                            <button value='14:30' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 14:30`) !== -1 ? true : false}>14:30</button>
                            <button value='15:00' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 15:00`) !== -1 ? true : false}>15:00</button>
                            <button value='15:30' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 15:30`) !== -1 ? true : false}>15:30</button>
                            <button value='16:00' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 16:00`) !== -1 ? true : false}>16:00</button>
                            <button value='16:30' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 16:30`) !== -1 ? true : false}>16:30</button>
                            <button value='17:00' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 17:00`) !== -1 ? true : false}>17:00</button>
                            <button value='17:30' onClick={(e) => setTimeForm(e.target.value)} disabled={ chk.indexOf(`${dateForm} 17:30`) !== -1 ? true : false}>17:30</button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default time;