import React, {useState, useEffect} from 'react';
import MedicineInfo from './MedicineInfo';
import MedicineSearch from './MedicineSearch';

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
    
    return (
        <div>
            <h1>관리자 약품 리스트</h1>
            <MedicineSearch  keyword={keyword} callback={notifyKeywordChanged}  />
            <div>
            {
            /*
            <form method='post' onSubmit={push}>
                <input type='text' onChange={codeChange} placeholder='질병 코드'/>
                <input type='text' onChange={nameChange} placeholder='질병 명'/>
                <input type='text' onChange={engNameChange} placeholder='질병 명 (영문)'/>
                <input type="submit" value="질병 추가" />
            </form>
            */
            }
            <div>
                <label>의약품 코드 </label>
                <label>의약품 명 </label>
            </div>
            {
                medicines
                    .filter(medicine => medicine.name.indexOf(keyword) !== -1 || medicine.code.indexOf(keyword) !== -1)
                    .map(medicine => {
                        return (
                            <div>
                                <div onClick={() => setNo(medicine.no)}>
                                    <label>{`${medicine.no}`} </label>
                                    <label>{`${medicine.code}`} </label>
                                    <label>{`${medicine.name}`} </label>
                                </div>
                            </div>
                        )
            })
            }
        </div>
        <div>
            <MedicineInfo no={no}/>
        </div>
    </div>
    
    );
};

export default MedicineMain;