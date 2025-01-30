import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import Card from "@components/partials/Card";

const EventDetails = () => {
  const { orgId } = useParams();
  const [content, setContent] = useState([]);
  useEffect(() => {
    if (orgId) {
      axios
        .get(`/api/v1/events/${orgId}/list?type=ORGANIZER`)
        .then((res) => {
          console.log(res.data.data);
          const content = res.data?.data?.content;
          setContent(content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [orgId]);
  return (
    <div>
      <div>
        <Link to={`/${orgId}/create`}>Create Event</Link>
      </div>
      <div className="w-full h-full flex flex-col gap-1 capitalize">
        {content.map((item) => {
          return <Card content={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default EventDetails;
