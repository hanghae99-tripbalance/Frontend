import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../login/LoginPage";
// import MainPage from "../../pages/mainPage/MainPage";
import MyPage from "../../pages/mypage/MyPage";
import PostPage from "../../PostPage/PostPage";
import BoardWrite from "../../pages/BoardWrite";
import Game from "../../pages/game/Game";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/board" element={<BoardWrite />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
