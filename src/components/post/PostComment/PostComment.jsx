import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __deleteComment,
  __modifyComment,
  __postReComment,
} from "../../../redux/modules/CommentSlice";
import * as St from "./PostCommentStyle";
import Recomment from "../Recomment/Recomment.jsx";
import { useNavigate } from "react-router-dom";

const PostComment = ({ idx, item, id, post }) => {
  const navigator = useNavigate();

  const lender = useSelector((state) => state.rootReducer.profilebtn.lender);

  const nickname = sessionStorage.getItem("nickName");
  const cmtnick = item.author;

  const UserDefaultImage = "../img/board/tb.jpg";

  const [Editcomment, setEditcomment] = useState("");
  const [Editmode, setEditmode] = useState(false);
  const [RecommentWrite, setRecommentWrite] = useState(false);
  const [recomment, setrecomment] = useState("");
  const [UserImage, setUserImage] = useState("");
  const [Editprofile, setEditprofile] = useState(false);
  const [CommentImg, setCommentImg] = useState("");
  const [Editprofile2, setEditprofile2] = useState(false);
  const [time, settime] = useState();

  useEffect(() => {
    if (item.profileImg == null) {
      setUserImage(UserDefaultImage);
    } else {
      setUserImage(item.profileImg);
    }
  }, []);

  useEffect(() => {
    if (post.profileImg == null) {
      setCommentImg(UserDefaultImage);
    } else {
      setCommentImg(post.profileImg);
    }
  }, []);

  useEffect(() => {
    setEditcomment(item.content);
  }, []);

  const dispatch = useDispatch();

  const ModifyCancel = () => {
    setEditmode(!Editmode);
  };
  const ModifyComment = () => {
    setEditmode(!Editmode);
  };
  const DeleteComment = () => {
    dispatch(__deleteComment(item.commentId));
  };

  const ReCommentHandler = (e) => {
    setrecomment(e.target.value);
  };

  const ModifyComplete = () => {
    dispatch(
      __modifyComment({
        id: item.commentId,
        postId: id.id,
        content: Editcomment,
      })
    );
    setEditmode(!Editmode);
  };

  const ReWriteHandler = () => {
    setRecommentWrite(!RecommentWrite);
  };

  const ChangeEdit = (e) => {
    setEditcomment(e.target.value);
  };

  const Reg = /^\s+|\s+$/g;

  const WriteReComment = () => {
    if (Reg.test(recomment) || recomment == "") {
      alert("????????? ???????????? ??????????????? ???????????? ????????? ????????????.");
    } else {
      dispatch(
        __postReComment({
          commentId: item.commentId,
          content: recomment,
        })
      );
      setRecommentWrite(!RecommentWrite);
      setrecomment("");
    }
  };

  const profile = () => {
    setEditprofile2(!Editprofile2);
    dispatch({ type: "BTN_TOGGLE" });
    settime(new Date());
  };

  const CalcelComment = () => {
    setRecommentWrite(!RecommentWrite);
  };

  const goprofile = () => {
    navigator(`/memberpage/${item.authorId}`);
  };
  const INJECTIONRegex = /[%=*><]/g;
  const RegexTest = (e) => {
    if (INJECTIONRegex.test(e.target.value)) {
      alert("?????? : ????????????(<,>,*,=,%)??? ????????? ???????????????.");
      e.target.value = e.target.value.replace(/[%=*><]/g, "");
    }
  };

  useEffect(() => {
    //????????????
    var now = new Date();
    //????????????
    var writeDay = new Date(time);

    //?????? ????????? ??????????????? ????????? getTime??? ?????? ?????????
    var difference = now.getTime() - writeDay.getTime();
    //?????? ????????????
    // difference = Math.trunc(difference / 1000);

    // ???
    const seconds = 1;
    // ???
    const minute = seconds * 60;
    // ???
    const hour = minute * 60;
    // ???
    const day = hour * 24;
    // ???
    const mon = day * 30;
    // ???
    const year = mon * 12;

    let ResultTime = "";

    if (difference < seconds) {
      ResultTime = "??????"; // 1????????? ????????? ?????? ???
    } else if (difference < minute) {
      ResultTime = Math.trunc(difference / seconds) + "??? ";
      //????????? ????????? ???????????????
    } else if (difference < hour) {
      ResultTime = Math.trunc(difference / minute) + "??? ";
      //????????? ????????? ???????????????
    } else if (difference < day) {
      ResultTime = Math.trunc(difference / hour) + "??? ";
      //????????? ????????? ??????????????????
    } else if (difference < mon) {
      ResultTime = Math.trunc(difference / day) + "??? ";
      //????????? ????????? ?????? ?????????
    } else if (difference < year) {
      ResultTime = Math.trunc(difference / mon) + "??? ";
      //????????? ????????? ???????????????
    } else {
      ResultTime = Math.trunc(difference / year) + "??? ";
    }

    if (difference > 15) {
      setEditprofile2(false);
    }
  }, [lender]);

  return (
    <>
      <St.CommentWrap>
        <St.CommentBox>
          <St.CommentUserBox>
            <div>
              <St.CommentUserImage src={UserImage} alt="" />
            </div>
            <St.CommentUser onClick={profile}>{item.author}</St.CommentUser>
            {Editprofile2 ? (
              <St.UserMypagego onClick={goprofile}>???????????????</St.UserMypagego>
            ) : null}
          </St.CommentUserBox>
          <St.Commentbody>
            {Editmode ? (
              <St.CommentModifyinput
                type="text"
                maxLength="200"
                onChange={ChangeEdit}
                value={Editcomment}
                onKeyUp={RegexTest}
              />
            ) : (
              <St.Commentdesc>{item?.content}</St.Commentdesc>
            )}
          </St.Commentbody>
          <St.CommentButtonBox>
            <St.CommentButton onClick={ReWriteHandler}>??????</St.CommentButton>
            {cmtnick == nickname && (
              <>
                {Editmode ? (
                  <St.CommentButton onClick={ModifyCancel}>
                    ??????
                  </St.CommentButton>
                ) : (
                  <St.CommentButton onClick={ModifyComment}>
                    ??????
                  </St.CommentButton>
                )}
                {Editmode ? (
                  <St.CommentButton onClick={ModifyComplete}>
                    ??????
                  </St.CommentButton>
                ) : (
                  <St.CommentButton onClick={DeleteComment}>
                    ??????
                  </St.CommentButton>
                )}
              </>
            )}
          </St.CommentButtonBox>
        </St.CommentBox>
      </St.CommentWrap>
      {RecommentWrite ? (
        <St.BoardReCommentBox>
          <St.CommentWriteUserBox>
            <St.CommentWriteImg src={CommentImg} alt="" />
            <St.CommentWriteUser>{post?.nickName}</St.CommentWriteUser>
          </St.CommentWriteUserBox>
          <St.ReCommentTextarea
            name=""
            maxLength="50"
            value={recomment}
            onChange={ReCommentHandler}
            onKeyUp={RegexTest}
          />
          <St.CommentBtnBox>
            <St.CommentBtn onClick={CalcelComment}>??????</St.CommentBtn>
            <St.CommentBtn onClick={WriteReComment}>??????</St.CommentBtn>
          </St.CommentBtnBox>
        </St.BoardReCommentBox>
      ) : null}
      {item.reComments?.map((el, idx) => (
        <Recomment key={idx} item={el} cmtid={item.commentId} />
      ))}
    </>
  );
};

export default PostComment;
