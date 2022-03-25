import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { GetCaseSingle } from '../data/cases'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import Moment from 'react-moment'

const EventScreen = () => {
    const id = useParams().id
    const [caseSingle, setCaseSingle] = useState(null)

    useEffect(() => {
        // const event = eventsData.filter(e => e.id === id)[0]
        async function GetCase(id) {
            const caseSingleDetail = await GetCaseSingle(id)
            setCaseSingle(caseSingleDetail)
            console.log(caseSingleDetail)
        }
        GetCase(id)
    }, [id])
    

    return (
        <>
            <AuthenticatedTemplate>
                <LinkContainer to='/'>
                    <Button variant="light" style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
                </LinkContainer>
                
                {caseSingle &&
                    <div className="event__details">
                        <Row xs={12} md={12}>
                            <div className="event__summary">
                                <h3 className='mt-4'>{caseSingle.pobl_casename}</h3>
                                <p className="text-muted">Incident Date: <Moment date={caseSingle.pobl_eventdateandtime} format="dddd, MMMM Do YYYY" /></p>
                                <Badge pill style={{ marginRight: '.3rem'}} bg='primary'>{caseSingle.pobl_casetype}</Badge>
                            </div>
                            {(caseSingle && caseSingle.pobl_actiontype === 771570000) ? <Alert variant="info" className="mt-3">This case is now with your Manager.</Alert> : null}
                            {(caseSingle && caseSingle.pobl_actiontype === 771570001) ? <Alert variant="warning" className="mt-3">This case is now with Health & Safety.</Alert> : null}
                        </Row>
                        <Row xs={12} md={12} className="event__details-section">
                            <Col xs={12} md={12}>
                                <h5>Case Summary</h5>
                            </Col>
                        </Row>
                        <Row xs={12} md={12} className="mt-4">
                            <Col xs={12} md={4}>
                                <label>Case Reference</label> 
                                <p>{caseSingle.pobl_caseref}</p>
                            </Col>
                            <Col xs={12} md={4}>
                                <label>Name</label> 
                                <p>{caseSingle.pobl_casename}</p>
                            </Col>
                            <Col xs={12} md={4}>
                                <label>Date & Time</label> 
                                <p><Moment date={caseSingle.pobl_eventdateandtime} format="dddd, MMMM Do YYYY" /></p>
                            </Col>
                            <Col xs={12} md={4}>
                                <label>Location</label> 
                                <p>{caseSingle._pobl_locationoftheincident_value}</p>
                            </Col>
                            <Col xs={12} md={4}>
                                <label>Exact Location</label> 
                                <p>{caseSingle.pobl_exactlocationinfo}</p>
                            </Col>
                        </Row>
                        <Row xs={12} md={12} className="mt-4">
                            <Col xs={12} md={12}>
                                <label>Description</label>
                                <p className="mt-3">{caseSingle.pobl_description}</p>
                            </Col>
                        </Row>
                        <Row xs={12} md={12} className="mt-2">
                            <Col xs={12} md={4}>
                                <label>Impacts External People</label> 
                                <p>{(caseSingle.pobl_impactsexternalpeople) ? "Yes" : "No"}</p>
                            </Col>
                            <Col xs={12} md={4}>
                                <label>Impacts Colleagues</label> 
                                <p>{(caseSingle.pobl_impactscolleagues) ? "Yes" : "No"}</p>
                            </Col>
                        </Row>
                        <Row xs={12} md={12} className="event__details-section">
                            <Col xs={12} md={12}>
                                <h5>Investigation <span className='text-muted' style={{ fontSize: '14px'}}>(Manager)</span></h5>
                                <p className='mt-3'>Content to be finalised...</p>
                            </Col>
                        </Row>
                        <Row xs={12} md={12} className="event__details-section">
                            <Col xs={12} md={12}>
                                <h5>Detailed Investigation <span className='text-muted' style={{ fontSize: '14px'}}>(Health & Safety)</span></h5>
                                <p>To be discussed</p>
                            </Col>
                        </Row>
                    </div>
                }
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5>Seems your not signed in! Please sign in to manage your cases.</h5>
            </UnauthenticatedTemplate>             
        </>
    )
}

export default EventScreen  