// eslint-disable-next-line react/prop-types
export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState("This is the shared content");
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
const ContentContext = createContext();

// Export the context
// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => useContext(ContentContext);
