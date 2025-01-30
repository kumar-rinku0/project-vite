import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import "./oldstyle.css";

const TicketPage = () => {
  const { orgId, eventId } = useParams();
  const [qrImage, setQrImage] = useState(null);

  useEffect(() => {
    if (orgId && eventId) {
      axios
        .get(`/api/v1/qrcode/${orgId}/${eventId}`)
        .then((res) => {
          console.log(res.data);
          setQrImage(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [orgId, eventId]);

  return (
    <div className="ticket-page-container">
      {orgId && eventId && (
        <div className="ticket-card">
          <div className="qr-code-wrapper">
            <img
              className="qr-code"
              src={`data:image/png;base64,${qrImage}`}
              alt="QR Code"
            />
          </div>
          <div className="ticket-details">
            <h1 className="event-title">Your Ticket</h1>
            <p className="ticket-description">
              Scan this QR code at the event to check in.
            </p>
            <Link to={`/${orgId}/${eventId}/qrcodepage`}>See Preview</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketPage;