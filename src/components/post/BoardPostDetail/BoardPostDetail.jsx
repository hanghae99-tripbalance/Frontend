import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as St from "./BoardPostDetailStyle";
import Topbutton from "../../common/button/TopButton";
import "./BoardPostDetail.css";
import {
  __getComment,
  __postComment,
} from "../../../redux/modules/CommentSlice";
import { useParams } from "react-router-dom";
import {
  __getBoardDetail,
  __getmypost,
  __deleteBoard,
  __boardlike,
} from "../../../redux/modules/BoardSlice";
import { useNavigate } from "react-router-dom";

import PostComment from "../PostComment/PostComment";
import BoardMypost from "../BoardMypost/BoardMypost";
import Footer from "../../common/Footer";

const BoardPostDetail = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [comment, setcomment] = useState("");
  const [cmtcount, setcmtcount] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const DefaultImega = "../img/board/default2.jpg";
  const heartsvg = "../img/board/heart.svg";
  const binheartsvg = "../img/board/binheart.svg";
  const DefaultCmtImg = "../img/board/cmtdefault.svg";

  const post = useSelector((state) => state.BoardSlice.post);
  const isLoading = useSelector((state) => state.BoardSlice.isLoading);
  const mypost = useSelector((state) => state.BoardSlice.myposts);
  const comments = useSelector((state) => state.commentSlice.comments);
  const render = useSelector((state) => state.rootReducer.profilebtn.lender);

  const nickname = sessionStorage.getItem("nickName");

  const [heart, setHeart] = useState(false);
  const [heartnum, setheartnum] = useState();
  const [commentImg, setcommentImg] = useState();
  const [mypostready, setmypostready] = useState(false);

  useEffect(() => {
    dispatch(__getBoardDetail(id));
  }, []);

  useEffect(() => {}, [render]);

  useEffect(() => {
    if (post == null) {
    } else {
      dispatch(__getmypost(post?.authorId));
      setmypostready(true);
    }
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
      alert(max_length + "??? ?????? ???????????? ????????????.");
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

  const Reg = /^\s+|\s+$/g;

  //????????????
  const WriteComment = () => {
    if (Reg.test(comment) || comment == "") {
      alert("????????? ???????????? ??????????????? ???????????? ????????? ????????????.");
    } else {
      dispatch(__postComment({ id, content: comment }));
      setcomment("");
    }
  };

  const modifyPost = () => {
    navigate(`/modify/${id.id}`);
  };
  const DeletePost = () => {
    dispatch(__deleteBoard(id));
  };

  //???????????????## ????????? ?????? ????????? ??????
  //setState??? ?????? ???????????? ????????? ????????????????????? ?????????????????????. update ????????? ??????????????????.

  const Boardpostlike = () => {
    setHeart(!heart);
    dispatch(__boardlike(id.id));

    if (heart) {
      setheartnum(heartnum - 1);
    } else {
      setheartnum(heartnum + 1);
    }
  };

  const goProfile = () => {
    navigate(`/memberpage/${post?.authorId}`);
  };

  const ImgHandlerTest = () => {};

  //????????? ???????????? ??????
  useEffect(() => {
    setTimeout(() => {
      const sliderImg = document.querySelector(".slider__img");
      const sliderInner = document.querySelector(".slider__inner");
      const slider = document.querySelectorAll(".slider");
      const sliderBtn = document.querySelector(".slider__btn");
      const sliderBtnPrev = sliderBtn.querySelector(".prev");
      const sliderBtnNext = sliderBtn.querySelector(".next");
      const sliderDot = document.querySelector(".slider__dot");
      let currentIndex = 0;
      let sliderWidth = sliderImg.offsetWidth; //????????? ?????? ???
      let sliderLength = slider.length; //????????? ??????
      let sliderFirst = slider[0]; //??? ?????? ?????????
      let sliderLast = slider[sliderLength - 1]; //????????? ?????????
      let cloneFirst = sliderFirst.cloneNode(true); //??? ?????? ????????? ??????
      let cloneLast = sliderLast.cloneNode(true); //????????? ????????? ??????
      let dotIndex = "";
      let sliderTimer = "";
      let interval = 3000;

      //????????? ??????
      sliderInner.appendChild(cloneFirst);
      sliderInner.insertBefore(cloneLast, sliderFirst);

      //??? ?????? ??????
      function dotInit() {
        for (let i = 0; i < sliderLength; i++) {
          dotIndex += "<div class='dot'></div>";
        }
        dotIndex += "<div class='play'>play</div>";
        dotIndex += "<div class='stop show'>stop</div>";
        sliderDot.innerHTML = dotIndex;
        sliderDot.firstElementChild.classList.add("active");
      }
      dotInit();

      const dotActive = document.querySelectorAll(".slider__dot .dot");
      //????????? ????????????
      function gotoSlider(index) {
        dotActive.forEach((el) => {
          el.classList.remove("active");
        });

        if (index == sliderLength) {
          dotActive[0].classList.add("active");
        } else {
          dotActive[index]?.classList.add("active");
        }

        sliderInner.classList.add("transition");
        sliderInner.style.left = -sliderWidth * (index + 1) + "px";

        currentIndex = index;

        //??? ?????? ????????? : left: -2880px
        //??? ?????? ????????? : left: -4320px ...
      }

      //????????? ??????
      document.querySelectorAll(".slider__dot .dot").forEach((dot, index) => {
        dot.addEventListener("click", () => {
          gotoSlider(index);
        });
      });
      //???????????? ??????
      document.querySelectorAll(".ImgPreview").forEach((dot, index) => {
        dot.addEventListener("click", () => {
          gotoSlider(index);
        });
      });

      //????????????
      function autoPlay() {
        sliderTimer = setInterval(() => {
          if (document.querySelectorAll(".ImgPreview").length == 1) {
          } else {
            if (sliderInner.classList.contains("transition")) {
            } else {
              gotoSlider(currentIndex + 1);
            }
          }
        }, interval);
      }

      //????????????
      function stopPlay() {
        clearInterval(sliderTimer);
      }
      stopPlay();

      //??????
      sliderBtnPrev.addEventListener("click", () => {
        let prevIndex = currentIndex - 1;
        if (sliderInner.classList.contains("transition")) {
        } else {
          gotoSlider(prevIndex);
        }
      });

      //??????
      sliderBtnNext.addEventListener("click", () => {
        let nextIndex = currentIndex + 1;
        if (sliderInner.classList.contains("transition")) {
        } else {
          gotoSlider(nextIndex);
        }
      });

      sliderInner.addEventListener("transitionend", () => {
        sliderInner.classList.remove("transition");
        if (currentIndex == -1) {
          sliderInner.style.left = -(sliderLength * sliderWidth) + "px";
          currentIndex = sliderLength - 1;
        }
        if (currentIndex == sliderLength) {
          sliderInner.style.left = -(1 * sliderWidth) + "px";
          currentIndex = 0;
        }
      });

      sliderInner.addEventListener("mouseenter", () => {
        stopPlay();
      });
      sliderInner.addEventListener(
        "mouseleave",
        () => {
          if (document.querySelector(".play").classList.contains("show")) {
            stopPlay();
          } else {
            autoPlay();
          }
        },
        []
      );

      document.querySelector(".play").addEventListener("click", () => {
        document.querySelector(".play").classList.remove("show");
        document.querySelector(".stop").classList.add("show");
        autoPlay();
      });

      document.querySelector(".stop").addEventListener("click", () => {
        document.querySelector(".stop").classList.remove("show");
        document.querySelector(".play").classList.add("show");
        stopPlay();
      });
    }, 1000);
  }, []);

  const INJECTIONRegex = /[%=*><]/g;
  const RegexTest = (e) => {
    if (INJECTIONRegex.test(e.target.value)) {
      alert("?????? : ????????????(<,>,*,=,%)??? ????????? ???????????????.");
      e.target.value = e.target.value.replace(/[%=*><]/g, "");
    }
  };

  return loading ? null : (
    <St.HeaderContainer>
      <St.BoardPostDetailContainer>
        <St.BoardPostDetailWrap>
          <St.Postnickname>{post?.author} ?????? ???????????????</St.Postnickname>
          <St.ImegeWrap>
            <St.ImegeSlide>
              <div className="slider__wrap">
                <div className="slider__img">
                  <div className="slider__inner">
                    {post?.mediaList[0]
                      ? post?.mediaList.map((item, idx) => {
                          return (
                            <div className="slider" key={idx}>
                              <img className="sliderimg" src={item} alt="" />
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className="slider__btn">
                  <div
                    href="#"
                    className="prev"
                    style={{ background: "url(../img/board/leftarrow.svg)" }}
                  ></div>
                  <div
                    href="#"
                    className="next"
                    style={{ background: "url(../img/board/rightarrow.svg)" }}
                  ></div>
                </div>
                <div className="slider__dot"></div>
              </div>
            </St.ImegeSlide>
            <St.ImegePreview>
              {post &&
                post?.mediaList.map((el, idx) => (
                  <St.PreviewItem
                    className="ImgPreview"
                    key={idx}
                    src={
                      post?.mediaList[idx] ? post?.mediaList[idx] : DefaultImega
                    }
                    alt=""
                    onClick={ImgHandlerTest}
                  />
                ))}
            </St.ImegePreview>
          </St.ImegeWrap>

          <St.BoardcontentWrap>
            <St.BoardContentsbox>
              <St.BoardTitleWrap>
                <St.BoardTitle>{post?.title}</St.BoardTitle>
                <St.TitleButtonWarp>
                  {nickname == post?.author ? (
                    <>
                      <St.ModifyButton onClick={modifyPost}>
                        ??????
                      </St.ModifyButton>
                      <St.DeleteButton onClick={DeletePost}>
                        ??????
                      </St.DeleteButton>
                    </>
                  ) : (
                    <St.UserProfile onClick={goProfile}>
                      ????????? ?????????
                    </St.UserProfile>
                  )}
                </St.TitleButtonWarp>
              </St.BoardTitleWrap>
              <St.UserNameBox>
                <St.BoardCateGory>
                  <St.CateLocal>?????? : {post?.local}</St.CateLocal>
                  <St.CateDetail>?????? : {post?.localdetail}</St.CateDetail>
                </St.BoardCateGory>
                <St.TitleButtonWarpmobile>
                  {nickname == post?.author ? (
                    <>
                      <St.ModifyButton onClick={modifyPost}>
                        ??????
                      </St.ModifyButton>
                      <St.DeleteButton onClick={DeletePost}>
                        ??????
                      </St.DeleteButton>
                    </>
                  ) : (
                    <St.UserProfile onClick={goProfile}>
                      ????????? ?????????
                    </St.UserProfile>
                  )}
                </St.TitleButtonWarpmobile>
              </St.UserNameBox>
              <St.BoardBody>{post?.content}</St.BoardBody>
            </St.BoardContentsbox>
            <St.BoardLike onClick={Boardpostlike}>
              <St.BoardLikeImage
                src={post && heart ? heartsvg : binheartsvg}
                alt=""
              />

              <St.BoardLikeCount>{heartnum}</St.BoardLikeCount>
            </St.BoardLike>
          </St.BoardcontentWrap>

          <St.BoardCommentWrap>
            <St.BoardCommentBox>
              <St.CommentWriteUserBox>
                <St.CommentWriteImg
                  src={commentImg ? commentImg : DefaultCmtImg}
                  alt=""
                />
                <St.CommentWriteUser>{post?.nickName}</St.CommentWriteUser>
              </St.CommentWriteUserBox>
              <St.CommentTextarea
                name=""
                maxLength="200"
                id="comment"
                placeholder="????????? ????????? ?????????."
                value={comment}
                onKeyUp={(e) => {
                  CheckLength(e);
                  RegexTest(e);
                }}
                onChange={CommentHandler}
              />
              <St.CommentButtonBox>
                <St.CommentCount>{cmtcount}</St.CommentCount>
                <St.CommentCount>/200</St.CommentCount>
                <St.CommentWriteButton onClick={WriteComment}>
                  ?????? ??????
                </St.CommentWriteButton>
              </St.CommentButtonBox>
            </St.BoardCommentBox>
            <St.BoardCommentBoxmobile>
              <St.CommentUserboxmobile>
                <St.CommentImgmobile
                  src={commentImg ? commentImg : DefaultCmtImg}
                />
                <St.CommentWriteUser>{post?.nickName}</St.CommentWriteUser>
              </St.CommentUserboxmobile>
              <St.CommentTextarea
                name=""
                maxLength="50"
                id="comment"
                placeholder="????????? ???????????????."
                value={comment}
                onKeyUp={CheckLength}
                onChange={CommentHandler}
              />
              <St.CommentWritebuttonmobile onClick={WriteComment}>
                ??????
              </St.CommentWritebuttonmobile>
            </St.BoardCommentBoxmobile>
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
          </St.BoardCommentWrap>
          {mypostready && <BoardMypost post={post} mypost={mypost} />}
        </St.BoardPostDetailWrap>
      </St.BoardPostDetailContainer>
      <Topbutton />
      <Footer />
    </St.HeaderContainer>
  );
};
export default BoardPostDetail;
