import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEvent = () => {
  const { orgId, eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/v1/events/${eventId}`);
        const eventData = response.data.data;
        // Ensure dates are formatted correctly for inputs
        eventData.startOn = formatDate(eventData.startOn);
        eventData.endOn = formatDate(eventData.endOn);
        setEvent(eventData);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Event not found with id: " + eventId);
          toast.error(`Event with ID ${eventId} not found!`, {
            position: "top-right",
          });
          navigate(`/${orgId}`); // Redirect to the org page
        } else {
          console.error(err);
          setError("Failed to fetch event details");
          toast.error("Failed to fetch event details", {
            position: "top-right",
          });
        }
      }
    };

    fetchEvent();
  }, [orgId, eventId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formattedEvent = {
        ...event,
        startOn: formatToAPIDate(event.startOn),
        endOn: formatToAPIDate(event.endOn),
      };
      await axios.put(`/api/v1/events/${eventId}`, formattedEvent);
      toast.success("Event updated successfully!", {
        position: "top-right",
      });
      navigate(`/${orgId}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update event", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  const formatToAPIDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(
      d.getHours()
    ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
  };

  if (!event) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-form-container">
      {/* ToastContainer to display notifications */}
      <ToastContainer />
      <div className="event-form-card">
        <h2 className="event-form-title">Edit Event</h2>
        <form onSubmit={handleSaveChanges}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="eventName"
              className="event-form-input"
              placeholder="Enter event name"
              value={event.eventName || ""}
              onChange={handleInputChange}
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
              value={event.venue || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startOn"
              className="event-form-input"
              value={event.startOn || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endOn"
              className="event-form-input"
              value={event.endOn || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              className="event-form-input"
              value={event.status || ""}
              onChange={handleInputChange}
              required
            >
              <option disabled>Select Status</option>
              <option value="DRAFT">DRAFT</option>
              <option value="LIVE">LIVE</option>
              <option value="END">END</option>
              <option value="CANCEL">CANCEL</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="event-form-button"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="event-form-button event-form-cancel"
              onClick={() => navigate(`/${orgId}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
