import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AWS from "aws-sdk";
import { useParams } from "react-router-dom";
import {
  __getBoardDetail,
  __modifyBoard,
} from "../../redux/modules/BoardSlice";
import Loading from "../Loading/Loading";

const BoardPostModify = () => {
  const dispatch = useDispatch();
  const [FileLink, setFileLink] = useState(null);
  const DefaultImega = "../img/default1.jpg";
  const [ImgPreview, setImgPreview] = useState([]);
  const [Pet, setPet] = useState(0);
  const [contents, setcontents] = useState();
  const [Cate, setCate] = useState("0");
  const [Category, setCategory] = useState();
  const [Category2, setCategory2] = useState();
  const formoon = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const id = useParams();
  const mediaList = useSelector((state) => state.BoardSlice.post?.mediaList);
  const post = useSelector((state) => state.BoardSlice.post);
  const isLoading = useSelector((state) => state.BoardSlice.isLoading);
  const [loading, setloading] = useState(true);
  const [ModalEdit, setModalEdit] = useState(false);
  const imagewrite = "../img/imagewrite.jpg";
  const noimage = "../img/noimage.jpg";

  let localint = "";
  let localdetailint = "";
  const catetwoRef = useRef();

  //지역 숫자변환
  switch (post?.local) {
    case "수도권":
      localint = 1;
      break;
    case "경상_강원도":
      localint = 2;
      break;
    case "충청_전라도":
      localint = 3;
      break;
    case "제주도":
      localint = 4;
      break;
    case "기타":
      localint = 5;
      break;
    default:
      localint = 0;
  }
  //지역2 숫자변환
  switch (post?.localdetail) {
    case "서울":
      localdetailint = 1;
      break;
    case "인천":
      localdetailint = 2;
      break;
    case "가평":
      localdetailint = 3;
      break;
    case "용인":
      localdetailint = 4;
      break;
    case "파주":
      localdetailint = 5;
      break;
    case "속초":
      localdetailint = 6;
      break;
    case "강릉":
      localdetailint = 7;
      break;
    case "춘천":
      localdetailint = 8;
      break;
    case "양양":
      localdetailint = 9;
      break;
    case "평창":
      localdetailint = 10;
      break;
    case "부산":
      localdetailint = 11;
      break;
    case "거제":
      localdetailint = 12;
      break;
    case "통영":
      localdetailint = 13;
      break;
    case "포항":
      localdetailint = 14;
      break;
    case "경주":
      localdetailint = 15;
      break;
    case "안동":
      localdetailint = 16;
      break;
    case "여수":
      localdetailint = 17;
      break;
    case "목포":
      localdetailint = 18;
      break;
    case "담양":
      localdetailint = 19;
      break;
    case "보성":
      localdetailint = 20;
      break;
    case "해남":
      localdetailint = 21;
      break;
    case "전주":
      localdetailint = 22;
      break;
    case "천안":
      localdetailint = 23;
      break;
    case "태안":
      localdetailint = 24;
      break;
    case "보령":
      localdetailint = 25;
      break;
    case "공주":
      localdetailint = 26;
      break;
    case "단양":
      localdetailint = 27;
      break;
    case "대구":
      localdetailint = 28;
      break;
    case "대전":
      localdetailint = 29;
      break;
    case "광주":
      localdetailint = 30;
      break;
    case "울산":
      localdetailint = 31;
      break;
    case "서귀포":
      localdetailint = 32;
      break;
    case "기타":
      localdetailint = 33;
      break;
    default:
      localint = 0;
  }

  useEffect(() => {
    setCategory(localint);
    setCategory2(localdetailint);
  }, [localint, localdetailint]);

  useEffect(() => {
    if (!isLoading) {
      setloading(false);
    }
  }, [isLoading]);

  let data = [];

  //트러블슈팅 ##
  //setState는 즉각적으로 업데이트하지않고 promise를 통해 비동기적으로 변경시키므로
  //반복문이 끝나기전까지는 state가 변경되지않는다. 1번부터 4번까지라면, 4번째 데이터만 state에 반영된다.
  //변수에 담아서 해결
  useEffect(() => {
    if (mediaList) {
      for (let x in mediaList) {
        const imgURL = mediaList[x];
        data = [...data, { imgURL }];
        setImgPreview(data);
        setFileLink(mediaList[0]);
        console.log("이미지주소", imgURL);
        console.log(x);
        console.log(data);
      }
    }
  }, [mediaList]);

  console.log(data);
  console.log(mediaList);
  console.log(ImgPreview);

  useEffect(() => {
    if (localint) {
      setCate(localint);
      console.log("test", localdetailint);
    }
  }, [localint]);

  console.log(localdetailint);

  console.log("어흥", localint);
  console.log("어흥2", localdetailint);

  useEffect(() => {
    dispatch(__getBoardDetail(id));
  }, []);

  useEffect(() => {
    if (post) {
      setcontents({
        title: post?.title,
        content: post?.content,
        local: Category,
        localdetail: Category2,
        pet: post?.Pet,
      });
    }
    setPet(post?.pet);
  }, [post]);
  console.log(Pet);

  console.log(FileLink);

  // 이미지

  const S3URL = "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com";

  //AWS S3 이미지 업로드 도전

  const onFileUpload = async (e) => {
    const ACCESS_KEY = process.env.ACCESS_KEY;
    const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
    const REGION = "ap-northeast-2";
    const S3_BUCKET = "react-image-seongwoo";

    // AWS ACCESS KEY를 세팅합니다.
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    // 버킷에 맞는 이름과 리전을 설정합니다.
    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const file = e.target.files[0];
    console.log(file);
    console.log(file.name);

    const fileName = file.name.replaceAll(" ", "");

    // 파일과 파일이름을 넘겨주면 됩니다.
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    if (ImgPreview.length < 10) {
      await myBucket
        .putObject(params)
        .on("httpUploadProgress", (Progress, Response) => {
          alert("SUCCESS");
          console.log(Response.request.httpRequest.path);
          const imgURL = S3URL + Response.request.httpRequest.path;
          setFileLink(imgURL);
          setImgPreview([...ImgPreview, { imgURL }]);
        })
        .send((err) => {
          if (err) console.log(err);
        });
    } else {
      alert("이미지는 10개까지만 업로드할수있습니다.");
    }
  };
  const PetHandler = () => {
    Pet == 1 ? setPet(0) : setPet(1);
  };

  const onChangeDataHandler = (e) => {
    const { name, value } = e.target;
    setcontents({
      ...contents,
      [name]: value,
    });
  };

  const onCategoryHandler = (e) => {
    const { name, value } = e.target;
    setCategory2(value);
    setcontents({
      ...contents,
      [name]: value,
    });
  };

  const Categoryopen = (e) => {
    const { name, value } = e.target;
    setCate(value);
    setCategory(value);
    setcontents({
      ...contents,
      [name]: value,
    });
  };

  console.log(contents);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      __modifyBoard({
        title: contents?.title,
        content: contents?.content,
        pet: Pet,
        mediaList: ImgPreview,
        category1: +Category,
        category2: +Category2,
        id: id.id,
      })
    );
  };

  // 이미지 누르면 지워지기 + 남아있는 이미지 그림 보여주기
  const [imgremovelength, setimgremovelength] = useState(true);
  const Imageremove = (e) => {
    console.log(e.target.src);
    setImgPreview(ImgPreview.filter((el) => el.imgURL !== e.target.src));
    setimgremovelength(!imgremovelength);
  };
  useEffect(() => {
    for (let x in ImgPreview) {
      setFileLink(ImgPreview[x].imgURL);
      console.log("x", x);
    }
  }, [imgremovelength]);

  const imageremove = (id, i, i2) => {
    console.log(id, i);
    let target = document.getElementById(id);
    console.log(target);
    if (target == null) {
      console.log("123");
    } else {
      console.log("456");
      setImgPreview(ImgPreview.filter((el) => el.imgURL !== target.src));
      if (i) {
        setFileLink(i);
      } else {
        if (i2) {
          setFileLink(i2);
        } else {
          setFileLink(imagewrite);
        }
      }
    }
  };
  const previewchange = (e) => {
    if (e.target.src.includes("img/noimage.jpg")) {
    } else {
      setFileLink(e.target.src);
    }
  };

  console.log(FileLink);

  console.log(Category);
  console.log(Category2);

  let testob = {
    title: contents?.title,
    content: contents?.content,
    pet: Pet,
    mediaList: ImgPreview,
    category1: Category,
    category2: Category2,
    id: id.id,
  };

  console.log(Category2);

  console.log(testob);

  const WriteOut = () => {
    navigator("/post");
  };

  const ModalHandler = () => {
    setModalEdit(!ModalEdit);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <BoardWriteContainer onSubmit={onSubmitHandler}>
        <TitleInput
          name="title"
          type="text"
          placeholder="제목을 입력해주세요."
          maxLength="30"
          value={contents?.title || ""}
          required
          onChange={onChangeDataHandler}
        />
        <BoardContentWrap>
          <BaordWritesection>
            <ImegeSelectBox>
              <ImagePreview src={FileLink} />
              <ImegeInput
                type="file"
                accept="image/*"
                onChange={onFileUpload}
              />
            </ImegeSelectBox>
          </BaordWritesection>

          <BoardButtonsection>
            <Categorysection>
              <CategorySelect
                name="category1"
                id="cate_parent"
                value={Category}
                onChange={Categoryopen}
              >
                <option name="category1" value="0">
                  카테고리를 선택해주세요.
                </option>
                <option name="category1" value="1">
                  수도권
                </option>
                <option name="category1" value="2">
                  경상_강원도
                </option>
                <option name="category1" value="3">
                  충청_전라도
                </option>
                <option name="category1" value="4">
                  제주도
                </option>
                <option name="category1" value="5">
                  기타
                </option>
              </CategorySelect>
              <CategorySelect
                name="category2"
                id="cate_child"
                value={Category2}
                onChange={onCategoryHandler}
                required
              >
                {Cate == 1 && (
                  <>
                    <option name="category2" value="1">
                      서울
                    </option>
                    <option name="category2" value="2">
                      인천
                    </option>
                    <option name="category2" value="3">
                      가평
                    </option>
                    <option name="category2" value="4">
                      용인
                    </option>
                    <option name="category2" value="5">
                      파주
                    </option>
                    <option name="category2" value="33">
                      기타
                    </option>
                  </>
                )}
                {Cate == 2 && (
                  <>
                    <option name="category2" value="6">
                      속초
                    </option>
                    <option name="category2" value="7">
                      강릉
                    </option>
                    <option name="category2" value="8">
                      춘천
                    </option>
                    <option name="category2" value="9">
                      양양
                    </option>
                    <option name="category2" value="10">
                      평창
                    </option>
                    <option name="category2" value="11">
                      부산
                    </option>
                    <option name="category2" value="12">
                      거제
                    </option>
                    <option name="category2" value="13">
                      통영
                    </option>
                    <option name="category2" value="14">
                      포항
                    </option>
                    <option name="category2" value="15">
                      경주
                    </option>
                    <option name="category2" value="16">
                      안동
                    </option>
                    <option name="category2" value="33">
                      기타
                    </option>
                  </>
                )}
                {Cate == 3 && (
                  <>
                    <option name="category2" value="17">
                      여수
                    </option>
                    <option name="category2" value="18">
                      목포
                    </option>
                    <option name="category2" value="19">
                      담양
                    </option>
                    <option name="category2" value="20">
                      보성
                    </option>
                    <option name="category2" value="21">
                      해남
                    </option>
                    <option name="category2" value="22">
                      전주
                    </option>
                    <option name="category2" value="23">
                      천안
                    </option>
                    <option name="category2" value="24">
                      태안
                    </option>
                    <option name="category2" value="25">
                      보령
                    </option>
                    <option name="category2" value="26">
                      공주
                    </option>
                    <option name="category2" value="27">
                      단양
                    </option>
                    <option name="category2" value="33">
                      기타
                    </option>
                  </>
                )}
                {Cate == 4 && (
                  <>
                    <option name="category2" value="32">
                      서귀포
                    </option>
                    <option name="category2" value="33">
                      기타
                    </option>
                  </>
                )}
                {Cate == 5 && (
                  <>
                    <option name="category2" value="28">
                      대구
                    </option>
                    <option name="category2" value="29">
                      대전
                    </option>
                    <option name="category2" value="30">
                      광주
                    </option>
                    <option name="category2" value="31">
                      울산
                    </option>
                    <option name="category2" value="33">
                      기타
                    </option>
                  </>
                )}
              </CategorySelect>
              <PetCheckBox>
                <PetLabel htmlFor="pet">반려동물동반여부</PetLabel>
                <PetCheck type="checkbox" id="pet" onChange={PetHandler} />
              </PetCheckBox>
            </Categorysection>
          </BoardButtonsection>
        </BoardContentWrap>
        <ImegePreviewBox>
          <ImegePreviewWrap>
            {formoon.map((e, i) => (
              <UploadImageBox key={i}>
                <UploadImegePreview
                  key={i}
                  id={ImgPreview[i]?.imgURL}
                  src={ImgPreview[i]?.imgURL ? ImgPreview[i]?.imgURL : noimage}
                  alt=""
                  onClick={previewchange}
                />
                <Imagedelete
                  onClick={() =>
                    imageremove(
                      ImgPreview[i]?.imgURL,
                      ImgPreview[i - 1]?.imgURL,
                      ImgPreview[i + 1]?.imgURL
                    )
                  }
                ></Imagedelete>
              </UploadImageBox>
            ))}
          </ImegePreviewWrap>
          <ImegePreviewtext>
            이미지는 총 10개까지 첨부 할 수 있으며, 맨 처음 이미지가 대표
            이미지로 설정됩니다.
          </ImegePreviewtext>
        </ImegePreviewBox>

        <BoardWriteTextarea
          name="content"
          value={contents?.content}
          cols="30"
          rows="10"
          placeholder="내용을 입력해 주세요."
          required
          onChange={onChangeDataHandler}
        />

        <Buttonsection>
          <WriteButton>등록</WriteButton>
          <Cancelbutton type="button" onClick={ModalHandler}>
            취소
          </Cancelbutton>
        </Buttonsection>
      </BoardWriteContainer>

      {ModalEdit ? (
        <Modal onClick={ModalHandler}>
          <ModalWrap>
            <ModalCont
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <ModalTextbox>
                <div>글 수정을 취소하고 나가시겠습니까?</div>
                <span>작성 내용은 저장되지 않습니다.</span>
              </ModalTextbox>
              <ModalBtnbox>
                <Outbtn onClick={WriteOut}>나가기</Outbtn>
                <Cancelbtn onClick={ModalHandler}>취소</Cancelbtn>
              </ModalBtnbox>
            </ModalCont>
          </ModalWrap>
        </Modal>
      ) : null}
    </>
  );
};

