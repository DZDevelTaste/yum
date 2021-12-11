import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import './scss/styles.scss';
import './scss/style1.scss';
import './scss/style2.scss';

const Schedule = () => {
  const [modalData, setModalData] = useState({isOpen: false})
  const [schedules, setSchedules] = useState([]);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const no = 16;
  const i = 0;
  const titleValueChange = (e) => {
    setTitle(e.target.value);
  }
  const startValueChange = (e) => {
    setStart(e.target.value);
  }
  const endValueChange = (e) => {
    setEnd(e.target.value);
  }
 
  let MySchedule = {
      title: title,
      start: start,
      end: end,
      userNo: no
    }

  useEffect(() => {
      fetchSchedule();
  }, []);

  const fetchSchedule = async() => {

      try {
          const response = await fetch('http://localhost:8080/api/schedule', {
              method: 'get',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: null
          });

          if(!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
          }

          const json = await response.json();

          console.log(json.data)

          setSchedules([...json.data,...schedules]);
          
      } catch (error) {
          console.error(error);
      }
  }
  const pushSchedule = (e) => {
    console.log(typeof no);
    e.preventDefault();
    alert("휴가 등록이 완료되었습니다.");
    fetchScheduleAdd();
  }
  const fetchScheduleAdd = async() => {
    try {
        const response = await fetch(`http://localhost:8080/api/schedule/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(MySchedule)
        });
        
        if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        
        location.href='/schedule';
    } catch (error) {
        console.error(error);
    }
  }
  const titleChange = () => {
    var title1 = document.getElementById('title').value;
    var title2 = document.getElementById('title1').value;

    if(title2 == 1) {
        document.getElementById('title').disabled = false;
        document.getElementById('title').value='';
        setTitle(document.getElementById('title').value);
    } else {
        document.getElementById('title').disabled = true;
        document.getElementById('title').value=title2;
        setTitle(document.getElementById('title').value);
    }
};
  return (
    <div className="App">
      <FullCalendar 
        themeSystem="themeSystem"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
        initialView="dayGridMonth" 
        customButtons={{
          new: {
            text: 'new',
            click: () => console.log('new event')
          },
        }}
        events={schedules}
        eventColor="black"
        editable={true}
        nowIndicator
        dateClick={() => setModalData({isOpen: true})}
        eventClick={(e) => console.log(e.event.id)}/>
        <Modal isOpen={modalData.isOpen} style={{zIndex: '9999', position: 'absolute', top: '50%', left: '50%', transform: 'traslate(-50%, -50%)'}, {content: {width: 450, height: 250}}}>
          휴가 등록
          <button onClick={() => setModalData({isOpen: false})}>X</button>
            <form method='post' onSubmit={pushSchedule}>
              <div style={{zIndex: '9999'}}>
                  <input type="text" id="title" name="title" onChange={titleValueChange}/>
                  <label><select id="title1" name="title1" onChange={titleChange}>
                      <option value="1">직접입력</option>
                      <option value="병가">병가</option>
                      <option value="휴가">휴가</option>
                      <option value="연차">연차</option>
                      <option value="공가">공가</option>
                      <option value="백신 휴가">백신휴가</option>
                  </select></label>
                  <br></br>
                  <label><input type='date' value={start} onChange={startValueChange}/>시작일</label>
                  <br></br>
                  <label><input type='date' value={end} onChange={endValueChange}/>종료일</label>
              </div>
              <input type="submit" value="등록" />
            </form>
        </Modal>
    </div>
   
      
  );
}

export default Schedule;