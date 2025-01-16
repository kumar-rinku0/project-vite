import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContentProvider } from "./components/pages/ContentProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </StrictMode>
);
