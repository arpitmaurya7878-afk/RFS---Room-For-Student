import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthContex from "../src/context/authContex.jsx";
import "./index.css";
import App from "./app.jsx";
import Usercontext from "./context/Usercontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContex>
      <Usercontext>
        <App />
      
      </Usercontext>
      
    </AuthContex>
    
  </StrictMode>
);