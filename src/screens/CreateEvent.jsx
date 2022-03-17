import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BiArrowBack } from 'react-icons/bi'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'

const CreateEvent = () => {
  return (
    <>
      <AuthenticatedTemplate>
        <LinkContainer to='/'>
            <Button variant="light" style={{ display: 'flex', alignItems: 'center' }}><BiArrowBack style={{fontSize: '1.1rem'}}/>&nbsp; Back</Button>
        </LinkContainer>
        <h4 className='mt-4'>Create New Event</h4>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5>Seems your not signed in! Please sign in to create a new case.</h5>
      </UnauthenticatedTemplate> 
    </>
  )
}

export default CreateEvent