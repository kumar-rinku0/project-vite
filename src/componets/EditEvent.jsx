import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var url = "api";

const EditEvent = () => {
  const { orgId, eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    venue: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(url + `/{orgId}/edit/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        setError("Failed to fetch event details");
        toast.error("Failed to fetch event details", {
          position: "top-right",
        });
      }
    };

    fetchEvent();
  }, [orgId, envetId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(url + `/${orgId}/edit/${eventId}`, event);
      toast.success("Event updated successfully!", {
        position: "top-right",
      });
      navigate(`/${orgId}`);
    } catch (err) {
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
              name="name"
              className="event-form-input"
              placeholder="Enter event name"
              value={event.name}
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
              value={event.venue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="event-form-input"
              value={formatDate(event.startDate)}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="event-form-input"
              value={formatDate(event.endDate)}
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
              value={event.status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Draft">Draft</option>
              <option value="Live">Live</option>
              <option value="End">End</option>
              <option value="Cancel">Cancel</option>
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
              onClick={() => navigate("/${orgId}")}
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
