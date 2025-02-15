import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLogin() {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "otp") {
      console.log(name, value);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Invalid email address.", {
        position: "top-right",
      });
      return;
    }

    if (!validateMobileNumber(formData.phone)) {
      toast.error("Invalid mobile number. It should be 10 digits.", {
        position: "top-right",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/v2/send-otp`, {
        email: formData.email,
        phone: formData.phone,
      });
      console.log(response.data);
      toast.success(response.data.status, {
        position: "top-right",
      });
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidateOTP = async (e) => {
    setIsSubmitting(true);
    const { name, value } = e.target;
    if (name == "otp") {
      console.log(name, value);
    }
    try {
      const response = await axios.post(`/api/v2/validate-otp`, {
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        otp: formData.otp,
      });

      if (response.data.status && response.data.data.id) {
        const orgId = response.data.data.id;
        toast.success(response.data.message, {
          position: "top-right",
        });
        navigate(`/${orgId}`);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-form-container">
      <ToastContainer />
      <div className="user-form-card">
        <h2 className="user-form-title">Organization Form</h2>

        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="user-form-input"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="phone"
              placeholder="Enter your mobile number"
              className="user-form-input"
              value={formData.phone || ""}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="user-form-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}

        {step === 2 && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              className="user-form-otp-input"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="user-form-button"
              onClick={handleValidateOTP}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Validating..." : "Validate OTP"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
