import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import '../assets/scss/schedule/styles.scss';
import '../assets/scss/schedule/style1.scss';
import '../assets/scss/schedule/style2.scss';
import style from '../assets/scss/schedule/scheduleModal.scss'
import moment from 'moment';
import SiteLayout from '../layout/SiteLayout';
import '../assets/scss/Content.scss';

const Schedule = () => {
  const [id, setId] = useState('');
  const [scheduleVo, setScheduleVo] = useState([]);
  const [schedule1Vo, setSchedule1Vo] = useState({});
  const [modalData, setModalData] = useState({isOpen: false});
  const [modal1Data, setModal1Data] = useState({isOpen: false});
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const nowTime = moment().format('YYYY-MM-DD');
  const [userNo, setUserNo] =useState('');
  const no = parseInt(sessionStorage.getItem("no"));
  const name = sessionStorage.getItem("name");
  
  useEffect(() => {
      setTitle(schedule1Vo ? schedule1Vo.title : '')
      setStart(schedule1Vo ? schedule1Vo.start : '')
      setEnd(schedule1Vo ? schedule1Vo.end : '')
  }, [schedule1Vo])
  
  let MySchedule = {
      id: id,
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

          setScheduleVo([...json.data,...scheduleVo]);

      } catch (error) {
          console.error(error);
      }
  }
 
  const selectScheduler = async(id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/schedule/id`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({id : id})
        });

        if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        setId(json.data.id);
        setUserNo(json.data.userNo);
        setSchedule1Vo(json.data);
    } catch (error) {
        console.error(error);
    }
}
  const pushSchedule = (e) => {
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
  
  const update = (e) => {
    e.preventDefault();
    alert("수정 되었습니다.");
    fetchUpdate();
  }
  const fetchUpdate = async() => {
      try {
          const response = await fetch('http://localhost:8080/api/schedule/update', {
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
  const scheduleDelete = (e) => {
    e.preventDefault();
    alert("삭제 되었습니다.");
    fetchdelete();
}
const fetchdelete = async() => {
    try {
        const response = await fetch('http://localhost:8080/api/schedule/delete', {
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

        location.href= '/schedule';
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
    } else {
        document.getElementById('title').disabled = true;
        document.getElementById('title').value=title2;
        setTitle(title2);
    }
};

  return (
      <SiteLayout>
        <div className={style.addBtn}>
            <input type="button" value="등록" onClick={(e) => {setModalData({isOpen: true})}} />
        </div>
        <div>
            <FullCalendar 
            themeSystem="themeSystem"
            headerToolbar = {{
                start: '',
                center: 'title',   
                end: 'today prev,next'
            }}
            plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin]} 
            initialView="dayGridMonth" 
            customButtons={{
            new: {
                text: 'new',
                click: () => console.log('new event')
            },
            }}
            selectable= "true"
            events={scheduleVo}
            eventBackgroundColor={'#6599FF'}
            locale="ko"
            nowIndicator
            dateClick={(e) => {setStart(e.dateStr > nowTime ? e.dateStr : nowTime); setEnd(e.dateStr > nowTime ? e.dateStr : nowTime); setModalData({isOpen: true})} }
            eventClick={(e) => {
                selectScheduler(parseInt(e.event.id));
                setModal1Data({isOpen: no == userNo ? true : false});
            } }/>
            <Modal className={style.updateModal} isOpen={modal1Data.isOpen} style={{zIndex: '9999', position: 'absolute', top: '50%', left: '50%', transform: 'traslate(-50%, -50%)'}, {content: {width: 450, height: 250}}}>
            <span className={style.vacation}>휴가 수정</span>
            <button className={style.Xbtn} onClick={() => setModal1Data({isOpen: false})}>X</button>
                <form method='post' onSubmit={update}>
                <div className={style.body} style={{zIndex: '9999'}}>
                    <div className={style.name}>
                        <span>신청자</span>
                        <input type="text" value={`${schedule1Vo.name}`} disabled/>
                    </div>
                    <div className={style.title}>
                        <span>신청 사유</span>
                        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        <select id="title1" name="title1" onChange={titleChange}>
                            <option value="1">직접입력</option>
                            <option value="병가">병가</option>
                            <option value="휴가">휴가</option>
                            <option value="연차">연차</option>
                            <option value="공가">공가</option>
                            <option value="백신 휴가">백신휴가</option>
                        </select>
                    </div>
                    <div className={style.calendar}>
                            <span>신청 날짜</span>
                            <input type='date' className={style.start} min={nowTime}  defaultValue={`${schedule1Vo.start}`} onChange={(e) => setStart(e.target.value)}/>
                            <input type='date' className={style.end} min={nowTime} defaultValue={`${schedule1Vo.end}`} onChange={(e) => setEnd(e.target.value)}/>
                    </div>
                </div>
                <div className={style.btn}>
                    <input className={style.deleteBtn}type="button" value="삭제" onClick={scheduleDelete} />
                    <input type="submit" value="수정" />
                </div>
                </form>
            </Modal> 
            <Modal className={style.addModal} isOpen={modalData.isOpen} style={{zIndex: '9999', position: 'absolute', top: '50%', left: '50%', transform: 'traslate(-50%, -50%)'}, {content: {width: 450, height: 250}}}>
            <span className={style.vacation}>휴가 등록</span>
            <button className={style.Xbtn}onClick={() => setModalData({isOpen: false})}>X</button>
                <form method='post' onSubmit={pushSchedule}>
                <div className={style.body} style={{zIndex: '9999'}}>
                    <div className={style.name}>
                    <span>신청자</span>
                    <input type="text" value={name} disabled/>
                    </div>
                    <div className={style.title}>
                        <span>신청 사유</span>
                    <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} required/>
                    <select id="title1" name="title1" onChange={titleChange}>
                        <option value="1">직접입력</option>
                        <option value="병가">병가</option>
                        <option value="휴가">휴가</option>
                        <option value="연차">연차</option>
                        <option value="공가">공가</option>
                        <option value="백신 휴가">백신휴가</option>
                    </select>
                    </div>
                    <div className={style.calendar}>
                        <span>신청 날짜</span>
                        <input type='date' className={style.start} min={nowTime} value={start} onChange={(e) => setStart(e.target.value)}/>
                        <input type='date' className={style.end} min={nowTime} value={end} onChange={(e) => setEnd(e.target.value)}/>
                    </div>
                </div>
                <input type="submit" value="등록" />
                </form>
            </Modal>
        </div>
    </SiteLayout>
  );
}

export default Schedule;