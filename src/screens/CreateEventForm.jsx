import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { BiArrowBack } from 'react-icons/bi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DatePickerField from '../components/DatePickerField'
import { GetTeams } from '../data/teams'
import { CreateNewCase } from '../data/cases'
import { useEmployee } from '../context/EmployeeContext'
import "../Form.css"

const CreateEventForm = () => {
    const employeeData = useEmployee()
    const employee = employeeData.employee.value[0]
    const roles = employeeData.employeeRoles

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [eventCreated, setEventCreated] = useState(false)
    const [locations, setLocations] = useState([])
    const form = useParams().form

    const formik = useFormik({
        initialValues: {
            title: "",
            date: new Date(),
            location: "",
            exactLocation: "",
            description: "",
            jobRole: roles[0].id
        },
        validationSchema: Yup.object({
            title: Yup.string().max(150, "Exceeds 150 Characters").required("Title Required"),
            date: Yup.string().required("Incident Date Required"),
            location: Yup.string().required("Location Required"),
            exactLocation: Yup.string().required("Exact Location Required"),
            description: Yup.string().required("Description Required"),
            jobRole: Yup.string().required("Job Role Required"),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const formData = {
                title: values.title,
                eventDate: values.date.toISOString(),
                locationId: values.location,
                exactLocation: values.exactLocation,
                description: values.description,
                caseType: form,
                jobRole: values.jobRole,
                employeeId: employee.pobl_employeehsid
            }
            const created = await CreateNewCase(formData)
            if(created.status == 200) {
                setIsSubmitting(false)
                setEventCreated(true)
            }
        }
    })

    useEffect(() => {
      async function FetchTeams() {
          let loc = []
          const hsTeams = await GetTeams()
          loc.push({ key: 'Please select an option', value: ''})
          if(hsTeams.value.length > 0) {
            hsTeams.value.map(t => loc.push({ key: t.pobl_teamname, value: t.pobl_teamid}))
            setLocations(loc)
          }
      }
      FetchTeams()
    }, [])
    

    return (
        <>
            <AuthenticatedTemplate>
                {eventCreated ? (
                    <>
                        <Alert variant="success">Your request was submitted successfully!</Alert>
                        <LinkContainer to='/'>
                            <Button variant="primary">Back to Dashboard</Button>
                        </LinkContainer>{" "}
                        <LinkContainer to='/event-new'>
                            <Button variant="light">Select Another Form</Button>
                        </LinkContainer>
                    </>
                ) : 
                (
                    <>
                        <LinkContainer to='/event-new'>
                            <Button variant="light" style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
                        </LinkContainer>
                        <div className="mt-4">
                            <h4>New {form} Form</h4>
                            <Form onSubmit={formik.handleSubmit} className="mt-4">
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="title">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control name="title" type="text" placeholder="Enter a name" 
                                                value={formik.values.title} 
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                readOnly={eventCreated ? true : false}
                                            />
                                            {formik.touched.title && formik.errors.title ? <p>{formik.errors.title}</p> : null}
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="jobRole">
                                            <Form.Label>Job Role</Form.Label>
                                            <Form.Select name="jobRole" 
                                                value={formik.values.jobRole} 
                                                onChange={formik.handleChange} 
                                                onBlur={formik.handleBlur}
                                                disabled={eventCreated ? true : false}
                                            >
                                                {roles.map(option => {
                                                    return (
                                                        <option key={option.id} value={option.id} label={option.title} />
                                                    )
                                                })}
                                            </Form.Select>
                                            {formik.touched.jobRole && formik.errors.jobRole ? <p>{formik.errors.jobRole}</p> : null}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h5 className="mt-3 mb-3">Event Details</h5>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="eventDate">
                                            <DatePickerField 
                                                label="Date and Time"
                                                name="date"
                                                value={formik.values.date}
                                                onChange={formik.setFieldValue}
                                                eventCreated={eventCreated}
                                            />
                                            {formik.errors.date ? <p>{formik.errors.date}</p> : null}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="location">
                                            <Form.Label>Location of the incident</Form.Label>
                                            <Form.Select name="location" 
                                                value={formik.values.location} 
                                                onChange={formik.handleChange} 
                                                onBlur={formik.handleBlur}
                                                disabled={eventCreated ? true : false}
                                            >
                                                {locations.map(option => {
                                                    return (
                                                        <option key={option.value} value={option.value} label={option.key} />
                                                    )
                                                })}
                                            </Form.Select>
                                            {formik.touched.location && formik.errors.location ? <p>{formik.errors.location}</p> : null}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="exactLocation">
                                            <Form.Label>Exact Location</Form.Label>
                                            <Form.Control name="exactLocation" type="text" placeholder="Enter an exact location" 
                                                value={formik.values.exactLocation} 
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                readOnly={eventCreated ? true : false}
                                            />
                                            {formik.touched.exactLocation && formik.errors.exactLocation ? <p>{formik.errors.exactLocation}</p> : null}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control name="description" as="textarea" rows={6} 
                                                value={formik.values.description} 
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                readOnly={eventCreated ? true : false}
                                            />
                                            {formik.touched.description && formik.errors.description ? <p>{formik.errors.description}</p> : null}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant={isSubmitting ? "secondary" : "primary"} type="submit" disabled={isSubmitting || eventCreated ? true : false}>
                                            {isSubmitting ? "Saving your request..." : "Submit"}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </>
                )}
                
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5>Seems your not signed in! Please sign in to create a new case.</h5>
            </UnauthenticatedTemplate> 
        </>
    )
}

export default CreateEventForm