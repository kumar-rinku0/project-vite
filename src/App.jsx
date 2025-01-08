import React from "react";
import "./componets/oldstyle.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import UserForm from "./componets/UserForm";
import { CreateEvent } from "./componets/CreateEvent";
import { EventDetails } from "./componets/EventDetails";
import EditEvent from "./componets/EditEvent";
import ShowQR from "./componets/ShowQR";
import UserRegistration from "./componets/UserRegistration"; // Import UserRegistration
import TicketPage from "./componets/TicketPage"; // Import TicketPage
import UrlPageQR from "./componets/UrlPageQR";

// app
function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/" element={<UserForm />} />
        <Route path="/qrcodepage" element={<UrlPageQR />} />
        {/* these 4 routes has to protect! */}
        <Route path="/:orgId" element={<EventDetails />} />
        <Route path="/:orgId/create" element={<CreateEvent />} />
        <Route path="/:orgId/edit/:eventId" element={<EditEvent />} />
        <Route path="/show-qr" element={<ShowQR />} />
        {/* User registration and ticket routes */}
        <Route
          path="/:orgId/:eventId/register-user"
          element={<UserRegistration />}
        />
        {/* Dynamic event route */}
        <Route path="/ticket/:userId" element={<TicketPage />} />{" "}
        {/* Ticket page route */}
      </Routes>
    </Router>
  );
}

export default App;
