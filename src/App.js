import React from "react";
import PageLayout from "./components/PageLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import EventScreen from "./screens/EventScreen";
import CreateEvent from "./screens/CreateEvent";
import CreateEventForm from "./screens/CreateEventForm";
import { EmployeeProvider } from "./context/EmployeeContext";
import PolicyDocumentDetail from "./screens/PolicyDocumentDetail";
import OpenCases from "./screens/OpenCases";
import OpenResponses from "./screens/OpenResponses";
import TeamScreen from "./screens/TeamScreen";
import '../src/App.css'
import ManagerEventScreen from "./screens/ManagerEventScreen";
import DiaryScreen from "./screens/DiaryScreen";
import DiaryEntryDetail from "./screens/DiaryEntryDetail";

function App() {
  return (
    <EmployeeProvider>
      <PageLayout>
        <Router>
          <Routes>
            <Route index path="/" element={<Home />}></Route>
            <Route path="cases" element={<OpenCases />}></Route>
            <Route path="cases/:id" element={<EventScreen />} />
            <Route path="cases-new" element={<CreateEvent />} />
            <Route path="cases-new/:form" element={<CreateEventForm />} />
            <Route path="documents" element={<OpenResponses />}></Route>
            <Route path="policy/:id" element={<PolicyDocumentDetail />} />
            <Route path="myteam" element={<TeamScreen />}></Route>
            <Route path="myteam/cases/:id" element={<ManagerEventScreen />} />
            <Route path="mydiary" element={<DiaryScreen />}></Route>
            <Route path="mydiary/entry/:id" element={<DiaryEntryDetail />}></Route>
          </Routes>
        </Router>
      </PageLayout>
    </EmployeeProvider>
  );
}

export default App;
