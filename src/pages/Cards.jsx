import React from "react";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";

export const Cards = () => {
  return (
    <Layout>
      <CardBox>
        <div>
          <ImgBox src="https://cdn.pixabay.com/photo/2016/11/21/17/44/arches-national-park-1846759__340.jpg" />
          <TextBox>
            <Title>
              개수
              <FcLike />
            </Title>

            <Name>제목</Name>
          </TextBox>
        </div>
      </CardBox>
      <CardBox>
        <div>
          <ImgBox src="https://cdn.pixabay.com/photo/2018/10/01/11/45/landscape-3715977__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2019/07/16/20/21/mountains-4342531__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2020/05/05/07/52/republic-of-korea-5131925__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2018/03/14/03/17/water-3224286__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2017/05/10/16/34/waterfall-2301249__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2016/08/24/17/25/old-1617518__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2013/08/24/08/33/transalp-175190__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2017/08/07/22/32/bridge-2608627__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2017/03/17/12/35/adventure-2151437__340.jpg" />
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
          <ImgBox src="https://cdn.pixabay.com/photo/2013/10/30/08/33/waterfall-202815__340.jpg" />
          <TextBox>
            <Title>
              개수 <FcLike />
            </Title>

            <Name>제목</Name>
          </TextBox>
        </div>
      </CardBox>
      <Line></Line>
    </Layout>
  );
};

export default Cards;

{
  /* <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={true || false}
    loader={<div className="loader" key={0}>Loading ...</div>}
>
    {items} // <-- This is the content you want to load
</InfiniteScroll> */
}

const Layout = styled.div`
  justify-content: center;

  text-align: center;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Line = styled.div`
  border: 1px solid #9a9797;
  width: 1333.1px;
  margin: 20.9px 110.8px 61.6px 2px;
  margin-bottom: 20px;
`;

const ImgBox = styled.img`
  background-position: center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;

  width: 345px;

  height: 414px;
  border-radius: 10%;
`;

const CardBox = styled.div`
  font-family: "Gowun Dodum", sans-serif;
  display: flex;
  border: none;
  margin-bottom: 30px;
  margin: 20px;
  width: 344px;

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
  z-index: 2;
`;

const Title = styled.div`
  font-size: 20px;
  display: block;
  text-decoration: none;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: "KakaoBigRegular";
  cursor: pointer;
  line-height: 23px;
  word-break: normal;
  margin-left: 30px;
  z-index: 1;
`;

const Name = styled.div`
  font-family: "KakaoBigRegular";
  font-size: 20px;
  line-height: 20px;
  margin-left: -180px;
`;
