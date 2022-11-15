import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "./BoardPostDetail.css";
import { __postComment } from "../redux/modules/BoardSlice";
import { useParams } from "react-router-dom";
import { __getBoardDetail } from "../redux/modules/BoardSlice";
import { __deleteBoard } from "../redux/modules/BoardSlice";
import { useNavigate } from "react-router-dom";

const BoardPostDetail = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [comment, setcomment] = useState("");
  const [cmtcount, setcmtcount] = useState(0);
  const [Editmode, setEditmode] = useState(false);
  const [Editcomment, setEditcomment] = useState("");
  const imagel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [imagelength, setimegelength] = useState(imagel);
  const dispatch = useDispatch();
  const userNickname = localStorage.getItem("nickName");
  console.log(userNickname);
  const ImegaURL = [
    "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com/%EC%BD%9C%EB%A1%9C%EC%84%B8%EC%9B%80.jpg",
    "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com/%EB%93%80%EC%98%A41.jpg",
    "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com/EDO2.jpg",
    "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com/456123.jpg",
  ];
  const DefaultImega = "../img/default1.jpg";

  const post = useSelector((state) => state.BoardSlice.post);
  const isLoading = useSelector((state) => state.BoardSlice.isLoading);
  const nickname = localStorage.getItem("nickName");

  console.log(isLoading);
  console.log(id.id);

  useEffect(() => {
    dispatch(__getBoardDetail(id));
  }, []);

  console.log(post);

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

  console.log(comment);

  const WriteComment = () => {
    dispatch(__postComment({ id, content: comment }));
  };
  const modifyPost = () => {
    navigate(`/modify/${id.id}`);
  };
  const DeletePost = () => {
    dispatch(__deleteBoard(id));
  };
  const DeleteComment = () => {};

  const ModifyCancel = () => {
    setEditmode(!Editmode);
    //조회값 다시 적용
  };

  const ModifyComment = () => {
    setEditmode(!Editmode);
    setEditcomment("코멘트내용");
  };

  const ChangeEdit = (e) => {
    setEditcomment(e.target.value);
  };

  return (
    <BoardPostDetailContainer>
      <BoardPostDetailWrap>
        <ImegeWrap>
          <ImegeSlide>
            <Swiper
              effect={"fade"}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, EffectFade, Pagination, Autoplay]}
              className="mySwiper"
              loop={true}
            >
              {post &&
                post?.mediaList.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <SliderImage src={item} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </ImegeSlide>
          <ImegePreview>
            {post &&
              imagelength.map((el, idx) => (
                <PreviewItem
                  key={idx}
                  src={
                    post?.mediaList[idx] ? post?.mediaList[idx] : DefaultImega
                  }
                  alt=""
                />
              ))}
          </ImegePreview>
        </ImegeWrap>
        <BoardTitleWrap>
          <BoardTitle>{post?.title}</BoardTitle>
          <TitleButtonWarp>
            {userNickname == post?.nickName ? (
              <>
                <ModifyButton onClick={modifyPost}>수정</ModifyButton>
                <DeleteButton onClick={DeletePost}>삭제</DeleteButton>
              </>
            ) : null}
          </TitleButtonWarp>
        </BoardTitleWrap>
        <UserNameBox>
          <PostUser>{post?.nickName}</PostUser>
          <BoardCateGory>
            지역명 : {post?.local} {post?.localdetail}
          </BoardCateGory>
        </UserNameBox>
        <BoardBody>{post?.content}</BoardBody>
        <BoardLike>
          <BoardLikeImage src="../img/heart.svg" alt="" />
          <BoardLikeCount>0</BoardLikeCount>
        </BoardLike>
        <BoardCommentWrap>
          <BoardCommentBox>
            <CommentWriteUser>{nickname}</CommentWriteUser>
            <CommentTextarea
              name=""
              maxLength="200"
              id="comment"
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
          <CommentListBox>
            <CommentTitlebox>
              <Commentuser>작성자 이름</Commentuser>
              <CommentBtnWrap>
                {Editmode ? (
                  <CommentButton onClick={ModifyCancel}>취소</CommentButton>
                ) : (
                  <CommentButton onClick={ModifyComment}>수정</CommentButton>
                )}
                {Editmode ? (
                  <CommentButton onClick={ModifyComment}>완료</CommentButton>
                ) : (
                  <CommentButton onClick={DeleteComment}>삭제</CommentButton>
                )}
              </CommentBtnWrap>
            </CommentTitlebox>
            <Commentbody>
              {Editmode ? (
                <CommentModifyinput
                  type="text"
                  maxLength="200"
                  onChange={ChangeEdit}
                  value={Editcomment}
                />
              ) : (
                "댓글내용 입니다"
              )}
            </Commentbody>
          </CommentListBox>
        </BoardCommentWrap>
      </BoardPostDetailWrap>
    </BoardPostDetailContainer>
  );
};

export default BoardPostDetail;

const PostUser = styled.div`
  font-size: 18px;
`;

const UserNameBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const CommentModifyinput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 5px;
  height: 25px;
  outline: none;
  overflow: scroll;
`;

const CommentBtnWrap = styled.div``;

const Commentuser = styled.div``;

const CommentButton = styled.button`
  background-color: #333;
  color: white;
  padding: 5px 20px;
  margin-left: 20px;
`;

const CommentTitlebox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Commentbody = styled.div`
  margin-top: 10px;
`;

const CommentListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const CommentCount = styled.span`
  font-size: 18px;
`;
const CommentWriteButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  margin-left: 20px;
`;

const CommentButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 10px;
  align-items: center;
`;

const CommentTextarea = styled.textarea`
  height: 100px;
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #b0b0b0;
  outline: none;
  font-size: 16px;
`;

const CommentWriteUser = styled.div`
  margin-bottom: 10px;
  height: 50px;
  font-size: 19px;
  line-height: 40px;
`;

const BoardCommentBox = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #b0b0b0;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 10px;
`;

const BoardCommentWrap = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const BoardLikeCount = styled.div`
  margin-left: 10px;
`;
const BoardLikeImage = styled.img``;

const BoardLike = styled.div`
  display: flex;
  align-items: center;
`;

const BoardBody = styled.div`
  margin-top: 40px;
  width: 100%;
  min-height: 400px;
`;

const BoardCateGory = styled.div``;

const DeleteButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  margin-left: 20px;
`;
const ModifyButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
`;

const TitleButtonWarp = styled.div``;

const BoardTitle = styled.h2`
  font-size: 30px;
`;

const BoardTitleWrap = styled.div`
  display: flex;
  margin-top: 100px;
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
  width: 100%;
  height: 100%;
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
  border-radius: 10px;
  object-fit: cover;
`;
