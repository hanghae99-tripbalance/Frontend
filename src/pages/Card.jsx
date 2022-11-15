import React from "react";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { FcLike } from "react-icons/fc";
const Card = () => {
  return (
    <Layout>
      <CardBox>
        <div>
          <ImgBox src="https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg" />
          <TextBox>
            <Title>
              개수 <FcLike />
            </Title>

            <Name>제목</Name>
          </TextBox>
        </div>
      </CardBox>
      <CardBox>
        <div>
          <ImgBox src="https://cdn.pixabay.com/photo/2016/09/19/22/46/lake-1681485__340.jpg" />
          <TextBox>
            <Title>
              개수 <FcLike />
            </Title>

            <Name>제목</Name>
          </TextBox>
        </div>
      </CardBox>
      <CardBox>
        <div>
          <ImgBox src="https://cdn.pixabay.com/photo/2022/10/23/22/45/highway-7542272__340.jpg" />
          <TextBox>
            <Title>
              개수 <FcLike />
            </Title>

            <Name>제목</Name>
          </TextBox>
        </div>
      </CardBox>
      <CardBox>
        <div>
          <ImgBox src="https://cdn.pixabay.com/photo/2016/08/01/20/15/girl-1562025__340.jpg" />
          <TextBox>
            <Title>
              개수 <FcLike />
            </Title>

            <Name>제목</Name>
          </TextBox>
        </div>
      </CardBox>
    </Layout>
  );
};

export default Card;

const Layout = styled.div`
  width: 1550px;
  justify-content: center;

  text-align: center;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 10px;
  position: relative;
  right: 50px;
  margin-bottom: 100px;
`;

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
`;

const CardBox = styled.div`
  font-family: "Gowun Dodum", sans-serif;
  display: flex;
  border: none;
  margin-bottom: 30px;
  margin: 20px;
  width: 344px;
  height: 274px;
  border-radius: 10%;
  transition: 1.1s;
  :hover {
    transform: scale(1.1);
  }
`;

const TextBox = styled.div`
  width: 300px;
  overflow: hidden;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Title = styled.div`
  font-size: 20px;
  display: block;
  text-decoration: none;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: Inter;
  cursor: pointer;
  line-height: 23px;
  word-break: normal;
  margin-left: 30px;
`;

const Name = styled.div`
  font-family: Inter;
  font-size: 20px;
  line-height: 20px;
  margin-left: -180px;
  color: white;
`;
