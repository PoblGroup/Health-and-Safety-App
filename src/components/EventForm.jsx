import React from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import DatePickerField from '../components/DatePickerField'
import AutoComplete from '../components/AutoComplete'

function EventForm({formik, isSubmitting, locations, accidentCategories, injuries, injuryParts, employees, form, roles, eventCreated}) {

    console.log(roles)
  return (
    <div className="mt-4">
        <h4>New {form} Form</h4>
        <Form onSubmit={formik.handleSubmit} className="mt-4" autoComplete='false'>
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
                            {/* {roles.map(option => {
                                return (
                                    <option key={option.id} value={option.id} label={option.title} />
                                )
                            })} */}
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
                {/* <Col xs={12} md={6}>
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
                </Col> */}
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="location">
                        <AutoComplete label={"Location of Incident"} name={"location"} suggestions={locations} formik={formik} />
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
            {/* If Accident Type */}
            {(form === "Accident") ? 
                <>
                    <h5 className="mt-3 mb-3">Accident Details</h5>
                    <Row>
                        <Col xs={12} md={4}>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Label>Accident Category</Form.Label>
                                <Form.Select name="category" 
                                    value={formik.values.category} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    disabled={eventCreated ? true : false}
                                >
                                    {accidentCategories.map(option => {
                                        return (
                                            <option key={option.value} value={option.value} label={option.key} />
                                        )
                                    })}
                                </Form.Select>
                                {formik.touched.category && formik.errors.category ? <p>{formik.errors.category}</p> : null}
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group className="mb-3" controlId="injury">
                                <Form.Label>Accident Injury Sustained</Form.Label>
                                <Form.Select name="injury" 
                                    value={formik.values.injury} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    disabled={eventCreated ? true : false}
                                >
                                    {injuries.map(option => {
                                        return (
                                            <option key={option.value} value={option.value} label={option.key} />
                                        )
                                    })}
                                </Form.Select>
                                {formik.touched.injury && formik.errors.injury ? <p>{formik.errors.injury}</p> : null}
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group className="mb-3" controlId="injuryPart">
                                <Form.Label>Accident Injured Part</Form.Label>
                                <Form.Select name="injuryPart" 
                                    value={formik.values.injuryPart} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    disabled={eventCreated ? true : false}
                                >
                                    {injuryParts.map(option => {
                                        return (
                                            <option key={option.value} value={option.value} label={option.key} />
                                        )
                                    })}
                                </Form.Select>
                                {formik.touched.injuryPart && formik.errors.injuryPart ? <p>{formik.errors.injuryPart}</p> : null}
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* Affected Person */}
                    <Row>
                        {/* <Col xs={12} md={4}>
                            <Form.Group className="mb-3" controlId="affectedPerson">
                                <Form.Label>Affected Person (Employee)</Form.Label>
                                <Form.Select name="affectedPerson" 
                                    value={formik.values.affectedPerson} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    disabled={eventCreated ? true : false}
                                >
                                    {employees.map(option => {
                                        return (
                                            <option key={option.value} value={option.value} label={option.key} />
                                        )
                                    })}
                                </Form.Select>
                                {formik.touched.affectedPerson && formik.errors.affectedPerson ? <p>{formik.errors.affectedPerson}</p> : null}
                            </Form.Group>
                        </Col> */}
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="affectedPerson">
                                <AutoComplete label={"Affected Person (Employee)"} name={"affectedPerson"} suggestions={employees} formik={formik} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="affectedPersonNotes">
                                <Form.Label>Affected Person (Notes)</Form.Label>
                                <Form.Control name="affectedPersonNotes" as="textarea" rows={4} 
                                    value={formik.values.affectedPersonNotes} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    readOnly={eventCreated ? true : false}
                                />
                                {formik.touched.affectedPersonNotes && formik.errors.affectedPersonNotes ? <p>{formik.errors.affectedPersonNotes}</p> : null}
                            </Form.Group>
                        </Col>
                    </Row>
                </>
            : null }
            <Row>
                <Col>
                    <Button variant={isSubmitting ? "secondary" : "primary"} type="submit" disabled={isSubmitting || eventCreated ? true : false}>
                        {isSubmitting ? "Saving your request..." : "Submit"}
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
  )
}

export default EventForm