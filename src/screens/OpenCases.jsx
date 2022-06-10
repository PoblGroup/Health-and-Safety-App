import React, { useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useEmployee, useEmployeeFetch } from '../context/EmployeeContext';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import Cases from '../components/Cases';


const OpenCases = () => {
    const { accounts } = useMsal();
    const employee = useEmployee()
    const fetchEmployee = useEmployeeFetch()

    useEffect(() => {
        fetchEmployee(accounts[0].username)
    }, [accounts, fetchEmployee])

    return (
        <>
            <AuthenticatedTemplate>
                <h4>Open Cases</h4>
                <p>Below you can find all your open cases raised to Health & Safety.</p>
                <div className="mt-3">
                    <LinkContainer to={`/cases-new`}>
                        <Button variant="primary">Create New Case</Button>
                    </LinkContainer>
                </div>
                {employee && <Cases employee={employee}/>}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5>Please sign in to get started.</h5>
            </UnauthenticatedTemplate> 
        </>
    )
}

export default OpenCases