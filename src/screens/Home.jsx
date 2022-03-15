import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import ProfileContent from "../components/ProfileContent";

const Home = () => {
  return (
    <>
       <AuthenticatedTemplate>
         <ProfileContent />
       </AuthenticatedTemplate>
       <UnauthenticatedTemplate>
         <h5>Please sign in to get started.</h5>
       </UnauthenticatedTemplate> 
    </>
  )
}

export default Home