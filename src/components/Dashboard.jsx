import { useMsal } from '@azure/msal-react';
import React, { useState, useEffect } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { GetEmployee } from '../data/employee';
import Cases from './Cases';


const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [ graphData, setGraphData ] = useState(null)
    const [ employee, setEmployee ] = useState({})

    const name = accounts[0] && accounts[0].name

    useEffect(async () => {
        async function FecthEmployee() {
            const hsEmployee = await GetEmployee(accounts[0].username)
            setEmployee(hsEmployee.value[0])
        }
        FecthEmployee()
    }, [])
    
    return (
        <>
            <h4>Hey! {name}</h4>
            <p>Welcome to the new Health & Safety Reporting App! Where you can submit new cases and sign any policy documents.</p>
            <div className="mt-5">
            <Tabs defaultActiveKey="cases" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="cases" title="Cases">
                    <Cases employee={employee}/>
                </Tab>
                <Tab eventKey="myTeam" title="My Team">
                    <p>Testing</p>
                </Tab>
            </Tabs>
            </div>
            {/*  Open Cases  */}
            {/*  Open Policy Document Responses  */}
        </>
    )
}

export default ProfileContent