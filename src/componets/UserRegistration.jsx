import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const UserRegistration = () => {
  const { orgId, eventId } = useParams(); // Get eventId from URL
  const [event, setEvent] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    eventId: eventId || "",
    orgId: orgId || "",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState(""); // For storing OTP entered by user
  const [otpSent, setOtpSent] = useState(false); // Flag for OTP sent
  const navigate = useNavigate(); // Navigate to the next page

  useEffect(() => {
    if (eventId && orgId) {
      // Fetch event details
      axios
        .get(`/api/${orgId}/${eventId}`)
        .then((response) => setEvent(response.data))
        .catch((error) => console.error("Error fetching event:", error));
    }
  }, [orgId, eventId]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/send-otp", {
        email: userData.email,
      });
      setMessage(response.data.message);
      setOtpSent(true);
      setErrorMessage("");
    } catch (error) {
      setMessage("");
      setErrorMessage("Error sending OTP");
    }
  };

  const handleOtpValidation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/validate-otp", {
        email: userData.email,
        otp,
      });

      if (response.data.success) {
        setMessage("OTP validated successfully. You are now registered.");
        setErrorMessage("");
        await handleSubmit(); // Proceed with user registration
      }
    } catch (error) {
      setMessage("");
      setErrorMessage("Invalid or expired OTP");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/${orgId}/${eventId}/register-user`, {
        ...userData,
      });
      setMessage(response.data.message);
      setErrorMessage("");

      // Navigate to the ticket page after successful registration
      navigate(`/ticket/${response.data.userId}`, {
        state: {
          userData: {
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            eventName: event.name, // Pass event name
          },
        },
      });
    } catch (error) {
      setMessage("");
      setErrorMessage("Error registering user");
    }
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="user-form-container">
      <div className="user-form-card">
        <h2 className="user-form-title">Register for {event.name}</h2>
        <p>Venue: {event.venue}</p>
        <form onSubmit={otpSent ? handleOtpValidation : handleOtpSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="user-form-input"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="user-form-input"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            className="user-form-input"
            value={userData.mobile}
            onChange={handleChange}
            required
          />
          {!otpSent ? (
            <button type="submit" className="user-form-button">
              Send OTP
            </button>
          ) : (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="user-form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" className="user-form-button">
                Validate OTP
              </button>
            </>
          )}
        </form>
        {message && <p>{message}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UserRegistration;
