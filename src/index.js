import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import UserInterface from "./components/UserInterface";
import LoginWin from "./components/LoginWin/LoginWin";
import RoomsWin from "./components/RoomsWin/RoomsWin";
import ChatWin from "./components/ChatWin/ChatWin";
import Page404 from "./components/Page404/Page404";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<UserInterface />}>
          <Route index element={<LoginWin />} />
          <Route path="rooms" element={<RoomsWin />} />
          <Route path="chat" element={<ChatWin />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  </Provider>
);
