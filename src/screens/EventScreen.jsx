import React, { useEffect, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { GetDynamicsEvent } from '../data/cases'

const EventScreen = () => {
    const id = useParams().id
    const [event, setEvent] = useState(null)

    useEffect(() => {
        // const event = eventsData.filter(e => e.id === id)[0]
        async function GetEventSingle(id) {
            const event = await GetDynamicsEvent(id)
            console.log(event)
            setEvent(event)
        }
        GetEventSingle(id)
    }, [id])
    

    return (
        <>
            <LinkContainer to='/'>
                <Button variant="light" style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
            </LinkContainer>
            
            {event &&
                <div>
                    <h3 className='mt-4'>{event.pobl_casename}</h3>
                    <p className="text-muted">Incident Date: {event.pobl_eventdateandtime}</p>
                    <Badge style={{ marginRight: '.3rem'}} bg='primary'>New</Badge>
                    <Badge style={{ marginRight: '.3rem'}} bg='dark'>{event.pobl_casetype}</Badge>
                    <p className="mt-3">{event.pobl_description}</p>
                </div>
            }
        </>
    )
}

export default EventScreen  