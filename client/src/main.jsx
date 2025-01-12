import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { RecoilRoot } from "recoil";
import {ToastContainer} from "react-toastify"

const isProductionurl=process.env.NODE_ENV==='production'?"https://quizbackend1-knln.onrender.com":"http://localhost:3000/api/v1/"
axios.defaults.baseURL = isProductionurl;
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
    <RecoilRoot>
      <ToastContainer/>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
);
