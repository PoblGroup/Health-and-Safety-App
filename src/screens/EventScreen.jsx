import React, { useEffect, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { eventsData } from '../data/events'

const EventScreen = () => {
    const id = useParams().id
    const [event, setEvent] = useState(null)

    useEffect(() => {
        const event = eventsData.filter(e => e.id == id)[0]
        console.log(event)
        setEvent(event)
    }, [id])
    

    return (
        <>
            <LinkContainer to='/'>
                <Button variant="light" style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
            </LinkContainer>
            
            {event &&
                <div>
                    <h3 className='mt-4'>{event.title}</h3>
                    <p className="text-muted">Incident Date: {event.date}</p>
                    <Badge style={{ marginRight: '.3rem'}} bg={(event.status === 'New') ? 'primary' : 'warning'}>{event.status}</Badge>
                    <Badge style={{ marginRight: '.3rem'}} bg='dark'>{event.type}</Badge>
                    <p className="mt-3">{event.description}</p>
                </div>
            }
        </>
    )
}

export default EventScreen  