import React, {useState, useEffect} from 'react';
import DiseaseSearch from './DiseaseSearch';

const DiseaseMain = () => {
    const [diseases, setDiseases] = useState([]);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [engName, setEngName] = useState('');
    const [keyword, setKeyword] = useState('');
    
    const notifyKeywordChanged = (keyword) => {
        setKeyword(keyword);
      };

    const codeChange = (e) => {
        setCode(e.target.value);
    };
    const nameChange = (e) => {
        setName(e.target.value);
    };
    const engNameChange = (e) => {
        setEngName(e.target.value);
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


    return (
        <div>
            <h1>관리자 질병 리스트</h1>
            <DiseaseSearch  keyword={keyword} callback={notifyKeywordChanged} />
                <form method='post' onSubmit={push}>
                    <input type='text' onChange={codeChange} placeholder='질병 코드'/>
                    <input type='text' onChange={nameChange} placeholder='질병 명'/>
                    <input type='text' onChange={engNameChange} placeholder='질병 명 (영문)'/>
                    <input type="submit" value="질병 추가" />
                </form>
            <div>
                <label>질병 코드 </label>
                <label>질병 명 </label>
                <label>질병 명(영문)   </label>
            </div>
            <div>
                    {
                        diseases
                            .filter(disease => disease.name.indexOf(keyword) !== -1 || disease.code.indexOf(keyword) !== -1 || disease.engName.indexOf(keyword) !== -1)
                            .map(disease => {
                            return (
                                <div>
                                    <label>{`${disease.code}`}</label>
                                    <label>{`${disease.name}`}</label>
                                    <label>{`${disease.engName}`}</label>
                                </div>
                            )
                    })
                    }
            </div>
        </div>
    );
};

export default DiseaseMain;