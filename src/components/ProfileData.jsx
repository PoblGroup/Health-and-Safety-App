import React from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { MdOutlinePersonalInjury } from 'react-icons/md'
import { BiFolderPlus } from 'react-icons/bi'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileData = ({ graphData, eventsData }) => {
    // console.log('Logged In User', graphData)
    return (
        <>
            <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h4>My Open Events</h4>
                <LinkContainer to={`/event-new`}>
                    <Button variant="primary"><BiFolderPlus style={{ fontSize: '1.1rem', marginRight: '7px'}}/> Create New Event</Button>
                </LinkContainer>
            </div>
            <div>
                <Row xs={1} md={4} className="g-3 mt-2" >
                {eventsData && eventsData.map((e, index) => (
                    <Col key={index}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <MdOutlinePersonalInjury style={{ fontSize: '3rem', margin: '.5rem 0 1rem 0', color: '#E91E63'}} />
                            <Card.Title>{e.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{e.type}</Card.Subtitle>
                            <Badge pill bg='primary'>New</Badge>
                            <Card.Text className="mt-2">{e.description}</Card.Text>
                            <LinkContainer to={`/event/${e.id}`}>
                                <Button variant="light">View Details</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            </div>

        </>
        
    )
}

export default ProfileData