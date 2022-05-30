import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { GetCaseSingle } from '../data/cases'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import Moment from 'react-moment'
import { motion } from 'framer-motion'

const EventScreen = () => {
    const id = useParams().id
    const [caseSingle, setCaseSingle] = useState(null)

    const navigate = useNavigate();

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
                <Button variant="light" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
                <motion.div initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
                {caseSingle &&
                    <div className="event__details">
                        <Row xs={12} md={12}>
                            <div className="event__summary">
                                <h3 className='mt-4'>{caseSingle.name}</h3>
                                <p className="text-muted">Incident Date: <Moment date={caseSingle.date} format="dddd, MMMM Do YYYY" /></p>
                                <Badge pill style={{ marginRight: '.3rem'}} bg='primary'>{caseSingle.caseType}</Badge>
                            </div>
                            {(caseSingle && caseSingle.actionType === 771570000) ? <Alert variant="info" className="mt-3">This case is now with your Manager.</Alert> : null}
                            {(caseSingle && caseSingle.actionType === 771570001) ? <Alert variant="warning" className="mt-3">This case is now with Health & Safety.</Alert> : null}
                        </Row>
                        
                        <div className='event-card'>
                            <Row xs={12} md={12} className="event__details-section">
                                <Col xs={12} md={12}>
                                    <h5>Case Summary</h5>
                                </Col>
                            </Row>
                            <Row xs={12} md={12}>
                                <Col xs={12} md={4}>
                                    <label>Case Reference</label> 
                                    <p>{caseSingle.ref}</p>
                                </Col>
                                <Col xs={12} md={4}>
                                    <label>Name</label> 
                                    <p>{caseSingle.name}</p>
                                </Col>
                                <Col xs={12} md={4}>
                                    <label>Date & Time</label> 
                                    <p><Moment date={caseSingle.date} format="dddd, MMMM Do YYYY" /></p>
                                </Col>
                                <Col xs={12} md={4}>
                                    <label>Location</label> 
                                    <p>{caseSingle.location}</p>
                                </Col>
                                <Col xs={12} md={4}>
                                    <label>Exact Location</label> 
                                    <p>{caseSingle.exactLocation}</p>
                                </Col>
                            </Row>
                            <Row xs={12} md={12} className="mt-4">
                                <Col xs={12} md={12}>
                                    <label>Description</label>
                                    <p className="mt-3">{caseSingle.description}</p>
                                </Col>
                            </Row>
                            <Row xs={12} md={12} className="mt-2">
                                <Col xs={12} md={4}>
                                    <label>Impacts External People</label> 
                                    <p>{(caseSingle.impactsexternalpeople) ? "Yes" : "No"}</p>
                                </Col>
                                <Col xs={12} md={4}>
                                    <label>Impacts Colleagues</label> 
                                    <p>{(caseSingle.impactscolleagues) ? "Yes" : "No"}</p>
                                </Col>
                            </Row>
                        </div>
                        <div className='event-card'>
                            <Row xs={12} md={12} className="event__details-section">
                                <Col xs={12} md={12}>
                                    <h5>Investigation <span className='text-muted' style={{ fontSize: '14px'}}>(Manager)</span></h5>
                                </Col>
                                <Col xs={12} md={6}>
                                        <label>Date & Time</label> 
                                        <p><Moment date={caseSingle.investigationDate} format="dddd, MMMM Do YYYY" /></p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label>Investigation Outcome</label> 
                                        <p>{caseSingle.investigationOutcome}</p>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <label>Witness Details</label> 
                                        {(caseSingle.witnessType === 771570000) ? (
                                            <p>No Witness</p>
                                        ) : (
                                            <p>{caseSingle.witness}</p>
                                        )}
                                    </Col>
                                    {(caseSingle.emergencyService != null) && (
                                        <Col xs={12} md={3}>
                                            <label>Emergency Services</label> 
                                            <p>{caseSingle.emergencyServiceDetails}</p>
                                        </Col>
                                    )}
                                    <Col xs={6} md={3}>
                                        <label>Employee Time Off?</label> 
                                        {(caseSingle.employeeTimeOff) ? <p>Yes</p> : <p>No</p>}
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <label>Risk Assesment Followed?</label> 
                                        {(caseSingle.riskAssessentFollowed) ? <p>Yes</p> : <p>No</p>}
                                    </Col>   
                                    <Col xs={12} md={12}>
                                        <label>Findings/Notes</label> 
                                        <p>{caseSingle.investigationFindings}</p>
                                    </Col>   
                            </Row>
                        </div>
                        <div className='event-card'>
                            {(caseSingle && caseSingle.actionType === 771570001) ? 
                                <Row xs={12} md={12} className="event__details-section">
                                    <Col xs={12} md={12}>
                                        <h5>Detailed Investigation <span className='text-muted' style={{ fontSize: '14px'}}>(Health & Safety)</span></h5>
                                        <p>To be discussed</p>
                                    </Col>
                                </Row>
                            : null}
                        </div>
                    </div>
                }
                </motion.div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5>Seems your not signed in! Please sign in to manage your cases.</h5>
            </UnauthenticatedTemplate>             
        </>
    )
}

export default EventScreen  