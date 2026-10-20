import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Guest } from "./Guest";
import "./guest.css";

const root = document.getElementById("root");
if (!root) throw new Error("缺少 Guest 挂载点");
createRoot(root).render(
  <StrictMode>
    <Guest />
  </StrictMode>,
);
