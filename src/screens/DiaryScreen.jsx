import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { LinkContainer } from 'react-router-bootstrap';
import { useEmployee, useEmployeeFetch } from '../context/EmployeeContext';
import { GetDiaryEntries } from '../data/diaries';

const DiaryScreen = () => {
    const { instance, accounts } = useMsal();
    const employee = useEmployee()
    const fetchEmployee = useEmployeeFetch()

    const [entries, setEntries] = useState([])
    const [responsesError, setResponsesError] = useState(null)

    const currentEmployee = employee.employee.value[0]
    const manager = currentEmployee.pobl_employeeismanager

    useEffect(() => {
        fetchEmployee(accounts[0].username)
        async function FetchEntries() {
            
            if(currentEmployee.pobl_employeehsid != null) {
                const {error, data} = await GetDiaryEntries(currentEmployee.pobl_employeehsid)
                if(error) setResponsesError(error)
                if(data) setEntries(data)
                console.log(data)
            }
        }
        FetchEntries()
    }, [])

    // useEffect(() => {
        
    // }, [employee])

    return (
        <>
            <AuthenticatedTemplate>
                {manager ? 
                <>
                <h4>My Diary</h4>
                <p>Here you can see all your tasks as manager that need your attention.</p>
                <Table responsive hover className='mt-4'>
                    <thead>
                        <tr>
                            <th hidden>Id</th>
                            <th>Task</th>
                            <th>Due</th>
                            <th>Custom Task</th>
                            <th>Signed?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {responsesError && (
                            <tr>
                                <td hidden>0</td>
                                <td colSpan={6}>{responsesError}</td>
                            </tr>
                        )}
                        {entries && entries.map((e, index) => (
                            <tr key={index}>    
                                <td hidden>{e.id}</td>
                                <td>{e.taskName}</td>
                                <td><Moment date={e.due} format="dddd, MMMM Do YYYY" /></td>
                                <td>{e.custom}</td>
                                <td>{e.signed}</td>
                                <td><LinkContainer to={`/mydiary/entry/${e.id}`}><Button variant='light'>View</Button></LinkContainer></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </>
                : 
                <p>You are not a manager.</p>    
                }
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5>Please sign in to get started.</h5>
            </UnauthenticatedTemplate> 
        </>
    )
}

export default DiaryScreen