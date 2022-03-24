import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BiArrowBack, BiFirstAid } from 'react-icons/bi'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'

const CreateEvent = () => {

  const caseTypes = [
    { id: 1, name: "Accident", description: "Create a form for an Accident you had"}, 
    { id: 2, name: "Incident", description: "Create a form for an Incident you had"}, 
    { id: 3, name: "Near Miss", description: "Create a form for a Near Miss"}, 
  ]

  return (
    <>
      <AuthenticatedTemplate>
        <LinkContainer to='/'>
            <Button variant="light" style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
        </LinkContainer>
        <p className='mt-4'>Here you can create a new event from one of the options below:</p>
        <Row xs={1} md={4} className="g-3 mt-2" >
            {caseTypes && caseTypes.map((c, index) => (
                <Col key={index}>
                <Card>
                    <Card.Body>
                        <Card.Title style={{ display: 'flex', alignItems: 'center'}}>
                          <BiFirstAid style={{ fontSize: '1.4rem', marginRight: '10px', color: '#E91E63'}} />{" "}{c.name} Form
                        </Card.Title>
                        <Card.Text className="mt-2 text-muted">
                            {c.description}
                        </Card.Text>
                        <LinkContainer to={c.name}>
                            <Button variant="primary">Select</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
                </Col>
            ))}
        </Row>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5>Seems your not signed in! Please sign in to create a new case.</h5>
      </UnauthenticatedTemplate> 
    </>
  )
}

export default CreateEvent