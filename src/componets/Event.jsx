import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = "/api"; // API base URL

export const Event = () => {
  const { eventId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    venue: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`${url}/events/${eventId}`);
          setValues(response.data);
        } catch (err) {
          console.error("Error fetching event details:", err);
          toast.error("Failed to fetch event details", {
            position: "top-right",
          });
        }
      };
      fetchEventDetails();
    }
  }, [eventId]);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = eventId
        ? await axios.put(`${url}/events/${eventId}`, values) // Update event
        : await axios.post(`${url}/register-event`, values); // Register new event

      toast.success("Event saved successfully", {
        position: "top-right",
      });

      navigate(`/event-details/${response.data.id}`);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Submission failed", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="event-form-container">
      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
      <div className="event-form-card">
        <h2 className="event-form-title">
          {eventId ? "Edit Event" : "Register Event"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              className="event-form-input"
              placeholder="Enter event name"
              value={values.name}
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
              type="date"
              id="startDate"
              name="startDate"
              className="event-form-input"
              value={values.startDate}
              onChange={handleChanges}
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
              value={values.endDate}
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
              {isLoading ? "Saving..." : eventId ? "Save Changes" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
