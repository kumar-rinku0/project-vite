import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserRegister() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
  });

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const url = "/api";

  const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apply validation for firstname and lastname
    if ((name === "firstname" || name === "lastname") && !validateName(value) && value !== "") {
      toast.error("Only alphabetic characters are allowed for names.", {
        position: "top-right",
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Invalid email address.", {
        position: "top-right",
      });
      return;
    }

    if (!validateMobileNumber(formData.mobileNumber)) {
      toast.error("Invalid mobile number. It should be 10 digits.", {
        position: "top-right",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${url}/send-otp`, {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidateOTP = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${url}/validate-otp`, {
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
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              className="user-form-input"
              value={formData.firstname}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              className="user-form-input"
              value={formData.lastname}
              onChange={handleChange}
              required
            />

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
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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

export default UserRegister;
