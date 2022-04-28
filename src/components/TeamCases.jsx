import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { GetTeamCases } from '../data/cases'

const TeamCases = ({ employee }) => {
    const [teamCases, setTeamCases] = useState([])

    const currentEmployee = employee.employee.value[0]
    const manager = currentEmployee.pobl_employeeismanager

    useEffect(() => {
        async function FetchTeamCases() {
            if(currentEmployee.pobl_employeehsid != null) {
                let empCases = [];
                const cases = await GetTeamCases(currentEmployee.pobl_employeehsid)
                cases.map(c => {
                    if(c.events.length > 0) empCases.push(c)
                })
                console.log(empCases)
                setTeamCases(empCases)
            }
        }
        FetchTeamCases()
    }, [employee, currentEmployee.pobl_employeehsid])

    

    return (
        <>
            {manager ? 
            <Table responsive hover className='mt-4'>
                <thead>
                    <tr>
                        <th>Team Member</th>
                        <th>Case</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {teamCases && teamCases.map((c, index) => (
                        c.events.map((e, i) => (
                            <tr key={index}>    
                                <td width={200}>{c.employeeName}</td>
                                <td width={200}>{e.pobl_casename}</td>
                                <td>{e.pobl_description}</td>
                                <td width={200}>{e.pobl_actiontype}</td>
                                <td><LinkContainer to={`/myteam/cases/${e.pobl_eventid}`}><Button variant='light'>View</Button></LinkContainer></td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </Table>
            : 
            <p>You are not a manager.</p>    
            }
        </>
    )
}

export default TeamCases