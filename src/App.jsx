import "./components/oldstyle.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import EventDetails from "./components/EventDetails";
import EditEvent from "./components/EditEvent";
import ShowQR from "./components/ShowQR";
import TicketPage from "./components/TicketPage"; // Import TicketPage
import NoPage from "@components/NoPage";
import CreateEvent from "./components/CreateEvent";
import UrlPageQR from "./components/pages/UrlPageQR";

// app
function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/">
          <Route path="/" index element={<NoPage />} />
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
          <Route path="/ticket/:userId" element={<TicketPage />} />
          {/* Ticket page route */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
