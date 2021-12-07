import React, { useEffect, useState } from 'react';
import patientList from './patientList';

const patient = () => {
    let isFetching = false;
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async(patient) => {
        if(isFetching){
            return;
        }

        try {
            const response = await fetch(`/api`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(patient)
            });

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            if(json.result !== 'success') {
                throw json.message;
            }

            setPatients([json.data, ...patients]);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id='patientView'>
            <patientList />
        </div>
    );
};

export default patient;