export default BoardPostModify;

const Outbtn = styled.button`
  font-size: 16px;
  background-color: #00c1ec;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
`;
const Cancelbtn = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #777777;
`;

const ModalBtnbox = styled.div`
  display: flex;
  gap: 30px;
`;

const ModalTextbox = styled.div`
  padding: 50px 50px 30px 50px;
  span {
    color: red;
  }
`;

const ModalCont = styled.div`
  height: 200px;
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const ModalWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BoardWriteContainer = styled.form`
  width: 95%;
  max-width: 1440px;
  margin: 100px auto;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const BoardContentWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 5px;
  outline: none;
`;

const BaordWritesection = styled.div`
  width: 100%;
  max-width: 1074px;
  height: auto;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;
const ImagePreview = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ImegeSelectBox = styled.div`
  width: 100%;
  max-width: 1074px;
  height: 300px;
  position: relative;
  border: 4px dashed #cdcdcd;
`;
const ImegeInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  object-fit: contain;
`;
const ImegePreviewBox = styled.div`
  width: 100%;
  max-width: 1440px;
  height: auto;
  display: flex;
  padding: 20px 5px;
  flex-direction: column;
`;
const ImegePreviewWrap = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  gap: 20px;
  justify-content: center;
`;
const ImegePreviewtext = styled.div`
  font-size: 16px;
  color: #b3b3b3;
  margin: 15px 0 0 5px;
