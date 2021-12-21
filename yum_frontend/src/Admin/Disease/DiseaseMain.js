import React, {useState, useEffect} from 'react';
import DiseaseSearch from './DiseaseSearch';
import SiteLayout from '../../layout/SiteLayout';
import style from '../../assets/scss/disease/DiseaseMain.scss';
import XLSX from 'xlsx';
const DiseaseMain = () => {
    const [diseases, setDiseases] = useState([]);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [engName, setEngName] = useState('');
    const [keyword, setKeyword] = useState('');
    
    const notifyKeywordChanged = (keyword) => {
        setKeyword(keyword);
    };

    let put = {
        code: code,
        name: name,
        engName: engName
    };

    const push = (e) => {
        e.preventDefault();
        alert("질병이 추가되었습니다." + put.code + put.name + put.engName);
        fetchadd();
        return true;
    };

    const fetchadd = async() => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/disease/add', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(put)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            console.log(json.data);

            location.href= '/admin/disease';
        } catch (error) {
            console.error(error);
        }
    }
   
    useEffect(() => {
        fetchDisease();
    }, []);

    const fetchDisease = async() => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/disease', {
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
            setDiseases([...json.data,...diseases]);
            

        } catch (error) {
            console.error(error);
        }
    }
    const getExcel = () => {
    const dataWS = XLSX.utils.json_to_sheet(diseases);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS, "nameData");
      XLSX.writeFile(wb, "YUM_Disease.xlsx");
    }

    return (
        <SiteLayout>
        <div className={style.wangbody}>
            <DiseaseSearch  keyword={keyword} callback={notifyKeywordChanged} />
                <div className={style.input}>
                <form method='post' onSubmit={push}>
                    <input type='text' className={style.inputCode} onChange={(e) => setCode(e.target.value)} placeholder='질병 코드'/>
                    <input type='text' className={style.inputName} onChange={(e) => setName(e.target.value)} placeholder='질병 명'/>
                    <input type='text' className={style.inputEngName} onChange={(e) => setEngName(e.target.value)} placeholder='질병 명 (영문)'/>
                    <input type="submit" value="질병 추가" />
                    <input type="button" className={style.excel} onClick={getExcel} value="엑셀"></input>
                </form>
                </div>
            <div className={style.titles}>
                <span className={style.code}>질병 코드</span>
                <span className={style.name}>질병 명</span>
                <span className={style.engName}>질병 명(영문)</span>
            </div>
            <div className={style.smallBody}>
                    {
                        diseases
                            .filter(disease => disease.name.indexOf(keyword) !== -1 || disease.code.indexOf(keyword) !== -1 || disease.engName.indexOf(keyword) !== -1)
                            .map(disease => {
                            return (
                                <div className={style.small}>
                                    <span className={style.smallCode}>{`${disease.code}`}</span>
                                    <span className={style.smallName}>{`${disease.name}`}</span>
                                    <span className={style.smallEngName}>{`${disease.engName}`}</span>
                                </div>
                            )
                    })
                    }
            </div>
        </div>
        </SiteLayout>
    );
};

export default DiseaseMain;