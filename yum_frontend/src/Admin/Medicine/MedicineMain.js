import React, {useState, useEffect} from 'react';
import MedicineInfo from './MedicineInfo';
import MedicineSearch from './MedicineSearch';
import SiteLayout from '../../layout/SiteLayout';
import style from '../../assets/scss/medicine/MedicineMain.scss';
import XLSX from 'xlsx';
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
            const response = await fetch('http://localhost:8080/api/admin/medicine', {
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
    return (
        <SiteLayout> 
        <div className={style.wangbody}>
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

export default MedicineMain;