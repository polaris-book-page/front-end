import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fonts/font.css";
import "./float-label.min.css"
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css'
import NavBar from "./component/NavBar";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
    }
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
