import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Dashboard from '../components/Dashboard'
import { Container } from 'react-bootstrap';


const Home = () => {
  return (
    <>
      <Container className="py-5">
        <AuthenticatedTemplate>
          <Dashboard />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <h5>Please sign in to get started.</h5>
        </UnauthenticatedTemplate> 
      </Container>
    </>
  )
}

export default Home