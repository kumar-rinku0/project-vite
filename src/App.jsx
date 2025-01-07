import React from "react";
import "./componets/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import UserForm from "./componets/UserForm";
import { Event } from "./componets/Event";
import { EventDetails } from "./componets/EventDetails";
import EditEvent from "./componets/EditEvent";
import ShowQR from "./componets/ShowQR";
import UserRegistration from "./componets/UserRegistration"; // Import UserRegistration
import TicketPage from "./componets/TicketPage"; // Import TicketPage

function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/" element={<UserForm />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event-details/:eventId" element={<EventDetails />} />
        <Route path="/edit/:id" element={<EditEvent />} />
        <Route path="/show-qr" element={<ShowQR />} />
        {/* User registration and ticket routes */}
        <Route
          path="/user-register/:eventId"
          element={<UserRegistration />}
        />{" "}
        {/* Dynamic event route */}
        <Route path="/ticket/:userId" element={<TicketPage />} />{" "}
        {/* Ticket page route */}
      </Routes>
    </Router>
  );
}

export default App;
