import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BiArrowBack } from 'react-icons/bi'

const CreateEvent = () => {
  return (
    <>
        <LinkContainer to='/'>
            <Button variant="light" style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
        </LinkContainer>
        <h4 className='mt-4'>Create New Event</h4>
    </>
  )
}

export default CreateEvent