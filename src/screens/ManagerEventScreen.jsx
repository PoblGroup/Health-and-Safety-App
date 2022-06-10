import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { GetCaseSingle, GetLookupValues, UpdateCaseManagerInvestigation } from '../data/cases'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment'
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DatePickerField from '../components/DatePickerField'
import AutoComplete from '../components/AutoComplete'

const ManagerEventScreen = () => {
    const id = useParams().id
    const [caseSingle, setCaseSingle] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(true)
    // const [showNextActions, setShowNextActions] = useState(false)
    const [employees, setEmployees] = useState([])
    const [witnessTypes, setWitnessTypes] = useState([])
    const [emergencyServices, setEmergencyServices] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        async function FetchLookups() {
            const lookups = await GetLookupValues()
            console.log(lookups)
            if (lookups) {
                setEmployees(lookups.employees)
                setWitnessTypes(lookups.witnessTypes)
                setEmergencyServices(lookups.emergencyServices)
            }
        }
        FetchLookups()
        async function GetCase(id) {
            const caseSingleDetail = await GetCaseSingle(id)
            console.log(caseSingleDetail)
            setCaseSingle(caseSingleDetail)
            if(caseSingleDetail.investigationFindings != null) {
                // setEventFindings(caseSingleDetail.investigationFindings)
            } else {
                // setEventFindings("")
            }
            if(caseSingleDetail.investigationDate != null) {
                // setInvestigationDate(new Date(caseSingleDetail.investigationDate))
            } else {
                // setInvestigationDate("")
            }
            // if((caseSingleDetail.investigationFindings != null) && (caseSingleDetail.investigationDate != null)) setShowNextActions(true)
            setSubmitted(false)
        }
        if(submitted) GetCase(id)
    }, [id, submitted])
    
    const formik = useFormik({
        initialValues: {
            eventFindings: "",
            investigationDate: new Date(),
            witnessType: "",
            witness: "",
            emergencyService: "",
            emergencyServiceDetails: "",
            employeeTimeOff: [],
            riskAssessment: []
        },
        validationSchema: Yup.object({
            eventFindings: Yup.string().required("Event Findings Required"),
            investigationDate: Yup.string().required("Investigation Date Required").nullable(),
            witnessType: Yup.string().required("Please provide a witness type")
        }),
        onSubmit: async (values) => {
            const formData = {
                caseId: id,
                eventFindings: values.eventFindings,
                investigationDate: values.investigationDate.toISOString(),
                witnessType: values.witnessType,
                witness: values.witness,
                emergencyService: values.emergencyService,
                emergencyServiceDetails: values.emergencyServiceDetails,
                employeeTimeOff: (values.employeeTimeOff[0] === "on") ? true : false,
                riskAssessment: (values.riskAssessment[0] === "on") ? true : false
            }
            console.log('FormData', formData)
            setIsSubmitting(true)

            const updated = await UpdateCaseManagerInvestigation(formData)
            if(updated) {
                setIsSubmitting(false)
                notify("Investigation Details Added!")

                const navigateBack = () => {
                    navigate('/myteam')
                }
    
                setTimeout(navigateBack, 6000);
            }
        }
    })

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

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setIsSubmitting(true)

    //     const eventUpdate = {
    //         id,
    //         // eventFindings,
    //         // investigationDate
    //     }

    //     if((event.target.id === "HS") || (event.target.id === "Resolve")) {
    //         eventUpdate.outcome = event.target.id
    //     }
        
    //     const updatedCase = await UpdateCase(eventUpdate)
        
    //     if(updatedCase.updated) { 
    //         setIsSubmitting(false)
    //         notify(updatedCase.message)
    //         setSubmitted(true)

    //         const navigateBack = () => {
    //             navigate('/myteam')
    //         }

    //         if((event.target.id === "HS") || (event.target.id === "Resolve")) {
    //             setTimeout(navigateBack, 6000);
    //         }
            
    //     }
    // }

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
                                </>
                                :
                                <>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Form.Group className="mb-3" controlId="investigationDate">
                                            <Form.Label>Date and Time</Form.Label>
                                            <DatePickerField
                                                label="Date and Time"
                                                name="investigationDate"
                                                value={formik.values.investigationDate}
                                                onChange={formik.setFieldValue}
                                            />
                                            {formik.touched.investigationDate && formik.errors.investigationDate ? <p>{formik.errors.investigationDate}</p> : null}
                                        </Form.Group>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Were there any witnesses?</Form.Label>
                                                    <Form.Select name="witnessType" className='mb-3'
                                                        value={formik.values.witnessType} 
                                                        onChange={formik.handleChange} 
                                                        onBlur={formik.handleBlur}
                                                    >
                                                        {witnessTypes.map(option => {
                                                            return (
                                                                <option key={option.value} value={option.value} label={option.key} />
                                                            )
                                                        })}
                                                    </Form.Select>
                                                    {formik.touched.witnessType && formik.errors.witnessType ? <p>{formik.errors.witnessType}</p> : null}
                                                </Form.Group>
                                            </Col>
                                            { (formik.values.witnessType === "771570001") ? (
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <AutoComplete label={"Please select an Employee"} name={"witness"} suggestions={employees} formik={formik} />
                                                    {formik.touched.witness && formik.errors.witness ? <p>{formik.errors.witness}</p> : null}
                                                </Form.Group>
                                            </Col>
                                            ) : null }
                                            { (formik.values.witnessType === "771570002") ? (
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Please enter a witness name</Form.Label>
                                                    <Form.Control name="witness" type="text" 
                                                        value={formik.values.witness} 
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.witness && formik.errors.witness ? <p>{formik.errors.witness}</p> : null}
                                                </Form.Group>
                                            </Col>
                                            ) : null }
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Were Emergency Services Called?</Form.Label>
                                                    <Form.Select name="emergencyService" 
                                                        value={formik.values.emergencyService} 
                                                        onChange={formik.handleChange} 
                                                        onBlur={formik.handleBlur}
                                                        className="mb-3"
                                                        placeholder="Select a service if called"
                                                    >
                                                        {emergencyServices.map(option => {
                                                            return (
                                                                <option key={option.value} value={option.value} label={option.key} />
                                                            )
                                                        })}
                                                    </Form.Select>
                                                    {formik.touched.emergencyService && formik.errors.emergencyService ? <p>{formik.errors.emergencyService}</p> : null}
                                                </Form.Group>
                                            </Col>
                                            { (formik.values.emergencyService !== "") ? (
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Please provide details around emergency services</Form.Label>
                                                    <Form.Control name="emergencyServiceDetails" as="textarea" rows={4} 
                                                        value={formik.values.emergencyServiceDetails} 
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.emergencyServiceDetails && formik.errors.emergencyServiceDetails ? <p>{formik.errors.emergencyServiceDetails}</p> : null}
                                                </Form.Group>
                                            </Col>
                                            ) : null }
                                        </Row>
                                        <Row className='mt-3'>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label style={{ marginRight: '.75rem'}}>Did the employee have any time off?</Form.Label>
                                                    <Form.Check 
                                                        id="employeeOff-switch" 
                                                        inline 
                                                        name="employeeTimeOff"
                                                        onChange={formik.handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label style={{ marginRight: '.75rem'}}>Was the Risk Assessment Followed?</Form.Label>
                                                    <Form.Check 
                                                        id="riskAssessment-switch" 
                                                        inline 
                                                        name="riskAssessment"
                                                        onChange={formik.handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                            <Form.Label>Findings/Notes</Form.Label>
                                            <Form.Control name="eventFindings" as="textarea" rows={4} 
                                                value={formik.values.eventFindings} 
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.eventFindings && formik.errors.eventFindings ? <p>{formik.errors.eventFindings}</p> : null}
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
                                    {/* <Col style={{marginTop: '20px'}}>{showNextActions && (
                                            <>
                                            <Button id="HS" onClick={handleSubmit} variant="primary" type="submit">Pass to Health Safety</Button>&nbsp;
                                            <Button id="Resolve" onClick={handleSubmit} variant="success" type="submit">Resolve</Button>
                                            </>
                                        )}
                                    </Col> */}
                                </>
                                }
                            </Row>
                        </div>
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