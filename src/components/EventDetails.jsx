import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

import {
  FaEdit,
  FaPaperPlane,
  FaUpload,
  FaTrashAlt,
  FaPlus,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa"; // Import FontAwesome icons


const EventDetails = () => {
  const { orgId } = useParams();
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/events/${orgId}/list?type=ORGANIZER`
        );
        console.log(response.data);
        setEventData(response.data.data.content);
        setFilteredData(response.data.data.content);
      } catch (err) {
        setError("Failed to load event details", err);
        console.log(err);
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
  const handleShowUsersClick = (eventId) => {
    navigate(`/${orgId}/${eventId}/users`);
  };

  const handleSubmitClicktoGetQr = (eventId) => {
    navigate(`/${orgId}/show-qr/${eventId}`);
  };

  const handleEditClick = (event) => {
    const eventId = event.id;
    console.log(event);
    navigate(`/${orgId}/edit/${eventId}`);
  };

  const handleEventClick = (eventId) => {
    setSelectedEventId((prevSelectedEventId) =>
      prevSelectedEventId === eventId ? null : eventId
    );
  };

  const handleDeleteClick = async (eventId) => {
    try {
      const res = await axios.delete(`/api/v1/events/${eventId}`);
      console.log(res.data);

      setEventData(eventData.filter((event) => event.id !== eventId));
      setFilteredData(filteredData.filter((event) => event.id !== eventId));
    } catch (err) {
      setError("Failed to delete event");
      console.log(err);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.file[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `/api/upload-users/${selectedEventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Users uploaded successfully.");
      setFile(null);
      console.log(response);
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Failed to upload users.");
    }
  };

  const handleCreateEventClick = () => {
    navigate(`/${orgId}/create`);
  };

  const handleAddClick = (eventId) => {
    navigate(`/${orgId}/${eventId}/register-user`);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredData.slice(indexOfFirstEvent, indexOfLastEvent);

  if (isLoading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="event-details-container">


      <div className="create-event-button-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className="create-event-button"
          onClick={handleCreateEventClick}
        >
          Create Event
        </button>
      </div>
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
            <tr key={event.id} className="table-row">
              <td className="table-cell">
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </td>
              <td className="table-cell">{event.title}</td>
              <td className="table-cell">{event.venue}</td>
              <td className="table-cell">
                {new Date(event.from).toLocaleDateString()}
              </td>
              <td className="table-cell">
                {new Date(event.to).toLocaleDateString()}
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
                  onClick={() => handleDeleteClick(event.id)}
                >
                  <FaTrashAlt /> {/*   delete btn */}
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleSubmitClicktoGetQr(event.id)}
                >
                  <FaPaperPlane /> {/* Submit Icon */}
                </button>

                <button
                  className="icon-button"
                  onClick={() => handleShowUsersClick(event.id)}

                >
                  {selectedEventId === event.id ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleAddClick(event.id)}
                >
                  <FaPlus />


                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {selectedEventId && (
        <div className="users-list">
          <h3>Registered Users for Event</h3>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload} className="upload-button">
            <FaUpload /> Upload Users
          </button>
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
            className={`page-button ${currentPage === index + 1 ? "active" : ""
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


const UserDetails = ({ eventId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/users/${eventId}/list`)
      .then((response) => setUsers(response.data.data.content))
      .catch((error) => console.error("Error fetching users:", error));
  }, [eventId]);

  return (
    <div>
      <h5>Registered Users:</h5>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
