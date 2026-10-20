import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DesignService } from "./model/DesignService";
import { BrowserDesignPort } from "./services/BrowserDesignPort";
import { ActivityService } from "./activity/ActivityService";
import "./style.css";

const element = document.getElementById("root");
if (!element) throw new Error("缺少 React 根容器");
const service = new DesignService(
  new BrowserDesignPort(window.localStorage, window.fetch.bind(window)),
);
const activity = new ActivityService();
createRoot(element).render(<App service={service} activity={activity} />);
