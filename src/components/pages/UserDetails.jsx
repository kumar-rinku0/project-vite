import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import "../oldstyle.css";
import { FaQrcode } from "react-icons/fa";

const UserDetails = () => {
  const { orgId, eventId } = useParams();
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchEventName = async () => {
      try {
        const response = await axios.get(`/api/v1/events/${eventId}`);
        console.log(response.data);
        setContent(response.data.data);
      } catch (error) {
        console.error("Error fetching event name:", error);
      }
    };

    fetchEventName();
  }, [eventId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/v1/users/${eventId}/list`);
        setUsers(response.data.data.content);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [eventId]);

  return (
    <div className="event-details-container">
      <h3 className="event-details-title">
        Registered Users for Event - {content?.title}
      </h3>
      <table className="event-table">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">First Name</th>
            <th className="table-header">Last Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Phone</th>
            <th className="table-header">QR</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="table-row">
              <td className="table-cell">{index + 1}</td>
              <td className="table-cell">{user.firstName}</td>
              <td className="table-cell">{user.lastName}</td>
              <td className="table-cell">{user.email}</td>
              <td className="table-cell">{user.phone}</td>
              <td className="table-cell">
                <Link to={`/${user.id}/${eventId}/ticket`}>
                  <FaQrcode />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
