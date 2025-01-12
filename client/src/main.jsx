import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { RecoilRoot } from "recoil";
import {ToastContainer} from "react-toastify"

axios.defaults.baseURL = "http://localhost:5000/api/v1/";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
    <RecoilRoot>
      <ToastContainer/>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
);
