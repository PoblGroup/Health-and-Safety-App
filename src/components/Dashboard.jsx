import { useMsal } from '@azure/msal-react';
import React, { useState, useEffect } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { GetEmployee } from '../data/employee';
import Cases from './Cases';


const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [ graphData, setGraphData ] = useState(null)
    const [ employee, setEmployee ] = useState({})

    const name = accounts[0] && accounts[0].name

    useEffect(() => {
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
            <div className="mt-4">
                <LinkContainer to={`/event-new`}>
                    <Button variant="primary">Create New Case</Button>
                </LinkContainer>
                <LinkContainer to="#Documents">
                    <Button variant="link">View Documents</Button>
                </LinkContainer>
            </div>
            <div className="mt-5">
            <Tabs defaultActiveKey="cases" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="cases" title="My Cases & Documents">
                    <Cases employee={employee}/>
                    {/*  Open Policy Document Responses  */}
                </Tab>
                <Tab eventKey="myTeam" title="My Team">
                    <p>If current employee is a manager they can see their teams cases here</p>
                </Tab>
            </Tabs>
            </div>
        </>
    )
}

export default ProfileContent