import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import ProfileContent from "./components/ProfileContent";
import PageLayout from "./components/PageLayout";

function App() {
  return (
    <PageLayout>
       <AuthenticatedTemplate>
         <ProfileContent />
       </AuthenticatedTemplate>
       <UnauthenticatedTemplate>
         <p>Please sign in to get started.</p>
       </UnauthenticatedTemplate>
    </PageLayout>
  );
}

export default App;
