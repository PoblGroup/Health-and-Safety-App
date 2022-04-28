import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { GetCaseSingle, UpdateCase } from '../data/cases'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const ManagerEventScreen = () => {
    const id = useParams().id
    const [caseSingle, setCaseSingle] = useState(null)
    const [eventFindings, setEventFindings] = useState("");
    const [investigationDate, setInvestigationDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(true)
    const [showNextActions, setShowNextActions] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        async function GetCase(id) {
            const caseSingleDetail = await GetCaseSingle(id)
            setCaseSingle(caseSingleDetail)
            if(caseSingleDetail.investigationFindings != null) {
                setEventFindings(caseSingleDetail.investigationFindings)
            } else {
                setEventFindings("")
            }
            if(caseSingleDetail.investigationDate != null) {
                setInvestigationDate(new Date(caseSingleDetail.investigationDate))
            } else {
                setInvestigationDate("")
            }
            if((caseSingleDetail.investigationFindings != null) && (caseSingleDetail.investigationDate != null)) setShowNextActions(true)
            setSubmitted(false)
        }
        if(submitted) GetCase(id)
    }, [id, submitted])
    
    const notify = (message) => { toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true)

        const eventUpdate = {
            id,
            eventFindings,
            investigationDate
        }

        if((event.target.id === "HS") || (event.target.id === "Resolve")) {
            eventUpdate.outcome = event.target.id
        }
        
        const updatedCase = await UpdateCase(eventUpdate)
        
        if(updatedCase.updated) { 
            setIsSubmitting(false)
            notify(updatedCase.message)
            setSubmitted(true)

            const navigateBack = () => {
                navigate('/myteam')
            }

            if((event.target.id === "HS") || (event.target.id === "Resolve")) {
                setTimeout(navigateBack, 6000);
            }
            
        }
    }

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
                            {(caseSingle && caseSingle.resolutionOutcome === 771570000) 
                            ? <Alert variant="success" className="mt-3">This case has been <strong>Resolved</strong>.</Alert> 
                            : (caseSingle && caseSingle.actionType === 771570000) ? <Alert variant="info" className="mt-3">This case is now with your Manager.</Alert> 
                            : (caseSingle && caseSingle.actionType === 771570001) ? <Alert variant="warning" className="mt-3">This case is now with Health & Safety.</Alert> : null
                            }
                        </Row>
                        <Row xs={12} md={12} className="event__details-section">
                            <Col xs={12} md={12}>
                                <h5>Case Summary</h5>
                            </Col>
                        </Row>
                        <Row xs={12} md={12} className="mt-4">
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
                        <Row xs={12} md={12} className="event__details-section">
                            <Col xs={12} md={12}>
                                <h5>Investigation <span className='text-muted' style={{ fontSize: '14px'}}>(Manager)</span></h5>
                            </Col>
                            {(caseSingle && (caseSingle.actionType === 771570001 || caseSingle.resolutionOutcome === 771570000)) ? 
                            <>
                                <Col xs={12} md={6}>
                                    <label>Date & Time</label> 
                                    <p><Moment date={caseSingle.investigationDate} format="dddd, MMMM Do YYYY" /></p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label>Investigation Outcome</label> 
                                    <p>{caseSingle.investigationOutcome}</p>
                                </Col>
                                <Col xs={12} md={12}>
                                    <label>Findings/Notes</label> 
                                    <p>{caseSingle.investigationFindings}</p>
                                </Col>
                            </>
                            :
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="eventDate">
                                        <Form.Label>Date and Time</Form.Label>
                                        <DatePicker 
                                            className='form-control'
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            selected={investigationDate}
                                            onChange={(date) => setInvestigationDate(date)}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Findings/Notes</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            placeholder="Please enter your investigation findings" 
                                            rows={8} value={eventFindings} 
                                            onChange={(e) => setEventFindings(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="light" type="submit" disabled={isSubmitting ? true : false}>{(isSubmitting) ? "Updating..." : "Update"}</Button>{' '}
                                    <ToastContainer
                                        position="bottom-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="colored"
                                    />
                                </Form>
                                <Col style={{marginTop: '20px'}}>{showNextActions && (
                                        <>
                                        <Button id="HS" onClick={handleSubmit} variant="primary" type="submit">Pass to Health Safety</Button>&nbsp;
                                        <Button id="Resolve" onClick={handleSubmit} variant="success" type="submit">Resolve</Button>
                                        </>
                                    )}
                                </Col>
                            </>
                            }
                        </Row>
                        {(caseSingle && caseSingle.actionType === 771570001) ? 
                            <Row xs={12} md={12} className="event__details-section">
                                <Col xs={12} md={12}>
                                    <h5>Detailed Investigation <span className='text-muted' style={{ fontSize: '14px'}}>(Health & Safety)</span></h5>
                                    <p>To be discussed</p>
                                </Col>
                            </Row>
                        : null}
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

export default ManagerEventScreen  