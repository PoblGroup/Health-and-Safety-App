import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Dashboard from '../components/Dashboard'


const Home = () => {
  return (
    <>
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5>Please sign in to get started.</h5>
      </UnauthenticatedTemplate> 
    </>
  )
}

export default Home