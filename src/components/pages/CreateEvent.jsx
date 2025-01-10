// import { useParams } from "react-router";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Iframe from "react-iframe";
import { useState } from "react";

// import UrlPageQR from "./UrlPageQR";

const CreateEvent = () => {
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.name === "image") {
      // setSelectedImg(event.target.files[0]);
      console.log(event.target.files[0]);
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleOnSubmit = (e) => {
    console.log(inputs);
    e.preventDefault();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-around items-center sm:items-start">
      <div className="flex flex-col p-4 justify-center items-center">
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title">Title </label>
            <Input
              type="text"
              name="title"
              id="title"
              className="w-80"
              onChange={handleChange}
              value={inputs.title || ""}
            />
          </div>
          <div>
            <label htmlFor="description">description </label>
            <Input
              type="text"
              name="description"
              id="description"
              className="w-80"
              onChange={handleChange}
              value={inputs.description || ""}
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <Input
              type="file"
              name="image"
              id="image"
              className="w-80"
              onChange={handleChange}
              value={inputs.image || ""}
            />
          </div>
          <div className="w-80 flex justify-between items-center content-center">
            <div>
              <label htmlFor="fromDate">from</label>
              <Input
                type="date"
                name="fromDate"
                id="fromDate"
                className="w-36 flex justify-center items-center"
                onChange={handleChange}
                value={inputs.fromDate || ""}
              />
            </div>
            <div>
              <label htmlFor="toDate">to</label>
              <Input
                type="date"
                name="toDate"
                id="toDate"
                className="w-36 flex justify-center items-center"
                onChange={handleChange}
                value={inputs.toDate || ""}
              />
            </div>
          </div>
          <div>
            <label htmlFor="vanue">Vanue</label>
            <Input
              type="text"
              name="vanue"
              id="vanue"
              className="w-80"
              onChange={handleChange}
              value={inputs.vanue || ""}
            />
          </div>
          <Button className="w-80">Create QR</Button>
        </form>
      </div>
      <div className="relative max-h-[60vh]">
        <h2 className="text-xl">Preview!</h2>
        <Iframe
          url="http://localhost:5173/qrcodepage"
          width="320px"
          height="640px"
        />
      </div>
    </div>
  );
};

export default CreateEvent;
