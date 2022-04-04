import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import PageLayout from "./components/PageLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import EventScreen from "./screens/EventScreen";
import CreateEvent from "./screens/CreateEvent";
import CreateEventForm from "./screens/CreateEventForm";
import { EmployeeProvider } from "./context/EmployeeContext";
import '../src/App.css'
import PolicyDocumentDetail from "./screens/PolicyDocumentDetail";
import Cases from "./components/Cases";
import PolicyResponses from "./components/PolicyResponses";

function App() {
  return (
    <EmployeeProvider>
      <PageLayout>
        <Router>
          <Routes>
            <Route index path="/" element={<Home />}></Route>
            <Route index path="cases" element={<Cases />}></Route>
            <Route index path="documents" element={<PolicyResponses />}></Route>
            <Route index path="myteam" element={<Home />}></Route>
            <Route path="cases/:id" element={<EventScreen />} />
            <Route path="cases-new" element={<CreateEvent />} />
            <Route path="cases-new/:form" element={<CreateEventForm />} />
            <Route path="policy/:id" element={<PolicyDocumentDetail />} />
          </Routes>
        </Router>
      </PageLayout>
    </EmployeeProvider>
  );
}

export default App;
