import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/mainPage/MainPage";
import BoardWrite from "../../pages/BoardWrite";
import BoardPostDetail from "../../pages/BoardPostDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardWrite />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
