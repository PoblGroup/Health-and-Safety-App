import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import PageLayout from "./components/PageLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import EventScreen from "./screens/EventScreen";
import CreateEvent from "./screens/CreateEvent";

function App() {
  return (
    <PageLayout>
      <Router>
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="event/:id" element={<EventScreen />} />
          <Route path="event-new" element={<CreateEvent />} />
        </Routes>
      </Router>
    </PageLayout>
  );
}

export default App;
