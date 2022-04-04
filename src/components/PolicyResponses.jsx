import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { GetCases } from '../data/cases'
import { MdOutlinePersonalInjury } from 'react-icons/md'
import Moment from 'react-moment'
import { motion } from 'framer-motion'
import { GetPolicyResponses } from '../data/policies'

const PolicyResponses = ({employee}) => {
    const [myPolicyResponses, setMyPolicyResponses] = useState([])
    const [responsesError, setResponsesError] = useState(null)

    const currentEmployee = employee.employee.value[0]

    useEffect(() => {
        async function FetchPolicyResponses() {
            if(currentEmployee.pobl_employeehsid != null) {
                const {error, data} = await GetPolicyResponses(currentEmployee.pobl_employeehsid)
                if(error) setResponsesError(error)
                if(data) setMyPolicyResponses(data)
            }
        }
        FetchPolicyResponses()
    }, [employee])

  return (
      <>
        <Table responsive hover className='mt-4'>
            <thead>
                <tr>
                    <th hidden>Id</th>
                    <th>Policy Document</th>
                    <th>Sign By</th>
                    <th>Created</th>
                    <th>Signed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {responsesError && (
                    <tr>
                        <td hidden>0</td>
                        <td colSpan={4}>{responsesError}</td>
                    </tr>
                )}
                {myPolicyResponses && myPolicyResponses.map((d, index) => (
                    <tr key={index}>    
                        <td hidden>{d.id}</td>
                        <td>{d.document.name} <span className='text-muted' style={{fontSize: '12px'}}>({d.document.ref})</span></td>
                        <td><Moment date={d.document.signBy} format="dddd, MMMM Do YYYY" /></td>
                        <td><Moment date={d.createdOn} format="dddd, MMMM Do YYYY" /></td>
                        <td>{d.signed}</td>
                        <td><LinkContainer to={`/policy/${d.id}`}><Button variant='light'>View</Button></LinkContainer></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
  )
}

export default PolicyResponses