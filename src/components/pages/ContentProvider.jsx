// eslint-disable-next-line react/prop-types
export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([
    {
      description: "Event Description",
      endOn: "2025-01-18",
      eventName: "Event Name",
      image: "C:\\fakepath\\1600w-4SpKW5MtQl4.webp",
      orgnization: "Orgnization Name",
      startOn: "2025-01-17",
      vanue: "Vanue Name",
    },
  ]);
  const [image, setImage] = useState("https://via.placeholder.com/150"); // Replace with actual image URL

  const value = {
    content,
    image,
    setContent,
    setImage,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

import { createContext, useState, useContext } from "react";

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const ContentContext = createContext();

// Export the context
// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => useContext(ContentContext);
