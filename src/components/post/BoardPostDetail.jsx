import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "./BoardPostDetail.css";
import { __getComment, __postComment } from "../../redux/modules/CommentSlice";
import { useParams } from "react-router-dom";
import {
  __getBoardDetail,
  __getmypost,
  __deleteBoard,
  __boardlike,
} from "../../redux/modules/BoardSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import PostComment from "./PostComment";
import BoardMypost from "./BoardMypost";

const BoardPostDetail = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [comment, setcomment] = useState("");
  const [cmtcount, setcmtcount] = useState(0);

  const imagel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [imagelength, setimegelength] = useState(imagel);
  const dispatch = useDispatch();
  const userNickname = sessionStorage.getItem("nickName");
  const [loading, setLoading] = useState(true);

  const ImegaURL = [
    "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com/%EC%BD%9C%EB%A1%9C%EC%84%B8%EC%9B%80.jpg",
    "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com/%EB%93%80%EC%98%A41.jpg",
    "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com/EDO2.jpg",
    "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com/456123.jpg",
  ];
  const DefaultImega = "../img/default1.jpg";
  const DefaultImega2 = "../img/default2.jpg";
  const heartsvg = "/img/heart.svg";
  const binheartsvg = "../img/binheart.svg";
  const DefaultCmtImg = "../img/cmtdefault.svg";

  const post = useSelector((state) => state.BoardSlice.post);
  const isLoading = useSelector((state) => state.BoardSlice.isLoading);
  const mypost = useSelector((state) => state.BoardSlice.myposts);
  const comments = useSelector((state) => state.commentSlice.comments);

  const nickname = sessionStorage.getItem("nickName");

  console.log("나 상세정보", post);
  console.log("나 댓글정보", comments);

  const [heart, setHeart] = useState(false);
  const [heartnum, setheartnum] = useState();
  const [commentImg, setcommentImg] = useState();

  useEffect(() => {
    dispatch(__getBoardDetail(id));
  }, []);

  useEffect(() => {
    if (!isLoading) dispatch(__getmypost(post?.authorId));
  }, [isLoading]);

  useEffect(() => {
    dispatch(__getComment(id));
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setHeart(post?.heartYn);
    setheartnum(post?.heartNum);
    setcommentImg(post?.profileImg);
  }, [post]);

  const CheckLength = (e) => {
    let text = e.target.value;
    let Cmtlength = text.length;
    let max_length = 200;

    if (Cmtlength > max_length) {
      alert(max_length + "자 이상 작성할수 없습니다.");
      text = text.substr(0, max_length);
      e.target.value = text;
      e.target.focus();
      setcmtcount(text);
    }

    setcmtcount(Cmtlength);
  };

  const CommentHandler = (e) => {
    setcomment(e.target.value);
  };

  //댓글쓰기
  const WriteComment = () => {
    dispatch(__postComment({ id, content: comment }));
    setcomment("");
  };
  const modifyPost = () => {
    navigate(`/modify/${id.id}`);
  };
  const DeletePost = () => {
    dispatch(__deleteBoard(id));
  };

  //트러블슈팅## 좋아요 갯수 실시간 변환
  //setState에 바로 연산자를 먹이면 예상결괏값으로 출력되지않는다. update 함수를 넣어줘야한다. 어흥

  const Boardpostlike = () => {
    setHeart(!heart);
    dispatch(__boardlike(id.id));

    if (heart) {
      setheartnum((prevstate) => prevstate - 1);
    } else {
      setheartnum((prevstate) => prevstate + 1);
    }
  };

  const goProfile = () => {
    navigate(`/memberpage/${post?.authorId}`);
  };

  const ImgHandlerTest = () => {};

  return loading ? (
    <Loading />
  ) : (
    <div>
      <BoardPostDetailContainer>
        <BoardPostDetailWrap>
          <Postnickname>{post?.author} 님의 여행이야기</Postnickname>
          <ImegeWrap>
            <ImegeSlide>
              <Swiper
                effect={"cards"}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  // 페이징 적용, 1 2 3 4 5
                  el: ".pagination", // 페이저 버튼 클래스명
                  clickable: true, // 버튼 클릭 여부
                  type: "bullets", // 버튼 모양 결정, bullets, fraction
                  // 등등 ...
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[Navigation, EffectFade, Pagination, Autoplay]}
                className="mySwiper"
                loop={true}
              >
                {post?.mediaList[0] ? (
                  post?.mediaList.map((item, idx) => {
                    return (
                      <SwiperSlide key={idx}>
                        <SliderImage src={item} />
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <SwiperSlide>
                    <SliderImage src={DefaultImega2} />
                  </SwiperSlide>
                )}
              </Swiper>
            </ImegeSlide>
            <ImegePreview>
              {post &&
                post?.mediaList.map((el, idx) => (
                  <PreviewItem
                    key={idx}
                    src={
                      post?.mediaList[idx] ? post?.mediaList[idx] : DefaultImega
                    }
                    alt=""
                    onClick={ImgHandlerTest}
                  />
                ))}
            </ImegePreview>
          </ImegeWrap>

          <BoardcontentWrap>
            <BoardContentsbox>
              <BoardTitleWrap>
                <BoardTitle>{post?.title}</BoardTitle>
                <TitleButtonWarp>
                  {nickname == post?.author ? (
                    <>
                      <ModifyButton onClick={modifyPost}>수정</ModifyButton>
                      <DeleteButton onClick={DeletePost}>삭제</DeleteButton>
                    </>
                  ) : (
                    <UserProfile onClick={goProfile}>글쓴이 프로필</UserProfile>
                  )}
                </TitleButtonWarp>
              </BoardTitleWrap>
              <UserNameBox>
                <BoardCateGory>
                  <CateLocal>지역 : {post?.local}</CateLocal>
                  <CateDetail>도시 : {post?.localdetail}</CateDetail>
                </BoardCateGory>
              </UserNameBox>
              <BoardBody>{post?.content}</BoardBody>
            </BoardContentsbox>
            <BoardLike onClick={Boardpostlike}>
              <BoardLikeImage
                src={post && heart ? heartsvg : binheartsvg}
                alt=""
              />

              <BoardLikeCount>{heartnum}</BoardLikeCount>
            </BoardLike>
          </BoardcontentWrap>

          <BoardCommentWrap>
            <BoardCommentBox>
              <CommentWriteUserBox>
                <CommentWriteImg
                  src={commentImg ? commentImg : DefaultCmtImg}
                />
                <CommentWriteUser>{post?.nickName}</CommentWriteUser>
              </CommentWriteUserBox>
              <CommentTextarea
                name=""
                maxLength="200"
                id="comment"
                value={comment}
                onKeyUp={CheckLength}
                onChange={CommentHandler}
              />
              <CommentButtonBox>
                <CommentCount>{cmtcount}</CommentCount>
                <CommentCount>/200</CommentCount>
                <CommentWriteButton onClick={WriteComment}>
                  댓글 등록
                </CommentWriteButton>
              </CommentButtonBox>
            </BoardCommentBox>
            {comments &&
              comments?.map((item, idx) => (
                <PostComment
                  key={idx}
                  item={item}
                  idx={idx}
                  id={id}
                  post={post}
                />
              ))}
          </BoardCommentWrap>
          <BoardMypost post={post} mypost={mypost} />
        </BoardPostDetailWrap>
      </BoardPostDetailContainer>
    </div>
  );
};
export default BoardPostDetail;

const BoardContentsbox = styled.div`
  width: 100%;
  padding: 80px;
`;
const BoardcontentWrap = styled.div`
  border: 3px solid #d9d9d9;
  width: 100%;
  height: auto;
  border-radius: 50px;
  margin-top: 70px;
`;
const CommentWriteUserBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0 20px;
  gap: 10px;
`;
const CommentWriteUser = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const CommentWriteImg = styled.img`
  width: 30px;
  height: 30px;
`;

const UserProfile = styled.div`
  background-color: #333;
  color: #fff;
  padding: 8px 20px;
  cursor: pointer;
`;

const CateLocal = styled.div`
  font-size: 22px;
  font-weight: lighter;
`;
const CateDetail = styled.div`
  font-size: 22px;
  font-weight: lighter;
`;

const Postnickname = styled.div`
  font-size: 36px;
  margin-bottom: 25px;
  font-weight: bold;
`;

const UserNameBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CommentCount = styled.span`
  font-size: 20px;
  color: #777777;
`;
const CommentWriteButton = styled.button`
  border-left: 1px solid #b0b0b0;
  padding: 20px 60px;
  margin-left: 20px;
  color: #777777;
  font-size: 20px;
`;

const CommentButtonBox = styled.div`
  width: 100%;
  border-top: 1px solid #b0b0b0;
  display: flex;
  justify-content: right;
  margin-top: 10px;
  align-items: center;
`;

const CommentTextarea = styled.textarea`
  height: 80px;
  width: 95%;
  resize: none;
  border: none;
  font-size: 16px;
  outline: none;
  font-size: 16px;
  margin-top: 10px;
  margin-left: 20px;
`;

const BoardCommentBox = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #b0b0b0;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const BoardCommentWrap = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 50px;
`;

const BoardLikeCount = styled.div`
  margin-left: 10px;
`;
const BoardLikeImage = styled.img``;

const BoardLike = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid #cdcdcd;
  align-items: center;
  margin: 0 auto 50px;
`;

const BoardBody = styled.div`
  margin-top: 40px;
  width: 100%;
  min-height: 400px;
  font-weight: lighter;
  font-size: 24px;
`;

const BoardCateGory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DeleteButton = styled.div`
  font-size: 24px;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const ModifyButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  &:hover {
    opacity: 0.5;
  }
`;

const TitleButtonWarp = styled.div`
  display: flex;
  margin-right: 10rem;
`;

const BoardTitle = styled.h2`
  font-size: 36px;
`;

const BoardTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
`;

const BoardPostDetailContainer = styled.div`
  max-width: 1440px;
  width: 95%;
  margin: 150px auto;
`;
const BoardPostDetailWrap = styled.div`
  width: 100%;
`;

const ImegeWrap = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
`;

const ImegeSlide = styled.div`
  width: 100%;
  height: 600px;
`;

const SliderImage = styled.img`
  border-radius: 50px;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ImegePreview = styled.div`
  width: 100%;
  display: flex;
  height: 150px;
  margin-top: 20px;
  gap: 10px;
`;

const PreviewItem = styled.img`
  max-width: 135px;
  width: 100%;
  flex: 1;
  height: 100%;
  border-radius: 30px;
  object-fit: cover;
`;
