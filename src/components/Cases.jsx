import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { GetCases } from '../data/cases'
import { MdOutlinePersonalInjury } from 'react-icons/md'
import Moment from 'react-moment'
import { motion } from 'framer-motion'

const Cases = ({ employee }) => {
    const [myCases, setMyCases] = useState([])

    const currentEmployee = employee.employee.value[0]

    useEffect(() => {
        async function FetchUserCases() {
            if(currentEmployee.pobl_employeehsid != null) {
                const userCases = await GetCases(currentEmployee.pobl_employeehsid)
                userCases.value.map(c => {
                    c.pobl_eventdateandtime = new Date(c.pobl_eventdateandtime)
                })
                const sortedUserCases = userCases.value.slice().sort((a, b) => b.pobl_eventdateandtime - a.pobl_eventdateandtime)
                setMyCases(sortedUserCases)
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
                        <LinkContainer to={`/event/${c.pobl_eventid}`}>
                            <motion.div whileHover={{ scale: 1.025, boxShadow: "0px 0px 30px rgba(0,0,0,.05)", cursor: 'pointer' }}>
                            <Card style={{borderColor: 'rgba(0,0,0,.05)'}}>
                                <Card.Body className="card__body">
                                    {/* <MdOutlinePersonalInjury style={{ fontSize: '3rem', margin: '.5rem 0 1rem 0', color: '#E91E63'}} /> */}
                                    <img className="card__image" src="/accident.png" alt="" />
                                    <Card.Title>{c.pobl_casename}</Card.Title>
                                    <Card.Subtitle className="text-muted" style={{ margin: '5px 0', fontSize: '14px'}}>
                                        <Moment date={c.pobl_eventdateandtime} format="dddd, MMMM Do YYYY" />
                                    </Card.Subtitle>
                                    <div style={{ margin: '10px 0' }}>
                                        <Badge pill style={{ marginRight: '.3rem', padding: '5px 10px'}} bg='primary'>{c.pobl_casetype}</Badge>
                                    </div>
                                    {/* <Card.Text className="mt-2">
                                        {(c.pobl_description.length > 200) ? c.pobl_description.slice(0, 100).concat('...') : c.pobl_description}
                                    </Card.Text> */}
                                    {/* <LinkContainer to={`/event/${c.pobl_eventid}`}>
                                        <Button variant="light">View Details</Button>
                                    </LinkContainer> */}
                                </Card.Body>
                            </Card>
                            </motion.div>
                        </LinkContainer>
                    </Col>
                    </motion.div>
                ))}
            </Row>
        </>
    )
}

export default Cases