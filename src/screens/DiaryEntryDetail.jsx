import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, ListGroup, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack, BiFile } from 'react-icons/bi'
import Moment from 'react-moment'
import { GetDiaryEntry, UpdateEntry } from '../data/diaries'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DiaryEntryDetail = () => {
    const id = useParams().id
    const [entryResponse, setEntryResponse] = useState(null)
    const [entryResponseError, setEntryResponseError] = useState(null)
    const [expired] = useState(false)
    const [loading, setLoading] = useState(true)
    // const [isError, setIsError] = useState(false)
    const [areasCovered, setAreasCovered] = useState("");
    const [areasRemaining, setAreasRemaining] = useState("");
    const [completionNotes, setCompletionNotes] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [confirmed] = useState({ status: false, message: ""})

    const navigate = useNavigate();

    useEffect(() => {
        async function FetchDiaryEntry(id) {
            const { error, data } = await GetDiaryEntry(id)
            setLoading(false)
            if(error) setEntryResponseError(error)
            if(data) { 
                setEntryResponse(data)
                console.log(data)
                // checkExpiryDate(data)
            }
        }
        FetchDiaryEntry(id)
    }, [id])

    const notify = (message) => { toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    const notifyError = (message) => { toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(areasCovered === "") {
            notifyError("Please fill in fields")
        } else {
            setIsSubmitting(true)

            const entryUpdate = {
                id,
                areasCovered,
                areasRemaining
            }

            const updatedEntry = await UpdateEntry(entryUpdate, false)
            
            if(updatedEntry.updated) { 
                setIsSubmitting(false)
                notify(updatedEntry.message)    
            }
        }
    }

    const handleCompletion = async (event) => {
        event.preventDefault()
        if(completionNotes === "") notifyError("Please provide completion notes")
        
        setIsSubmitting(true)

        const entryUpdate = {
            id,
            completionNotes
        }

        const updatedEntry = await UpdateEntry(entryUpdate, true)
        
        if(updatedEntry.updated) { 
            setIsSubmitting(false)
            notify(updatedEntry.message)    

            const navigateBack = () => {
                navigate('/mydiary')
            }

            setTimeout(navigateBack, 6000);
        }
    }

    return (
        <>
            <Button variant="light" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
            {loading && 
            (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            )}
            {entryResponseError && <p>Error: {entryResponseError}</p>}
            {entryResponse && (
                <>
                    <h3 className="mt-4">{entryResponse.name}</h3>
                    <hr/>
                    <Row>
                        <Col>
                            <label>Response Created</label><br/>
                            <Moment date={entryResponse.createdOn} format="dddd, MMMM Do YYYY" />
                        </Col>
                        <Col>
                            <label>Signed?</label>
                            <p>{entryResponse.signed}</p>
                        </Col>
                        <Col>
                            <label>Due Date</label><br/>
                            <Moment date={entryResponse.due} format="dddd, MMMM Do YYYY" />
                        </Col>
                    </Row>
                    <Row>
                        <h6 className="mt-3">Documents</h6>
                        <p className='text-muted'>Please use the following documents to go over this information with your team.</p>
                        <Col>
                            <ListGroup variant="flush">
                                {entryResponse.files.length > 0 ? entryResponse.files.map((f, index) => (
                                <ListGroup.Item key={index}><a href={f.url} target="_blank" rel="noreferrer"><BiFile />{' '}{f.name}</a></ListGroup.Item>
                                )) : <ListGroup.Item >No Documents Found.</ListGroup.Item>}
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '2rem', marginBottom: '1rem'}}>
                        <Form onSubmit={handleSubmit}>  
                            <Form.Group className="mb-3" controlId="eventDate">
                                <Form.Label>Diary Areas Covered</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    placeholder="What have you covered?" 
                                    rows={5} 
                                    value={areasCovered} 
                                    onChange={(e) => setAreasCovered(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Diary Left to Do</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    placeholder="What do you have left to cover?" 
                                    rows={5} 
                                    value={areasRemaining} 
                                    onChange={(e) => setAreasRemaining(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="light" type="submit" disabled={isSubmitting ? true : false}>{(isSubmitting) ? "Updating..." : "Update"}</Button>{' '}
                            <ToastContainer
                                position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={true}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                            />
                        </Form>
                    </Row>
                    {(confirmed.status === true) ? <Alert variant="success" className="mt-5"><strong>Thank You!</strong> - Policy Response Confirmed</Alert> :
                    (!expired) ? <Row>
                        <Col xs={12} md={12}><h5 className='mt-4'>Confirmation</h5></Col>
                        <Col xs={12} md={12}><p>Please confirm that you have read and delivered the content in the attached documents.<br/><i>This will mark the task as completed on todays date.</i></p></Col>
                        <Col>
                            <Form onSubmit={handleCompletion}>  
                                <Form.Group className="mb-3" controlId="eventDate">
                                    <Form.Label>Completion Notes</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        placeholder="Please provide some notes" 
                                        rows={5} 
                                        value={completionNotes} 
                                        onChange={(e) => setCompletionNotes(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit">Confirm & Complete</Button>
                            </Form>
                        </Col>
                    </Row> : null
                    }
                </>
            )}
        </>
        
    )
}

export default DiaryEntryDetail