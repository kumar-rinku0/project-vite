
import "./components/oldstyle.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import UserForm from "./components/UserForm";
import { CreateEvent } from "./components/CreateEvent";
import { EventDetails } from "./components/EventDetails";
import EditEvent from "./components/EditEvent";
import ShowQR from "./components/ShowQR";
import UserRegistration from "./components/UserRegistration"; // Import UserRegistration
import TicketPage from "./components/TicketPage"; // Import TicketPage
import UrlPageQR from "./components/UrlPageQR";

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
