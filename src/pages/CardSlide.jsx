import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CardSlide = () => {
  return (
    <Carousel responsive={responsive}>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2020/10/09/19/39/utah-5641320__340.jpg" />
        <div>좋아요</div>
      </div>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg" />
        <div>좋아요</div>
      </div>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2018/01/09/12/20/hamburg-3071437__340.jpg" />
        <div>좋아요</div>
      </div>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2018/10/01/11/45/landscape-3715977__340.jpg" />
        <div>좋아요</div>
      </div>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2021/02/13/01/29/woman-6010056__340.jpg" />
        <div>좋아요</div>
      </div>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2022/01/12/18/45/hungarian-parliament-building-6933621__340.jpg" />
        <div>좋아요</div>
      </div>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2018/04/05/13/08/water-3292794__340.jpg" />
        <div>좋아요</div>
      </div>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2022/05/16/19/14/road-7201023__340.jpg" />
        <div>좋아요</div>
      </div>
      <div>
        <ImgBox src="https://cdn.pixabay.com/photo/2016/08/01/20/15/girl-1562025__340.jpg" />
        <div>좋아요</div>
      </div>
    </Carousel>
  );
};

export default CardSlide;

const ImgBox = styled.img`
  background-position: center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;

  width: 344px;
  height: 274px;
  border-radius: 10%;
  transition: 1.1s;
  :hover {
    transform: scale(1.1);
  }
`;
