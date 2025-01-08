import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { FaEdit, FaPaperPlane , FaTrashAlt} from "react-icons/fa"; // Import FontAwesome icons

const url = "/api";

export const EventDetails = () => {
  const { orgId } = useParams();
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState(null); // State to track selected event
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${url}/${orgId}`);
        setEventData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [orgId]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = eventData.filter(
        (event) =>
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event._id.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page when search changes
    } else {
      setFilteredData(eventData);
    }
  };

  const handleSubmitClick = (event) => {
    // Generate QR code data with event registration URL
    const eventId = event._id;
    // const qrData = `${window.location.origin}/${orgId}/${eventId}/register-user`;
    const qrData = `${window.location.origin}/qrcodepage`;
    navigate("/show-qr", { state: { qrCodeData: qrData } });
  };

  const handleEditClick = (event) => {
    const eventId = event._id;
    navigate(`/${orgId}/edit/${eventId}`);
  };

  const handleEventClick = (eventId) => {
    setSelectedEventId((prevSelectedEventId) =>
      prevSelectedEventId === eventId ? null : eventId
    );
  };

   // DELETE function to remove event from both backend and frontend
   const handleDeleteClick = async (eventId) => {
    try {
      
      await axios.delete(`${url}/${orgId}/delete/${eventId}`);

      // Remove the deleted event from the eventData and filteredData state
      setEventData(eventData.filter((event) => event._id !== eventId));
      setFilteredData(filteredData.filter((event) => event._id !== eventId));
    } catch (err) {
      setError("Failed to delete event");
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredData.slice(indexOfFirstEvent, indexOfLastEvent);

  if (isLoading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="event-details-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search by name or ID"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <table className="event-table">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Name</th>
            <th className="table-header">Venue</th>
            <th className="table-header">Start Date</th>
            <th className="table-header">End Date</th>
            <th className="table-header">Status</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event, index) => (
            <tr key={event._id} className="table-row">
              <td className="table-cell">
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </td>
              <td className="table-cell">{event.name}</td>
              <td className="table-cell">{event.venue}</td>
              <td className="table-cell">
                {new Date(event.startDate).toLocaleDateString()}
              </td>
              <td className="table-cell">
                {new Date(event.endDate).toLocaleDateString()}
              </td>
              <td className="table-cell">{event.status}</td>
              <td className="table-cell">
                <button
                  className="icon-button"
                  onClick={() => handleEditClick(event)}
                >
                  <FaEdit /> {/* Edit Icon */}
                </button>

                <button
                  className="icon-button"
                  onClick={() => handleDeleteClick(event._id)}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleSubmitClick(event)}
                >
                  <FaPaperPlane /> {/* Submit Icon */}
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleEventClick(event._id)}
                >
                  {selectedEventId === event._id ? "Hide Users" : "Show Users"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditionally render UserDetails for the selected event */}
      {selectedEventId && (
        <div className="users-list">
          <h3>Registered Users for Event</h3>
          <UserDetails eventId={selectedEventId} />
        </div>
      )}

      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;&lt; Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="page-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;&gt;
        </button>
      </div>
    </div>
  );
};

// UserDetails Component to show registered users
const UserDetails = ({ eventId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/${eventId}`)
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, [eventId]);

  return (
    <div>
      <h5>Registered Users:</h5>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
