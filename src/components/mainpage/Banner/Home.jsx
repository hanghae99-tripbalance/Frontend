import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import blue from "../../../img/blue.jpg";
import bblue from "../../../img/bblue.jpg";
import ameral from "../../../img/ameral.jpg";
import logo from "../../../img/logo.jpg";
import retro from "../../../img/retro.jpg";
import logo3 from "../../../img/3logo.jpg";
import {
  Blue,
  Img,
  Logo,
  Title,
  Trip,
  Trip2,
  Trip3,
  Ameral,
  Title2,
  Comment,
  Comment2,
  Retro,
  Bblue,
  Balance,
  Logo3,
  Balancce,
} from "./Banner";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <Carousel
      // autoPlay={false}
      interval={5000}
      navButtonsAlwaysVisible={true}
      indicators={false}
      next={() => {
        /* Do stuff */
      }}
      prev={() => {
        /* Do other stuff */
      }}
    >
      <Blue>
        <Img src={blue} />
        <Logo src={logo} />
        <Title>Trip Balance</Title>
        <Trip>추천여행지</Trip>
        <Trip2>추천여행지</Trip2>
        <Trip3>추천여행지</Trip3>
      </Blue>
      <Ameral>
        <Img src={ameral} />
        <Link to="/start">
          <Retro src={retro} />
        </Link>
        <Title2>밸런스게임</Title2>
        <Comment>당신에게 맞는 여행지는 어디인가요?</Comment>
        <Comment2>밸런스 게임을 통해서 당신의 여행지를 찾아보세요</Comment2>
      </Ameral>
      <Bblue>
        <Img src={bblue} />
        <Link to="/post">
          <Logo3 src={logo3} />
        </Link>
        <Balance>Best Balance Trip</Balance>
        <Balancce>가장 핫한 우리의 여행 이야기</Balancce>
      </Bblue>
    </Carousel>
  );
}

export default Home;
