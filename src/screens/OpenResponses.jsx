import React, { useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useEmployee, useEmployeeFetch } from '../context/EmployeeContext';

import PolicyResponses from '../components/PolicyResponses';
import { Container } from 'react-bootstrap';

const OpenResponses = () => {
    const { instance, accounts } = useMsal();
    const employee = useEmployee()
    const fetchEmployee = useEmployeeFetch()

    useEffect(() => {
        fetchEmployee(accounts[0].username)
    }, [])

    return (
        <>
            <AuthenticatedTemplate>
                <h4>Open Responses</h4>
                <p>Here are your open Policy Repsonses that will need to be signed. Clicking through to each one will show you what documents 
                    you need to read and the ability to update confirming you have read the document.</p>
                {employee && <PolicyResponses employee={employee}/>}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5>Please sign in to get started.</h5>
            </UnauthenticatedTemplate> 
        </>
    )
}

export default OpenResponses