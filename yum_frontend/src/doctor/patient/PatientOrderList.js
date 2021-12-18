import React, { useEffect, useState } from 'react';
import style from '../../assets/scss/component/doctor/patient/PatientOrderList.scss';

const  patientOrderList = ({diagnosisList}) => {
    const [lists, setLists] = useState([]);
    
    useEffect(()=> {
        setLists(diagnosisList)
    }, [diagnosisList])
    
    return (
        <div className={style.lists}>
             {
                lists.length > 0 ?
                    lists.map(list => {
                        return(
                            <div className={style.pastOdList}>
                                <div className={style.dateAndName}>
                                    {list.date}
                                </div>
                                <div className={style.dateAndName} >
                                    {list.name}
                                </div>
                                <div className={style.disAndCli} >
                                    {list.presDiseaseList.map(presDisease => <div>- {presDisease.name}</div>)}
                                </div>
                                <div className={style.disAndCli}>
                                    {list.presMedicineList.map(presMedicine => <div>- {presMedicine.name}</div>)} 
                                    {list.presClinicList.map(presClinic => <div>- {presClinic.name}</div>)}
                                </div>
                            </div> 
                        )
                    }):
                    <div className={style.empty} >없음</div>
             }
         </div>
    );
};

export default patientOrderList;