import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { PiCaretUpDownBold } from "react-icons/pi";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWifi } from "react-icons/fa";
import { FaCar, FaChair, FaTrain } from "react-icons/fa6";
import UploadImage from "./UploadImage";

const formatDate = (date) => {
  const year = new Date(date).getFullYear();
  const month = ("0" + (new Date(date).getMonth() + 1)).slice(-2);
  const day = ("0" + new Date(date).getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const formatTime = (date) => {
  const hours = ("0" + new Date(date).getHours()).slice(-2);
  const minutes = ("0" + new Date(date).getMinutes()).slice(-2);
  return `${hours}:${minutes}`;
};

const formatDateTime = (dateTime) => {
  return dateTime + ":00.000Z";
};

const fixDateTime = (dateTime) => {
  return dateTime.substring(0, dateTime.length - 8);
};

const CreateEvent = ({ edit }) => {
  const currentDate = new Date(Date.now());
  const currentDateStr = formatDate(currentDate);
  const currentTimeStr = formatTime(currentDate);

  const { orgId, eventId } = useParams();
  const navigate = useNavigate();
  const [qrImage, setQrImage] = useState(null);
  const [inputs, setInputs] = useState({
    contact: {},
    from: `${currentDateStr}T${currentTimeStr}`,
  });
  const [queryString, setQueryString] = useState("");
  const [loading, setLoading] = useState(false);
  const [newEventId, setNewEventId] = useState(null);
  const [facility, setFacility] = useState({ wifi: false });
  const [newImg, setNewImg] = useState(null);

  useEffect(() => {
    if (edit && eventId) {
      axios
        .get(`/api/v1/events/${eventId}`)
        .then((res) => {
          console.log(res);
          setInputs(res.data.data);
          const { from, to } = res.data.data;
          console.log(from, to);
          setInputs((values) => ({
            ...values,
            from: fixDateTime(from),
            to: fixDateTime(to),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    handleUpdate();
  }, [edit, eventId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
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
      image: null,
      imageSmall: null,
      imageMedium: null,
      contact: { ...inputs.contact },
      imgObj: qrImage ? URL.createObjectURL(qrImage) : null,
      facility: facility,
    };

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
    newEventId &&
      axios
        .put(`/api/v1/events/${newEventId}`, {
          ...inputs,
          from: formatDateTime(inputs.from),
          to: formatDateTime(inputs.to),
          image: newImg,
          facility: facility,
        })
        .then((res) => {
          console.log(res);
          console.log("Event created successfully!");
          navigate(`/${orgId}`);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          console.log("Event not created successfully!");
          setLoading(false);
        });

    !newEventId &&
      axios
        .post(`/api/v1/events/${orgId}`, {
          ...inputs,
          from: formatDateTime(inputs.from),
          to: formatDateTime(inputs.to),
          image: newImg,
          facility: facility,
        })
        .then((res) => {
          console.log(res);
          console.log("Event created successfully!");
          navigate(`/${orgId}`);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          console.log("Event not created successfully!");
          setLoading(false);
        });
  };

  const handleOnUpdate = (e) => {
    setLoading(true);
    console.log(inputs);
    e.preventDefault();
    axios
      .put(`/api/v1/events/${eventId}`, {
        ...inputs,
        from: formatDateTime(inputs.from),
        to: formatDateTime(inputs.to),
        image: newImg,
        facility: facility,
      })
      .then((res) => {
        console.log(res);
        console.log("Event updated successfully!");
        navigate(`/${orgId}`);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log("Event not updated successfully!");
        setLoading(false);
      });
  };

  return (
    <div className="bg-gradient-to-r from-[#cce3ff] to-[#cce3ff] flex flex-col sm:flex-row justify-center sm:justify-around items-center sm:items-start">
      <div className="flex flex-col p-4 justify-center items-center">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={edit ? handleOnUpdate : handleOnSubmit}
        >
          <Collapsible defaultOpen className="w-80 p-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Event Details</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <PiCaretUpDownBold className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="organization" className="text-sm">
                  Organization
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
                  required={true}
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
                  required={true}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div>
            <UploadImage
              orgId={orgId}
              eventId={eventId}
              edit={edit}
              inputs={inputs}
              setInputs={setInputs}
              newImg={newImg}
              setNewImg={setNewImg}
              qrImage={qrImage}
              setQrImage={setQrImage}
              setNewEventId={setNewEventId}
            />
          </div>
          <div className="w-80 flex flex-col justify-between items-center content-center">
            <div>
              <label htmlFor="from" className="text-sm">
                From
              </label>
              <Input
                type="datetime-local"
                name="from"
                id="from"
                className="w-80 flex justify-center items-center"
                min={`${currentDateStr}T${currentTimeStr}`}
                onChange={handleChange}
                value={inputs.from || `${currentDateStr}T${currentTimeStr}`}
              />
            </div>
            <div>
              <label htmlFor="to" className="text-sm">
                To
              </label>
              <Input
                type="datetime-local"
                name="to"
                id="to"
                className="w-80 flex justify-center items-center"
                min={inputs.from}
                onChange={handleChange}
                value={inputs.to || inputs.from}
              />
            </div>
          </div>
          <div>
            <label htmlFor="venue" className="text-sm">
              Venue
            </label>
            <Input
              type="text"
              name="venue"
              id="venue"
              className="w-80"
              onChange={handleChange}
              value={inputs.venue || ""}
              placeholder="Venue Name"
              required={true}
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

              <FaWifi
                type="button"
                onClick={() => handleBtnClick("wifi")}
                className={`${facility.wifi ? "text-green-500" : "text-black"}`}
              />
              <FaTrain
                type="button"
                onClick={() => handleBtnClick("train")}
                className={`${facility.train ? "text-green-500" : "text-black"
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
                className={`${facility.chair ? "text-green-500" : "text-black"
                  }`}
              />
            </div>
          </div>
          <Collapsible className="w-80 p-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Contact Details</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <PiCaretUpDownBold className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col gap-4 px-2">
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
            </CollapsibleContent>
          </Collapsible>
          <Button className="w-80" type="submit" disabled={loading}>
            {edit ? "Update Event" : "Create Event"}
          </Button>
          <Button
            className="w-80"
            type="button"
            onClick={handleUpdate}
            disabled={loading}
          >
            See Preview
          </Button>
        </form>
      </div>
      <div className="relative max-h-[60vh] p-4">
        <h2 className="text-center uppercase">screen preview</h2>
        <iframe
          src={`/preview-page?qs=${queryString}`}
          width="320px"
          height="640px"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateEvent;
