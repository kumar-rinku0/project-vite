import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import axios from "axios";

const UserLogin = () => {
  const [inputs, setInputs] = useState({ otp: "" });
  const navigate = useNavigate();
  const [nextpage, setNextpage] = useState(false);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleOTPChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const otpArray = inputs.otp ? inputs.otp.split("") : Array(6).fill("");
    otpArray[index] = value;
    setInputs((values) => ({ ...values, otp: otpArray.join("") }));
    if (value && index < 5) otpRefs.current[index + 1].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(`/api/v1/send-otp`, inputs);
    console.log(res.data);
    setLoading(false);
    setNextpage(true);
  };

  const handleSubmitNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(inputs);
    axios
      .post(`/api/v1/validate-otp`, inputs)
      .then((res) => {
        console.log(res.data);
        const { id } = res.data.data;
        navigate(`/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user-form-container">
      {!nextpage && (
        <div className="user-form-card">
          <h2 className="user-form-title">Organization Form</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <div>
              <Input
                type="email"
                name="email"
                id="email"
                className="w-72"
                onChange={handleChange}
                value={inputs.email || ""}
                placeholder="Email Address"
              />
            </div>
            <div>
              <Input
                type="text"
                name="phone"
                id="phone"
                className="w-72"
                onChange={handleChange}
                value={inputs.phone || ""}
                placeholder="Mobile Number"
              />
            </div>
            <Button
              type="submit"
              className="user-form-button"
              disabled={loading}
            >
              Submit
            </Button>
          </form>
        </div>
      )}
      {nextpage && (
        <div className="user-form-card">
          <h2 className="user-form-title">OTP Authentication</h2>
          <p>Enter the 6-digit OTP sent to your email.</p>
          <form
            onSubmit={handleSubmitNext}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <div className="otp-container">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="otp-input"
                  maxLength="1"
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  value={inputs.otp[index] || ""}
                />
              ))}
            </div>
            <Button
              type="submit"
              className="user-form-button"
              disabled={loading}
            >
              Login
            </Button>
          </form>
          <p className="resend-otp">Didn't receive an OTP? <span className="resend-link">Resend</span></p>
        </div>
      )}
    </div>
  );
};

export default UserLogin;


