import { useMsal } from '@azure/msal-react';
import React, { useEffect } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEmployee, useEmployeeFetch } from '../context/EmployeeContext';

import hsImg from "../assets/hs.svg"


const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const name = accounts[0] && accounts[0].name
    const employee = useEmployee()
    const fetchEmployee = useEmployeeFetch()

    useEffect(() => {
        fetchEmployee(accounts[0].username)
    }, [])
    

    return (
        <>
            <header>
                <h4>Hey! {name}</h4>
                <p>Welcome to the new Health & Safety Reporting App! <br/> Where you can submit new cases and sign any policy documents.</p>
                <div className='cta'>
                    <LinkContainer to={`/cases-new`}>
                        <Button variant="primary">Create New Case</Button>
                    </LinkContainer>
                    <LinkContainer to={`/cases-new`}>
                        <Button variant="link">View Documents</Button>
                    </LinkContainer>
                </div>
                <img src={hsImg} alt="" />
            </header>
            

            {/* <div className="mt-5">
            <Tabs defaultActiveKey="cases" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="cases" title="My Cases">
                    {employee && <Cases employee={employee}/>}
                </Tab>
                <Tab eventKey="documents" title="My Open Documents">
                    {employee && <PolicyResponses employee={employee}/>}
                </Tab>
                <Tab eventKey="myTeam" title="My Team">
                    <p>If current employee is a manager they can see their teams cases here</p>
                </Tab>
            </Tabs>
            </div> */}
        </>
    )
}

export default ProfileContent