import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/mainPage/MainPage";
import BoardWrite from "../../pages/BoardWrite";
import BoardPostDetail from "../../pages/BoardPostDetail";
import LoginPage from "../../login/LoginPage.jsx";
import Signup from "../../redux/modules/Signup";
import Board from "../../pages/Board";
import PostPage from "../../PostPage/PostPage";
import BoardPostModify from "../../pages/BoardPostModify";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PostPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/write" element={<BoardWrite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<LoginPage />} />
      <Route path="/detail/:id" element={<BoardPostDetail />} />
      <Route path="/modify/:id" element={<BoardPostModify />} />
    </Routes>
  );
};

export default Router;
