import React, { useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useEmployee, useEmployeeFetch } from '../context/EmployeeContext';
import TeamCases from '../components/TeamCases';


const TeamScreen = () => {
    const { accounts } = useMsal();
    const employee = useEmployee()
    const fetchEmployee = useEmployeeFetch()

    useEffect(() => {
        fetchEmployee(accounts[0].username)
    }, [accounts, fetchEmployee])

    return (
        <>
            <AuthenticatedTemplate>
                <h4>My Team</h4>
                <p>Here you can see all your teams open cases.</p>
                {employee && <TeamCases employee={employee}/>}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5>Please sign in to get started.</h5>
            </UnauthenticatedTemplate> 
        </>
    )
}

export default TeamScreen