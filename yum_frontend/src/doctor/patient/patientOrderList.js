import React, { useEffect, useState } from 'react';

const  patientOrderList = ({diagnosisList}) => {
    const [lists, setLists] = useState([]);
    
    useEffect(()=> {
        setLists(diagnosisList)
    }, [diagnosisList])
    
    return (
        <div>
             {
                lists.length > 0 ?
                    lists.map(list => {
                        return(<>
                            <p>
                                <div style={{display:'block', width: 175+'px', height: 25+'px', textAlign: 'center', float: 'left'}}>
                                    {list.date}
                                </div>
                                <div style={{display:'block', width: 175+'px', height: 25+'px', textAlign: 'center', float: 'left'}}>
                                    {list.name}
                                </div>
                                <div style={{display:'block', width: 175+'px', height: 25+'px', textAlign: 'center', float: 'left'}}>
                                    {list.presDiseaseList.map(presDisease => presDisease.name)}
                                </div>
                                <div style={{display:'block', width: 175+'px', height: 25+'px', textAlign: 'center', float: 'left'}}>
                                    {list.presMedicineList.map(presMedicine => presMedicine.name)} 
                                    {list.presClinicList.map(presClinic => presClinic.name)}
                                </div>
                            </p>
                        </> 
                        )
                    }):
                    <p style={{textAlign: 'center'}}><span>없음</span></p>
             }
         </div>
    );
};

export default patientOrderList;