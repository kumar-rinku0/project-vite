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
import CreateEvent from "./components/pages/CreateEvent";
import UrlPageQR from "./components/pages/UrlPageQR";
import Header from "@components/pages/Header";


// app
function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/" element={<Header />}>
          <Route path="/" index element={<UserLogin />} />
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
          <Route path="/:eventId/user" element={<UserRegister />} />
          
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
