import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  __getbestfive,
  __getBoard,
  __getBoardinfi,
  __getcategory,
  __getBoardLocalinfi,
  __getBoardTotalinfi,
  __getcatenormal,
  __getBoardTotal,
  __getBoardLocal,
} from "../../redux/modules/BoardSlice";
import { useNavigate } from "react-router-dom";
import PostBestfive from "./PostBestfive";
import { useInView } from "react-intersection-observer";
import { Loading2 } from "../Loading/Loading2";
import LoginPage from "../login/LoginPage";

const PostItem = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.BoardSlice.posts);

  const isLast = useSelector((state) => state.BoardSlice.isLastPage);
  console.log(isLast);
  // const postTotal = useSelector((state) => state.BoardSlice.postTotal);
  console.log(posts);
  // const postLocal = useSelector((state) => state.BoardSlice.postLocal);
  const best = useSelector((state) => state.BoardSlice.bestpost);
  const [page, setpage] = useState(1);
  const [pageLocal, setPageLocal] = useState(0);
  const [useInput, setUseInput] = useState("");
  const NICK = sessionStorage.getItem("nickName");
  const [Cate, setCate] = useState("");
  const email = sessionStorage.getItem("email");
  const [search, setsearch] = useState(1);

  const profiledefaultImg = "/img/default3.jpg";
  const [ref, inView] = useInView();
  // const search = (e) => {
  //   if (e.key === "Enter") {
  //     setUseInput(e.target.value);
  //   }
  //   console.log("key press");
  // };
  const [test, settest] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      settest(true);
    }, 3000);
  }, []);
  const onChange = (e) => {
    setUseInput(e.target.value);
  };

  useEffect(() => {
    if (posts == 0) {
      dispatch(__getBoard(0));
    }
    if (best == 0) {
    }
    dispatch(__getbestfive());
  }, []);

  console.log("번호확인", search);

  //일반검색 인피니티입니다.
  useEffect(() => {
    if (posts !== 0 && inView) {
      if (isLast == false && search == 1) {
        dispatch(__getBoardinfi(page));
        setpage(page + 1);
      }
      if (isLast == false && search == 2) {
        dispatch(__getBoardTotalinfi({ useInput, page }));
        setpage(page + 1);
      }
      if (isLast == false && search == 3) {
        dispatch(__getBoardLocalinfi({ selLocal, useInput, page }));
        setpage(page + 1);
      }
    }
  }, [inView]);

  const [modal, setModal] = useState(false);

  const goPosrWrite = () => {
    if (email) {
      navigator("/write");
    } else {
      alert("글쓰기는 로그인후에 가능합니다.");
      setModal(!modal);
    }
  };
  const goDetail = (id) => {
    console.log(id);
    if (email) {
      navigator(`/detail/${id}`);
    } else {
      alert("게시글 조회는 로그인 후 가능합니다.");
      setModal(!modal);
    }
  };
  const [selLocal, setSelLocal] = useState("0");
  const getCategory = (e) => {
    setSelLocal(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    if (selLocal == "0") {
      dispatch(__getBoardTotal({ useInput, pageLocal }));
      setsearch(2);
    } else {
      dispatch(__getBoardLocal({ useInput, pageLocal, selLocal }));
      setsearch(3);
    }
  };

  const searchImg = "img/search.svg";

  return (
    <>
      {modal ? (
        <>
          <LoginPage />
          <PostPageContainer>
            <TodayTitle>오늘의 여행지 검색</TodayTitle>
            <SearchBox>
              <SearchBoxForm onSubmit={getSearch}>
                <CategorySearch onChange={getCategory}>
                  <option value="0">전체</option>
                  <option value="1">수도권</option>
                  <option value="2">강원도 + 경상도</option>
                  <option value="3">충청도 + 전라도</option>
                  <option value="4">제주도</option>
                  <option value="5">기타</option>
                </CategorySearch>
                <TitleSearchbox>
                  <TitleSearch
                    type="text"
                    placeholder="오늘의 핫한 여행지 검색하기"
                    value={useInput}
                    onChange={onChange}
                  ></TitleSearch>
                  <SearchIcon></SearchIcon>
                </TitleSearchbox>
              </SearchBoxForm>
              <PostgoWrite onClick={goPosrWrite}>게시글 작성</PostgoWrite>
            </SearchBox>
            <PostLikeBestbox>
              <PostBestfive best={best} />
            </PostLikeBestbox>
            <PostListWrap>
              <PostListTitle type="submit">TB 추천여행지</PostListTitle>
              <PostCardList>
                {posts &&
                  posts.map((item, idx) => (
                    <CardWrap
                      key={idx}
                      search={posts}
                      onClick={() => {
                        goDetail(item.postId);
                      }}
                    >
                      <CardImgbox>
                        <CardImg src={item.image[0].imgURL} />
                      </CardImgbox>
                      <CardTextbox>
                        <CardTitle>{item.title}</CardTitle>
                        <Cardbody>
                          <Userinfo>
                            <UserImg
                              src={
                                item.profileImg
                                  ? item.profileImg
                                  : profiledefaultImg
                              }
                            />
                            <CardUserName>{item.author}</CardUserName>
                          </Userinfo>
                          <Likeinfo>
                            <LikeCount>{item.heartNum}</LikeCount>
                            <LikeImg src="img/heart.svg" />
                          </Likeinfo>
                        </Cardbody>
                      </CardTextbox>
                    </CardWrap>
                  ))}
              </PostCardList>
            </PostListWrap>
            <Viewbox>
              {test ? (
                <div ref={ref}>
                  {isLast ? "더이상 글이없습니다" : <Loading2 />}
                </div>
              ) : null}
            </Viewbox>
          </PostPageContainer>
        </>
      ) : (
        <PostPageContainer>
          <TodayTitle>오늘의 여행지 검색</TodayTitle>
          <SearchBox>
            <SearchBoxForm onSubmit={getSearch}>
              <CategorySearch onChange={getCategory}>
                <option value="0">전체</option>
                <option value="1">수도권</option>
                <option value="2">강원도 + 경상도</option>
                <option value="3">충청도 + 전라도</option>
                <option value="4">제주도</option>
                <option value="5">기타</option>
              </CategorySearch>
              <TitleSearchbox>
                <TitleSearch
                  type="text"
                  placeholder="오늘의 핫한 여행지 검색하기"
                  value={useInput}
                  onChange={onChange}
                ></TitleSearch>
                <SearchIcon></SearchIcon>
              </TitleSearchbox>
            </SearchBoxForm>
            <PostgoWrite onClick={goPosrWrite}>게시글 작성</PostgoWrite>
          </SearchBox>
          <PostLikeBestbox>
            <PostBestfive best={best} />
          </PostLikeBestbox>
          <PostListWrap>
            <PostListTitle type="submit">TB 추천여행지</PostListTitle>
            <PostCardList>
              {posts &&
                posts.map((item, idx) => (
                  <CardWrap
                    key={idx}
                    search={posts}
                    onClick={() => {
                      goDetail(item.postId);
                    }}
                  >
                    <CardImgbox>
                      <CardImg src={item.image[0].imgURL} />
                    </CardImgbox>
                    <CardTextbox>
                      <CardTitle>{item.title}</CardTitle>
                      <Cardbody>
                        <Userinfo>
                          <UserImg
                            src={
                              item.profileImg
                                ? item.profileImg
                                : profiledefaultImg
                            }
                          />
                          <CardUserName>{item.author}</CardUserName>
                        </Userinfo>
                        <Likeinfo>
                          <LikeCount>{item.heartNum}</LikeCount>
                          <LikeImg src="img/heart.svg" />
                        </Likeinfo>
                      </Cardbody>
                    </CardTextbox>
                  </CardWrap>
                ))}
            </PostCardList>
          </PostListWrap>
          <Viewbox>
            {test ? (
              <div ref={ref}>
                {isLast ? "더이상 글이없습니다" : <Loading2 />}
              </div>
            ) : null}
          </Viewbox>
        </PostPageContainer>
      )}
    </>
  );
};
export default PostItem;

const Viewbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Viewmore = styled.button`
  margin-bottom: 150px;
  background-color: #49b2d3;
  color: #fff;
  font-size: 26px;
  padding: 10px 50px;
  transition: all 0.4s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const LikeImg = styled.img``;
const LikeCount = styled.div`
  margin-right: 10px;
`;

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 15px;
`;

const Likeinfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const Userinfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardUserName = styled.div`
  margin-left: 10px;
`;
const Cardbody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 10px;
`;
const CardTitle = styled.div`
  margin: 20px 20px 5px 20px;
  font-size: 18px;
  white-space: normal;
`;

const CardTextbox = styled.div`
  width: 100%;
  height: 135px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const CardImgbox = styled.div`
  width: 100%;
  height: 365px;
`;
const CardWrap = styled.div`
  width: 344px;
  height: 500px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }
`;

const PostCardList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
`;

const PostListWrap = styled.div`
  margin: 60px auto 50px;
  width: 100%;
  height: auto;
`;
const PostListTitle = styled.div`
  text-align: center;
  font-size: 36px;
  margin-bottom: 70px;
`;

const PostPageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  height: auto;
  margin: 0 auto;
  margin-top: 100px;
`;
const TodayTitle = styled.div`
  font-size: 30px;
  text-align: center;
`;
const SearchBox = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center;
  gap: 20px;
`;
const SearchBoxForm = styled.form`
  display: flex;
  align-items: center;
`;
const CategorySearch = styled.select`
  width: 344px;
  height: 60px;
  border-radius: 30px;
  font-size: 20px;
  text-align: center;
`;
const TitleSearchbox = styled.div`
  width: 690px;
  height: 60px;
  margin-left: 20px;
  border-radius: 30px;
  position: relative;
`;
const TitleSearch = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  border-width: 0;
  font-size: 16px;
  border-radius: 30px;
  outline: none;
  border: 1px solid #d9d9d9;
`;
const SearchIcon = styled.button`
  position: absolute;
  top: 5px;
  right: -10px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-image: url("img/search.svg");
`;

const PostgoWrite = styled.button`
  width: 344px;
  height: 60px;
  text-align: center;
  border-radius: 30px;
  font-size: 22px;
  background-color: #ffa314;
  color: #fff;
  margin-left: 20px;
  &:hover {
    opacity: 0.8;
  }
`;

const PostLikeBestbox = styled.div`
  width: 100%;
  height: auto;
`;
