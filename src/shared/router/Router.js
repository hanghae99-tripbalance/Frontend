import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";



import MainPage from "../../pages/mainPage/MainPage";

import MyPage from "../../pages/mypage/MyPage";
import PostPage from "../../PostPage/PostPage";
import BoardWrite from "../../pages/BoardWrite";
import Game from "../../pages/game/Game";
import GameStart from "../../pages/game/GameStart";
import GameResult from "../../pages/game/GameResult";
import BoardPostDetail from "../../pages/BoardPostDetail";
import BoardPostModify from "../../pages/BoardPostModify";
import Loading from "../../components/Loading/Loading";
import Signup from "../../login/Signup";

import Home from "../../Banner/Home";
import { InfiniteTest } from "../../Querytest/InfiniteTest";



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board" element={<BoardWrite />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/write" element={<BoardWrite />} />
        <Route path="/detail/:id" element={<BoardPostDetail />} />
        <Route path="/modify/:id" element={<BoardPostModify />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/start" element={<GameStart />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/game/:aa/:id" element={<Game />} />
        <Route path="/gameResult/:aa/:id" element={<GameResult />} />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<InfiniteTest />} />

        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
