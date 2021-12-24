import React, {useState, useEffect} from 'react';
import MedicineInfo from './MedicineInfo';
import MedicineSearch from './MedicineSearch';
import SiteLayout from '../../layout/SiteLayout';
import style from '../../assets/scss/medicine/MedicineMain.scss';
import XLSX, { readFile } from 'xlsx';
const MedicineMain = () => {
    const [medicines, setMedicines] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [no, setNo] = useState(0);
    
    const notifyKeywordChanged = (keyword) => {
        setKeyword(keyword);
      };
      
    useEffect(() => {
        fetchMedicine();
    }, []);

    const fetchMedicine = async() => {

        try {
            const response = await fetch('/api/admin/medicine', {
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
            setMedicines([...json.data,...medicines]);
            

        } catch (error) {
            console.error(error);
        }
    }
    const getExcel = () => {
        const dataWS = XLSX.utils.json_to_sheet(medicines);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, dataWS, "nameData");
          XLSX.writeFile(wb, "YUM_Medicine.xlsx");
    }
    const setExcel = (e) => {
        var files = e.target.files; //input file 객체를 가져온다.
        var i,f;
        for (i = 0; i != files.length; ++i) {
            f = files[i];
            var reader = new FileReader(); //FileReader를 생성한다.         
            
            //성공적으로 읽기 동작이 완료된 경우 실행되는 이벤트 핸들러를 설정한다.
            reader.onload = function(e) {
            
               var data = e.target.result; //FileReader 결과 데이터(컨텐츠)를 가져온다.
     
               //바이너리 형태로 엑셀파일을 읽는다.
               var workbook = XLSX.read(data, {type: 'binary'});
               console.log(workbook)
               //엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다.
               workbook.SheetNames.forEach(function(item, index, array) {
                   const EXCEL_JSON = XLSX.utils.sheet_to_json(workbook.Sheets[item]);

               /*  const function1 = async() => {
                   try {
                    const response = await fetch('/api/admin/medicine/fileUpdate', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(EXCEL_JSON)
                    });
        
                    if(!response.ok) {
                        throw new Error(`${response.status} ${response.statusText}`);
                    }
        
                    const json = await response.json();
        
                    console.log(json.data)
        
                } catch (error) {
                    console.error(error);
                }
            } */
               });
               
            };
            
            //파일객체를 읽는다. 완료되면 원시 이진 데이터가 문자열로 포함됨.
            reader.readAsBinaryString(f);
           
        }
        
    }
    return (
        <SiteLayout> 
        <div className={style.wangbody}>
            <input type="file" onChange={(e) => setExcel(e)}/>
            <input type="button" className={style.excel} onClick={getExcel} value="엑셀"></input>
            <MedicineSearch  keyword={keyword} callback={notifyKeywordChanged}  />
            <div className={style.titles}>
                <span className={style.code}>의약품 코드 </span>
                <span className={style.name}>의약품 명 </span>
            </div>
            <div className={style.smallBody}>
            {
                medicines
                    .filter(medicine => medicine.name.indexOf(keyword) !== -1 || medicine.code.indexOf(keyword) !== -1)
                    .map(medicine => {
                        return (
                                <div className={style.small} onClick={() => setNo(medicine.no)}>
                                    <span className={style.MediCode}>{`${medicine.code}`}</span>
                                    <span className={style.MediName}>{`${medicine.name}`}</span>
                                </div>
                        )
            })
            }
            </div>
        </div>
        <div>
                <MedicineInfo no={no}/>
        </div>
    </SiteLayout>
    );
};

export default MedicineMain