import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = () => {
  const { orgId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    eventName: "",
    description: "This is a dummy description!",
    venue: "",
    startOn: "",
    endOn: "",
    status: "",
  });

  const navigate = useNavigate();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formattedValues = {
      ...values,
      startOn: values.startOn ? formatDateTime(values.startOn) : "",
      endOn: values.endOn ? formatDateTime(values.endOn) : "",
      status: values.status.toUpperCase(),
    };

    axios
      .post(`/api/v1/events/${orgId}`, formattedValues)
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
        setIsLoading(false);
      });
  };

  return (
    <div className="event-form-container">
      <ToastContainer />
      <div className="event-form-card">
        <h2 className="event-form-title">Create New Event!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="eventName"
              className="event-form-input"
              placeholder="Enter event name"
              value={values.eventName}
              onChange={handleChanges}
              required
            />
          </div>
          <div>
            <label htmlFor="venue">Venue:</label>
            <input
              id="venue"
              name="venue"
              className="event-form-input"
              placeholder="Enter event venue"
              value={values.venue}
              onChange={handleChanges}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startOn"
              className="event-form-input"
              value={values.startOn}
              onChange={handleChanges}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endOn"
              className="event-form-input"
              value={values.endOn}
              onChange={handleChanges}
              required
            />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              className="event-form-input"
              value={values.status}
              onChange={handleChanges}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="DRAFT">Draft</option>
              <option value="LIVE">Live</option>
              <option value="CANCEL">Cancel</option>
              <option value="ACTIVE">Active</option>
              <option value="DEACTIVE">Deactive</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="event-form-button"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : orgId ? "Save Changes" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
