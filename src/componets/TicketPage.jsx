import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { QRCodeCanvas } from "qrcode.react";

const TicketPage = () => {
  const location = useLocation();
  const { userData } = location.state || {}; // Get userData from state

  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    if (userData) {
      // Only include event name and user details in the QR code value
      const ticketInfo = JSON.stringify({
        name: userData.name,
        email: userData.email,
        eventName: userData.eventName, // Event name without eventId
      });
      setQrValue(ticketInfo);
    }
  }, [userData]);

  if (!userData) {
    return <p>No ticket information found.</p>;
  }

  return (
    <div className="qr-code-container">
      <h2>Your Ticket for {userData.eventName}</h2>
      <div>
        <QRCodeCanvas value={qrValue} size={256} />
      </div>
      <p>This is your ticket</p>
    </div>
  );
};

export default TicketPage;
