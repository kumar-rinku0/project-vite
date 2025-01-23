import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function UserLogin() {
  const [inputs, setInputs] = useState({});
  const [nextpage, setNextpage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/v1/send-otp", inputs)
      .then((res) => {
        console.log(res);
        setOtp(res.data.data.otp);
        setNextpage(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputs.otp.trim() === otp) {
      axios
        .post("api/v1/validate-otp", inputs)
        .then((res) => {
          console.log(res.data);
          const { id } = res.data.data;
          navigate(`/${id}`);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(true);
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <ToastContainer />
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2>Get Started</h2>
        {!nextpage && (
          <form onSubmit={handleSubmitData} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-80"
                value={inputs.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="number"
                name="phone"
                id="phone"
                className="w-80"
                placeholder="Enter your mobile number"
                value={inputs.phone || ""}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}

        {nextpage && (
          <form onSubmit={handleSubmitOTP}>
            <div>
              <Label htmlFor="otp">OTP</Label>
              <Input
                type="number"
                placeholder="Enter OTP"
                name="otp"
                id="otp"
                className="w-80"
                value={inputs.otp}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Validating..." : "Validate OTP"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
