import { useRef } from "react";
import { useLocation } from "react-router";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const ShowQR = () => {
  const location = useLocation();
  const { qrCodeData } = location.state || {};
  const qrRef = useRef();

  if (!qrCodeData) {
    return <p>No data found to generate QR code.</p>;
  }

  // Function to download the QR code as an image
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="qr-code-container">
      <h2>Generated QR Code for Event</h2>
      <div ref={qrRef}>
        <QRCodeCanvas value={qrCodeData} />
      </div>
      <button className="download-btn" onClick={downloadQRCode}>
        Download QR Code
      </button>
    </div>
  );
};

export default ShowQR;
