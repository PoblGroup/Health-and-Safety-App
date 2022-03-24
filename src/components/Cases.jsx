import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { GetCases } from '../data/cases'
import { MdOutlinePersonalInjury } from 'react-icons/md'
import Moment from 'react-moment'
import { motion } from 'framer-motion'

const Cases = ({ employee }) => {
    const [myCases, setMyCases] = useState([])
    
    useEffect(() => {
        async function FetchUserCases() {
            if(employee.pobl_employeehsid != null) {
                const userCases = await GetCases(employee.pobl_employeehsid)
                setMyCases(userCases.value)
            }
        }
        FetchUserCases()
    }, [employee])

    return (
        <>
            <Row xs={12} md={4} className="g-2 mt-2" >
                {myCases && myCases.map((c, index) => (
                    <motion.div initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3, delay: index * 0.15}} key={index}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <MdOutlinePersonalInjury style={{ fontSize: '3rem', margin: '.5rem 0 1rem 0', color: '#E91E63'}} />
                                <Card.Title>{c.pobl_casename}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    <Moment date={c.pobl_eventdateandtime} format="dddd, MMMM Do YYYY" />
                                </Card.Subtitle>
                                <div className='mb-3'>
                                    <Badge style={{ marginRight: '.3rem'}} bg='primary'>New</Badge>
                                    <Badge style={{ marginRight: '.3rem'}} bg='dark'>{c.pobl_casetype}</Badge>
                                </div>
                                {/* <Card.Text className="mt-2">
                                    {(c.pobl_description.length > 200) ? c.pobl_description.slice(0, 100).concat('...') : c.pobl_description}
                                </Card.Text> */}
                                <LinkContainer to={`/event/${c.pobl_eventid}`}>
                                    <Button variant="light">View Details</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    </motion.div>
                ))}
            </Row>
        </>
    )
}

export default Cases