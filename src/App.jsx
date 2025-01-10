
import "./componets/oldstyle.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import UserLogin from "./componets/UserLogin";
import UserRegister from "./componets/UserRegister"
import { CreateEvent } from "./componets/CreateEvent";
import { EventDetails } from "./componets/EventDetails";
import EditEvent from "./componets/EditEvent";
import ShowQR from "./componets/ShowQR";
import TicketPage from "./componets/TicketPage"; // Import TicketPage
import UrlPageQR from "./componets/UrlPageQR";

// app
function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/qrcodepage" element={<UrlPageQR />} />
        {/* these 4 routes has to protect! */}
        <Route path="/:orgId" element={<EventDetails />} />
        <Route path="/:orgId/create" element={<CreateEvent />} />
        <Route path="/:orgId/edit/:eventId" element={<EditEvent />} />
        <Route path="/show-qr" element={<ShowQR />} />
        {/* User registration and ticket routes */}
        <Route
          path="/:orgId/:eventId/register-user"
          element={<UserRegister />}
        />
        {/* Dynamic event route */}
        <Route path="/ticket/:userId" element={<TicketPage />} />{" "}
        {/* Ticket page route */}
      </Routes>
    </Router>
  );
}

export default App;