`;
const UploadImegePreview = styled.img`
  width: 110px;
  height: 133px;
  object-fit: cover;
  flex: 1;
  border: 2px solid #b3b3b3;
  border-radius: 4px;
`;
const UploadImageBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &:first-child::before {
    content: "대표";
    text-align: center;
    line-height: 2;
    width: 114px;
    height: 40px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    background-color: #00c1ec;
    position: absolute;
    bottom: 4px;
    left: 0;
    border-radius: 4px;
  }
`;
const Imagedelete = styled.div`
  cursor: pointer;
  position: absolute;
  top: -15px;
  right: -3px;
  width: 30px;
  height: 30px;
  border: 1px solid #b3b3b3;
  border-radius: 50%;
  background-image: url(img/imageremove.jpg);
  background-repeat: no-repeat;
  background-size: cover;
`;

const BoardWriteTextarea = styled.textarea`
  width: 99%;
  height: 722px;
  outline: none;
  resize: none;
  border: 2px solid #aaaaaa;
  border-radius: 10px;
  font-size: 17px;
  padding: 10px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const BoardButtonsection = styled.div`
  width: 100%;
  max-width: 344px;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const Categorysection = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const CategorySelect = styled.select`
  appearance: none;
  width: 100%;
  max-width: 344px;
  height: 60px;
  text-align: center;
  font-size: 20px;
  color: #777777;
  border-radius: 10px;
  border: 2px solid #777777;
  background: url(img/category.jpg) no-repeat right 13px center;
`;
const PetCheckBox = styled.div`
  width: 100%;
  max-width: 344px;
  height: 60px;
  border: 2px solid #777777;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const PetCheck = styled.input`
  width: 60px;
  height: 30px;
  position: relative;
  -webkit-appearance: none;
  background: #c6c6c6;
  border-radius: 15px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  &:checked {
    background: #03a9f4;
  }
  &::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    top: 0;
    left: 0;
    background: #fff;
    transform: scale(1.1);
    transition: all 0.5s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  &:checked::before {
    left: 30px;
  }
`;
const PetLabel = styled.label`
  font-size: 20px;
  color: #777777;
`;

const Buttonsection = styled.div`
  width: 100%;
  height: auto;
  gap: 50px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const WriteButton = styled.button`
  font-size: 20px;
  color: #fff;
  background-color: #00c1ec;
  width: 344px;
  height: 60px;
  border-radius: 10px;
`;
const Cancelbutton = styled.button`
  font-size: 20px;
  width: 344px;
  height: 60px;
  border-radius: 10px;
  color: #777777;
  border: 2px solid #777777;
`;
