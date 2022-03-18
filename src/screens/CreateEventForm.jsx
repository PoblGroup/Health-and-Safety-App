import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { BiArrowBack } from 'react-icons/bi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DatePickerField from '../components/DatePickerField'
import { GetTeams } from '../data/teams'
import "../Form.css"
import { CreateNewCase } from '../data/cases'

const CreateEventForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [locations, setLocations] = useState([])
    const form = useParams().form

    const formik = useFormik({
        initialValues: {
            title: "",
            date: new Date(),
            location: "",
            exactLocation: "",
            description: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().max(15, "Exceeds 15 Characters").required("Title Required"),
            date: Yup.string().required("Incident Date Required"),
            location: Yup.string().required("Location Required"),
            exactLocation: Yup.string().required("Exact Location Required"),
            description: Yup.string().required("Description Required"),
        }),
        onSubmit: async (values) => {
            // console.log(values)
            const formData = {
                title: values.title,
                eventDate: values.date.toISOString(),
                locationId: values.location,
                exactLocation: values.exactLocation,
                description: values.description,
                caseType: form
            }
            const created = await CreateNewCase(formData)
            console.log(created)
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
                                    />
                                    {formik.touched.title && formik.errors.title ? <p>{formik.errors.title}</p> : null}
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="eventDate">
                                    <DatePickerField 
                                        label="Event Date"
                                        name="date"
                                        value={formik.values.date}
                                        onChange={formik.setFieldValue}
                                    />
                                    {formik.errors.date ? <p>{formik.errors.date}</p> : null}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="location">
                                    <Form.Label>Location of the incident</Form.Label>
                                    <Form.Select name="location" value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur}>
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
                                    />
                                    {formik.touched.description && formik.errors.description ? <p>{formik.errors.description}</p> : null}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant={isSubmitting ? "secondary" : "primary"} type="submit" disabled={isSubmitting ? true : false}>
                                    {isSubmitting ? "Saving your request..." : "Submit"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5>Seems your not signed in! Please sign in to create a new case.</h5>
            </UnauthenticatedTemplate> 
        </>
    )
}

export default CreateEventForm