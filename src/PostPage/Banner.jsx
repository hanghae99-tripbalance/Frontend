import React from "react";
import styled from "styled-components";
import Layout from "../component/Layout";
import { AiFillEdit } from "react-icons/ai";
import CardSlide from "./CardSlide";
import Card from "./Card";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const search = (event) => {
    if (event.key === "Enter") {
      // 인풋안에있는값을 읽어옴
      let keyword = event.target.value;
      navigate(`/post?q=${keyword}`);
      //url을바꿔줌 navgate활용
    }
    console.log("key press");
  };

  // const getProducts = () => {
  //   //q=서치퀄리 넣어줌 알아서 찾아준다
  //   let searchQuery = query.get("q") || "";
  //   dispatch(productAction.getProducts(searchQuery));        ///검색햇을경우 미리세팅 test해봐야됨

  // };

  // useEffect(() => {
  //   getProducts();
  // }, [query]);
  // 검색햇을경우 랜더링 미리세팅

  return (
    <Container>
      <Title>오늘의 여행지는?</Title>
      <Layout>
        <SearchWrap>
          <SearchTitle>
            오늘의 여행지검색
            <SearchBar
              onKeyPress={search}
              type="text"
              placeholder=" 제목을 입력하세요 20글자이내."
            />
            <Wrap>
              <BsSearch />
            </Wrap>
          </SearchTitle>

          <Write>
            게시글쓰기
            <AiFillEdit />
          </Write>
        </SearchWrap>
        {/* <Card /> */}
        <CardSlide />
      </Layout>
    </Container>
  );
};

export default Banner;

const Wrap = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  left: 950px;
  position: absolute;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  position: relative;
  top: 50px;
`;

const Container = styled.div`
  height: 714px;
  border: 1px solid #744aaa;
  background-color: #744aaa;
`;
const SearchWrap = styled.div`
  font-size: 24px;
  color: white;
  margin-top: 164px;
  height: 80px;
`;
const SearchTitle = styled.div`
  width: 200px;
  position: relative;
  margin-left: 114px;
  margin-top: 25px;
  margin-bottom: 43px;
  display: flex;
`;
const SearchBar = styled.input`
  opacity: 0.5;
  border: 1px solid white;
  background-color: #744aaa;
  color: white;
  width: 710px;
  height: 60px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 280px;
  position: absolute;
  bottom: -15px;
  font-family: NotoSans;
  font-size: 16px;
  :hover {
    opacity: 1;
  }
`;

const Write = styled.div`
  font-family: NotoSans;
  font-size: 16px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  width: 100px;
  display: flex;
  height: 22px;
  margin-left: auto;
  position: relative;
  margin-top: -80px;
  margin-right: 18px;
  cursor: pointer;
`;
