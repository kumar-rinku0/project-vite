import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserRegister() {
  const [formData, setFormData] = useState({});

  const [step, setStep] = useState(1);
  // const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email.trim());
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number.trim());
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    if (
      (name === "firstname" || name === "lastname") &&
      !validateName(value) &&
      value !== ""
    ) {
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
      const response = await axios.post(`/api/v1/send-otp`, {
        email: formData.email.trim(),
        phone: formData.mobileNumber.trim(),
      });
      console.log(response.data);
      toast.success(response.data.status, {
        position: "top-right",
      });
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again.",
        {
          position: "top-right",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidateOTP = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/v1/validate-otp`, {
        email: formData.email.trim(),
        phone: formData.mobileNumber.trim(),
        otp: formData.otp.trim(),
      });
      console.log(response.data);
      if (response.data.status && response.data.data) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        navigate(`/${response.data.data.id}`);
      } else {
        console.log(response.data);
        toast.error(response.data.message || "Invalid OTP. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error(
        error.response?.data?.message || "Error validating OTP. Please try again.",
        {
          position: "top-right",
        }
      );
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
              value={formData.firstname || ""}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              className="user-form-input"
              value={formData.lastname || ""}
              onChange={handleChange}
              required
            />

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
              type="text"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              className="user-form-input"
              value={formData.mobileNumber || ""}
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
              value={formData.otp }
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

export default UserRegister;
