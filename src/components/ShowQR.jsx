import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import "./oldstyle.css";

const ShowQR = () => {
  const { orgId, eventId } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (orgId && eventId) {
      axios
        .get(`/api/v1/qrcode/${orgId}/${eventId}`)
        .then((res) => {
          console.log(res);
          setContent(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [eventId, orgId]);

  if (!eventId || !orgId) {
    return <p className="ticket-description">No data found to generate QR code.</p>;
  }

  return (
    <div className="ticket-page-container">
      <div className="ticket-card">
        <div className="qr-code-wrapper">
          <img
            className="qr-code"
            src={`data:image/png;base64,${content}`}
            alt="Generated QR Code"
          />
        </div>
        <div className="ticket-details flex flex-col">
          <h1 className="event-title">Generated QR Code for Event</h1>
          <button className="download-btn">Download QR Code</button>
      <Link to={`/${orgId}/${eventId}/qrcodepage`}>preview</Link>
        </div>
      </div>
    </div>
  );
};

export default ShowQR;