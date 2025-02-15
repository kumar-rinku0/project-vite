import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWifi } from "react-icons/fa";
import { FaCar, FaChair, FaTrain } from "react-icons/fa6";

const CreateEvent = ({ edit }) => {
  const { orgId, eventId } = useParams();
  const navigate = useNavigate();
  const [qrImage, setQrImage] = useState();
  const [inputs, setInputs] = useState({ contact: {} });
  const [queryString, setQueryString] = useState("");
  const [loading, setLoading] = useState(false);
  const [facility, setFacility] = useState({ wifi: false });

  useEffect(() => {
    if (edit && eventId) {
      axios
        .get(`/api/v3/events/${eventId}`)
        .then((res) => {
          console.log(res);
          setInputs(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [edit, eventId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "image") {
      setQrImage(event.target.files[0]);
      console.log(event.target.files[0]);
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleObjectChange = (event, obj) => {
    const { name, value } = event.target;
    setInputs((values) => ({
      ...values,
      [obj]: { ...values[obj], [name]: value },
    }));
  };

  const handleUpdate = () => {
    const obj = {
      ...inputs,
      contact: { ...inputs.contact },
      imgObj: qrImage ? URL.createObjectURL(qrImage) : null,
      facility: facility,
    };
    // Convert object to URL query string
    const qs = encodeURIComponent(JSON.stringify(obj));
    setQueryString(qs);
  };
  const handleBtnClick = (value) => {
    setFacility((prevData) => ({ ...prevData, [value]: !prevData[value] }));
  };

  const handleOnSubmit = (e) => {
    setLoading(true);
    console.log(inputs);
    e.preventDefault();
    axios
      .post(
        `api/v3/events/uploadImage/userId/${orgId}`,
        { image: inputs.image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => console.log("image", res))
      .catch((err) => console.log("image", err));
    axios
      .post(`/api/v3/events/${orgId}`, inputs)
      .then((res) => {
        console.log(res);
        console.log("Event created successfully!");
        navigate(`/${orgId}`);
      })
      .catch((err) => {
        console.log(err);
        console.log("Event not created successfully!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOnUpdate = (e) => {
    setLoading(true);
    console.log(inputs);
    e.preventDefault();

    axios
      .put(`/api/v3/events/${eventId}`, inputs)
      .then((res) => {
        console.log(res);
        console.log("Event updated successfully!");
        navigate(`/${orgId}`);
      })
      .catch((err) => {
        console.log(err);
        console.log("Event not updated successfully!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-around items-center sm:items-start">
      <div className="flex flex-col p-4 justify-center items-center">
        <form className="flex flex-col gap-4" encType="multipart/form-data">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Event Details</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 px-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="organization" className="text-sm">
                    organization
                  </label>
                  <Input
                    type="text"
                    name="organization"
                    id="organization"
                    className="w-80"
                    onChange={handleChange}
                    value={inputs.organization || ""}
                    placeholder="Company or host name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm">
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    className="w-80"
                    onChange={handleChange}
                    value={inputs.title || ""}
                    placeholder="Event Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="summary" className="text-sm">
                    Summary
                  </label>
                  <Input
                    type="text"
                    name="summary"
                    id="summary"
                    className="w-80"
                    onChange={handleChange}
                    value={inputs.summary || ""}
                    placeholder="Write a short summary."
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
              // value={inputs.image || ""}
            />
          </div>
          <div className="w-80 flex justify-between items-center content-center">
            <div>
              <label htmlFor="from" className="text-sm">
                From
              </label>
              <Input
                type="date"
                name="from"
                id="from"
                className="w-36 flex justify-center items-center"
                onChange={handleChange}
                value={inputs.from || ""}
              />
            </div>
            <div>
              <label htmlFor="to" className="text-sm">
                To
              </label>
              <Input
                type="date"
                name="to"
                id="to"
                className="w-36 flex justify-center items-center"
                onChange={handleChange}
                value={inputs.to || ""}
              />
            </div>
          </div>
          <div>
            <label htmlFor="venue" className="text-sm">
              Vanue
            </label>
            <Input
              type="text"
              name="venue"
              id="venue"
              className="w-80"
              onChange={handleChange}
              value={inputs.venue || ""}
              placeholder="Vanue Name"
            />
          </div>
          <div>
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <Input
              type="text"
              name="address"
              id="address"
              className="w-80"
              onChange={handleChange}
              value={inputs.address || ""}
              placeholder="Enter Address"
            />
          </div>
          <div>
            <label htmlFor="facility" className="text-sm">
              Facility
            </label>
            <div className="flex items-center p-2 gap-4">
              <input type="hidden" />
              {/* <Input type="" /> */}
              <FaWifi
                type="button"
                onClick={() => handleBtnClick("wifi")}
                className={`${facility.wifi ? "text-green-500" : "text-black"}`}
              />
              <FaTrain
                type="button"
                onClick={() => handleBtnClick("train")}
                className={`${
                  facility.train ? "text-green-500" : "text-black"
                }`}
              />
              <FaCar
                type="button"
                onClick={() => handleBtnClick("car")}
                className={`${facility.car ? "text-green-500" : "text-black"}`}
              />
              <FaChair
                type="button"
                onClick={() => handleBtnClick("chair")}
                className={`${
                  facility.chair ? "text-green-500" : "text-black"
                }`}
              />
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Contect Orginizer</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 px-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact" className="text-sm">
                    Contact
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="contact"
                    className="w-80"
                    onChange={(event) => handleObjectChange(event, "contact")}
                    value={inputs.contact.name || ""}
                    placeholder="Contact person for the event!"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone" className="text-sm">
                    Phone
                  </label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    className="w-80"
                    onChange={(event) => handleObjectChange(event, "contact")}
                    value={inputs.contact.phone || ""}
                    placeholder="(000) 0000-9999"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    className="w-80"
                    onChange={(event) => handleObjectChange(event, "contact")}
                    value={inputs.contact.email || ""}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="website" className="text-sm">
                    Website
                  </label>
                  <Input
                    type="url"
                    name="website"
                    id="website"
                    className="w-80"
                    onChange={(event) => handleObjectChange(event, "contact")}
                    value={inputs.contact.website || ""}
                    placeholder="www.your-website.com"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {edit && (
            <Button
              className="w-80"
              type="submit"
              disable={loading}
              onClick={handleOnUpdate}
            >
              Update Event
            </Button>
          )}
          {!edit && (
            <Button
              className="w-80"
              type="submit"
              disable={loading}
              onClick={handleOnSubmit}
            >
              Create Event
            </Button>
          )}
          <Button
            className="w-80"
            type="button"
            onClick={handleUpdate}
            disable={loading}
          >
            See Preview
          </Button>
        </form>
      </div>
      <div className="relative max-h-[60vh] p-4">
        <h2 className="text-center uppercase">screen preview</h2>
        <iframe
          src={`/qrcodepage?qs=${queryString}`}
          width="320px"
          height="640px"
          // sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateEvent;
