import React, { useState } from "react";
import { useParams } from "react-router";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import axios from "axios";

const UserRegister = () => {
  const { orgId, eventId } = useParams();
  const [inputs, setInputs] = useState({});
  const [otp, setOtp] = useState();
  const [nextpage, setNextpage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(`/api/v2/send-otp`, inputs);
    console.log(res.data);
    setOtp(res.data.data.otp);
    setLoading(false);
    setNextpage(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(inputs);
    if (otp === inputs.otp) {
      axios
        .post(`/api/v2/users/${eventId}`, inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    } else {
      console.log("error");
      setLoading(false);
    }
  };

  return (
    <div>
      {!nextpage && (
        <div>
          <form
            onSubmit={handleSubmit1}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <div>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                className="w-80"
                onChange={handleChange}
                value={inputs.firstName || ""}
                placeholder="First Name"
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                className="w-80"
                onChange={handleChange}
                value={inputs.lastName || ""}
                placeholder="Last Name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="w-80"
                onChange={handleChange}
                value={inputs.email || ""}
                placeholder="Email Address"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                className="w-80"
                onChange={handleChange}
                value={inputs.phone || ""}
                placeholder="Mobile Number"
              />
            </div>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </div>
      )}
      {nextpage && (
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <div>
              <Label>OTP</Label>
              <Input
                type="text"
                name="otp"
                id="otp"
                className="w-80"
                onChange={handleChange}
                value={inputs.otp || ""}
                placeholder="Otp"
              />
            </div>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserRegister;