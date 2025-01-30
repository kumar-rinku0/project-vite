import "./components/oldstyle.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import EventDetails from "./components/pages/EventDetails";
import ShowQR from "./components/ShowQR";
import TicketPage from "./components/TicketPage";
import NoPage from "@components/NoPage";
import CreateEvent from "./components/pages/CreateEvent";
import UrlPageQR from "./components/pages/UrlPageQR";
import Header from "@components/pages/Header";
import UserDetails from "@components/pages/UserDetails";
import PreviewPage from "@components/pages/PreviewPage";

// app
function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/" element={<Header />}>
          <Route path="/" index element={<UserLogin />} />
          <Route path="/preview-page" index element={<PreviewPage />} />
          {/* these 4 routes has to protect! */}
          <Route path="/:orgId" element={<EventDetails />} />
          <Route path="/:orgId/create" element={<CreateEvent edit={false} />} />
          <Route
            path="/:orgId/edit/:eventId"
            element={<CreateEvent edit={true} />}
          />
          <Route path="/:orgId/show-qr/:eventId" element={<ShowQR />} />
          {/* User registration and ticket routes */}
          <Route
            path="/:orgId/:eventId/register-user"
            element={<UserRegister />}
          />
          <Route path="/:orgId/:eventId/qrcodepage" element={<UrlPageQR />} />
          {/* Dynamic event route */}
          <Route path="/:orgId/:eventId/ticket" element={<TicketPage />} />
          <Route path="/:orgId/:eventId/users" element={<UserDetails />} />
          {/* Ticket page route */}
          <Route path="*" element={<NoPage />} />
          <Route path="/events/:eventId/users" element={<UserDetails />} />
          <Route path="/:userId/:eventId/ticket" element={<TicketPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
