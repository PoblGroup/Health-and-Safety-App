import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, ListGroup, Row, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { BiArrowBack, BiFile } from 'react-icons/bi'
import { ConfirmResponse, GetPolicyResponse } from '../data/policies'
import Moment from 'react-moment'

const PolicyDocumentDetail = () => {
    const id = useParams().id
    const [policyResponse, setPolicyResponse] = useState(null)
    const [policyResponseError, setPolicyResponseError] = useState(null)
    const [expired, setExpired] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [confirmed, setConfirmed] = useState({ status: false, message: ""})

    useEffect(() => {
        async function FetchPolicyResponse(id) {
            const { error, data } = await GetPolicyResponse(id)
            setLoading(false)
            if(error) setPolicyResponseError(error)
            if(data) { 
                setPolicyResponse(data)
                console.log(data)
                checkExpiryDate(data)
            }
        }
        FetchPolicyResponse(id)
    }, [id])

    const checkExpiryDate = (data) => {
        let signBy = new Date(data.document.pobl_documentsignby)
        let today = new Date()
        if(signBy < today) setExpired(true)
    }

    const confirmResponse = async (e) => {
        e.preventDefault()
        const {error, message} = await ConfirmResponse(id)
        if(message) setConfirmed({status: true, message})
        if(error) setIsError(true)
    }

    return (
        <>
            <LinkContainer to='/'>
                <Button variant="light" style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
            </LinkContainer>
            {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>)}
            {policyResponseError && <p>Error: ${policyResponseError}</p>}
            {isError && <Alert variant="danger" className="mt-3">Error: Unable to update Policy Response. Please contact service desk if this error continues.</Alert>}
            {policyResponse && (
                <>
                    {expired && <Alert variant="warning" className="mt-3">This response has  passed the sign by date.</Alert>}
                    <h3 className="mt-4">Policy Response for {policyResponse.document.pobl_documentname}</h3>
                    <hr/>
                    <Row>
                        <Col>
                            <label>Response Created</label><br/>
                            <Moment date={policyResponse.createdOn} format="dddd, MMMM Do YYYY" />
                        </Col>
                        <Col>
                            <label>Signed?</label>
                            <p>{policyResponse.signed}</p>
                        </Col>
                        <Col>
                            <label>Signed By</label><br/>
                            <Moment date={policyResponse.document.pobl_documentsignby} format="dddd, MMMM Do YYYY" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}><h5 className='mt-4'>Document Details</h5></Col>
                        <Col>
                            <label>Intro</label>
                            <p>{policyResponse.document.pobl_documentintro}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Category</label>
                            <p>{policyResponse.document.pobl_documentcategory}</p>
                        </Col>
                        <Col>
                            <label>Expires</label><br/>
                            <Moment date={policyResponse.document.pobl_documentexpires} format="dddd, MMMM Do YYYY" />
                        </Col>
                        <Col>
                            <label>Target</label>
                            <p>{policyResponse.document.pobl_documenttargets}</p>
                        </Col>
                    </Row>
                    <Row>
                        <h6 className="mt-3">Documents</h6>
                        <Col>
                            <ListGroup variant="flush">
                                {policyResponse.files.length > 0 ? policyResponse.files.map(f => (
                                <ListGroup.Item><a href={f.url} target="_blank"><BiFile />{' '}{f.name}</a></ListGroup.Item>
                                )) : <ListGroup.Item >No Documents Found.</ListGroup.Item>}
                            </ListGroup>
                        </Col>
                    </Row>
                    {(confirmed.status == true) ? <Alert variant="success" className="mt-5"><strong>Thank You!</strong> - Policy Response Confirmed</Alert> :
                    (!expired) ? <Row>
                        <Col xs={12} md={12}><h5 className='mt-4'>Confirmation</h5></Col>
                        <Col xs={12} md={12}><p>Please confirm that you have read all the attached documents above</p></Col>
                        <Col>
                            <Button variant="primary" onClick={confirmResponse}>Confirm</Button>
                        </Col>
                    </Row> : null
                    }
                </>
            )}
        </>
        
    )
}

export default PolicyDocumentDetail