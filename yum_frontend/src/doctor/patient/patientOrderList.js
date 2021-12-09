import React, { useEffect, useState } from 'react';

const patientOrderList = ({diagnosisList}) => {
    const [lists, setLists] = useState([]);
    
    useEffect(()=> {
        setLists(diagnosisList)
        console.log(lists)
    }, [diagnosisList])
    
    
    return (
        <div>
             {
                lists.length > 0 ?
                    lists.map(list => {
                        return(<>
                            <p>
                                <div style={{display:'block', width: 175+'px', height: 25+'px', textAlign: 'center', float: 'left'}}>{list.date}</div>
                                <div style={{display:'block', width: 175+'px', height: 25+'px', textAlign: 'center', float: 'left'}}>{list.userNo}</div>
                                <div style={{display:'block', width: 175+'px', height: 25+'px', textAlign: 'center', float: 'left'}}>{list.presDiseaseList.diseaseNo}</div>
                                <div style={{display:'block', width: 175+'px', height: 25+'px', textAlign: 'center', float: 'left'}}>{list.presMedicineList.medicineNo}, {list.presClinicList.Clinic}</div>
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