// import { useParams } from "react-router";

import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../components/ui/select";
import { useState } from "react";

import { useContent } from "./ContentProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import UrlPageQR from "./UrlPageQR";

const CreateEvent = () => {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const { setContent, setImage } = useContent();
  const [qrImage, setQrImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [createPreview, setCreatePreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "image") {
      setQrImage(event.target.files[0]);
      console.log(event.target.files[0]);
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleUpdate = () => {
    setContent(inputs);
    setImage(qrImage);
    setCreatePreview(true);
  };
  const handleOnSubmit = (e) => {
    setLoading(true);
    console.log(inputs);
    e.preventDefault();
    axios
      .post(`/api/v1/events/${orgId}`, inputs)
      .then((res) => {
        console.log(res.data);
        toast.success("Event created successfully!");
        navigate(`/${orgId}`);
      })
      .catch((err) => {
        console.error(err.response?.data?.message || "Error creating event");
        toast.error("Failed to create event. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-around items-center sm:items-start">
      <div className="flex flex-col p-4 justify-center items-center">
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="orgnization" className="text-sm">
              Orgnization{" "}
            </label>
            <Input
              type="text"
              name="orgnization"
              id="orgnization"
              className="w-80"
              onChange={handleChange}
              value={inputs.orgnization || ""}
              placeholder="Orgnization Name"
            />
          </div>
          <div>
            <label htmlFor="eventName" className="text-sm">
              Title
            </label>
            <Input
              type="text"
              name="eventName"
              id="eventName"
              className="w-80"
              onChange={handleChange}
              value={inputs.eventName || ""}
              placeholder="Event Name"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm">
              Description{" "}
            </label>
            <Input
              type="text"
              name="description"
              id="description"
              className="w-80"
              onChange={handleChange}
              value={inputs.description || ""}
              placeholder="Event Description"
            />
          </div>
          <div>
            <label htmlFor="image" className="text-sm">
              Image
            </label>
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
              <label htmlFor="startOn" className="text-sm">
                From
              </label>
              <Input
                type="date"
                name="startOn"
                id="startOn"
                className="w-36 flex justify-center items-center"
                onChange={handleChange}
                value={inputs.startOn || ""}
              />
            </div>
            <div>
              <label htmlFor="endOn" className="text-sm">
                To
              </label>
              <Input
                type="date"
                name="endOn"
                id="endOn"
                className="w-36 flex justify-center items-center"
                onChange={handleChange}
                value={inputs.endOn || ""}
              />
            </div>
          </div>
          <div>
            <label htmlFor="vanue" className="text-sm">
              Vanue
            </label>
            <Input
              type="text"
              name="vanue"
              id="vanue"
              className="w-80"
              onChange={handleChange}
              value={inputs.vanue || ""}
              placeholder="Vanue Name"
            />
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">draft</SelectItem>
                <SelectItem value="live">live</SelectItem>
                <SelectItem value="end">end</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-80" type="submit" disable={loading}>
            Create QR
          </Button>
          <Button
            className="w-80"
            type="button"
            onClick={handleUpdate}
            disable={loading}
          >
            Create Preview
          </Button>
        </form>
      </div>
      <div className="relative max-h-[60vh]">
        <h2 className="text-center uppercase">screen preview</h2>
        <iframe
          src={`/qrcodepage?preview=${createPreview}`}
          width="320px"
          height="640px"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateEvent;
