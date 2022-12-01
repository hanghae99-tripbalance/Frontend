import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import AWS from "aws-sdk";
import { __postBoard } from "../../redux/modules/BoardSlice";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [FileLink, setFileLink] = useState(null);
  const DefaultImega = "img/default1.jpg";
  const [ImgPreview, setImgPreview] = useState([]);
  const [Pet, setPet] = useState(0);
  const [contents, setcontents] = useState();
  const [Cate, setCate] = useState("0");
  const formoon = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [ModalEdit, setModalEdit] = useState(false);

  console.log(ImgPreview.length);

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
          console.log("123", imgURL);
          setImgPreview([...ImgPreview, { imgURL }]);
        })
        .send((err) => {
          if (err) console.log(err);
        });
    } else {
      alert("이미지는 10개까지만 업로드할수있습니다.");
    }
  };
  console.log(ImgPreview);

  useEffect(() => {
    setFileLink(imagewrite);
  }, []);

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
    setcontents({
      ...contents,
      [name]: value,
    });
  };

  const Categoryopen = (e) => {
    const { name, value } = e.target;
    setCate(value);
    setcontents({
      ...contents,
      [name]: value,
      category2: undefined,
    });
  };

  console.log(contents);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (contents?.category2 == undefined || contents?.category2 == 0) {
      alert("카테고리를 선택해주세요.");
    }
    if (ImgPreview == 0) {
      alert("사진이 없으면 글쓰기가 불가능합니다.");
    } else {
      dispatch(
        __postBoard({
          title: contents?.title,
          content: contents?.content,
          local: contents?.category1,
          localdetail: contents?.category2,
          mediaList: ImgPreview,
          pet: Pet,
        })
      );
    }
  };

  console.log(contents?.category2);

  const imagewrite = "img/imagewrite.jpg";
  const noimage = "img/noimage.jpg";

  // console.log(
  //   contents?.title,
  //   contents?.content,
  //   contents?.category1,
  //   contents?.category2,
  //   ImgPreview,
  //   Pet
  // );

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

  const WriteOut = () => {
    navigator("/post");
  };

  const ModalHandler = () => {
    setModalEdit(!ModalEdit);
  };

  return (
    <>
      <BoardWriteContainer onSubmit={onSubmitHandler}>
        <TitleInput
          name="title"
          type="text"
          placeholder="제목을 입력해주세요."
          maxLength="30"
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
                onChange={onCategoryHandler}
                required
              >
                {Cate == 1 && (
                  <>
                    <option name="category2" value="0">
                      카테고리를 선택해주세요.
                    </option>
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
                    <option name="category2" value="0">
                      카테고리를 선택해주세요.
                    </option>
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
                    <option name="category2" value="0">
                      카테고리를 선택해주세요.
                    </option>
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
                    <option name="category2" value="0">
                      카테고리를 선택해주세요.
                    </option>
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
                    <option name="category2" value="0">
                      카테고리를 선택해주세요.
                    </option>
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
          id=""
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
                <div>글 작성을 그만두고 나가시겠습니까?</div>
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

export default BoardWrite;

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
