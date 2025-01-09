import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserForm() {
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
  });

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  var url = "/api";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url + "/send-otp", {
        email: formData.email,
      });

      toast.success(response.data.message, {
        position: "top-right",
      });
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP", {
        position: "top-right",
      });
    }
  };

  const handleValidateOTP = async () => {
    try {
      const response = await axios.post(url + "/validate-otp", {
        email: formData.email,
        otp: otp,
      });

      if (response.data.success && response.data.orgId) {
        const orgId = response.data.orgId;
        toast.success(response.data.message, {
          position: "top-right",
        });
        navigate(`/:${orgId}`);
      } else {
        toast.error("Invalid OTP. Please try again!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error("Error validating OTP", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="user-form-container">
      <ToastContainer />
      <div className="user-form-card">
        <h2 className="user-form-title">organization Form</h2>

        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="user-form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              className="user-form-input"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />

            <button type="submit" className="user-form-button">
              Submit
            </button>
          </form>
        )}

        {step === 2 && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              className="user-form-otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="button"
              className="user-form-button"
              onClick={handleValidateOTP}
            >
              Validate OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;
