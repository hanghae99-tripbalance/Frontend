import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AWS from "aws-sdk";
import { __postBoard } from "../redux/modules/BoardSlice";
import { useParams } from "react-router-dom";
import { __getBoardDetail } from "../redux/modules/BoardSlice";

const BoardPostModify = () => {
  const dispatch = useDispatch();
  const [FileLink, setFileLink] = useState(null);
  const DefaultImega = "img/default1.jpg";
  const [ImgPreview, setImgPreview] = useState([]);
  const [Pet, setPet] = useState(0);
  const [contents, setcontents] = useState();
  const [Cate, setCate] = useState("0");
  const formoon = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const id = useParams();

  const post = useSelector((state) => state.BoardSlice.post);
  const isLoading = useSelector((state) => state.BoardSlice.isLoading);

  console.log(id);
  console.log(post);
  console.log(isLoading);
  console.log(ImgPreview.length);
  console.log(post?.local);

  switch (post?.local) {
    case "수도권":
  }

  useEffect(() => {
    dispatch(__getBoardDetail(id));
  }, []);

  useEffect(() => {
    if (post) {
      setcontents({
        title: post?.title,
        content: post?.content,
        local: post?.local,
        localdetail: post?.localdetail,
        pet: post?.Pet,
      });
    }
  }, [post]);

  // 이미지

  const S3URL = "https://react-image-seongwoo.s3.ap-northeast-2.amazonaws.com";

  //AWS S3 이미지 업로드 도전

  const onFileUpload = async (e) => {
    const ACCESS_KEY = "AKIAXQKS7DPZ7R5C4WNA";
    const SECRET_ACCESS_KEY = "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";
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
    });
  };

  console.log(contents);
  const onSubmitHandler = (e) => {
    e.preventDefault();
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
  };

  const Imageremove = (e) => {
    console.log(e.target.src);
    setImgPreview(ImgPreview.filter((el) => el.imgURL !== e.target.src));
  };

  return (
    <BoardWriteContainer onSubmit={onSubmitHandler}>
      <BoardWriteWrap>
        <WriteTitle>
          <TitleInput
            name="title"
            type="text"
            placeholder="제목을 입력해주세요."
            maxLength="30"
            value={contents?.title || ""}
            required
            onChange={onChangeDataHandler}
          />
        </WriteTitle>
        <ImegeCategoryBox>
          <ImegeBox>
            <ImagePreview src={FileLink} />
            <ImegeTitle>
              업로드 업로드 & 드래그
              <ImegeInput
                type="file"
                name="img"
                accept="image/*"
                onChange={onFileUpload}
              />
            </ImegeTitle>
          </ImegeBox>
          <CategoryWrap>
            <CategoryBox>
              <CategorySelect
                name="category1"
                id="cate_parent"
                value={contents?.local}
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
                value={contents?.localdetail}
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
                <PetCheck
                  type="checkbox"
                  id="pet"
                  checked={false}
                  onChange={PetHandler}
                />
                <PetLabel htmlFor="pet">반려동물</PetLabel>
              </PetCheckBox>
            </CategoryBox>
          </CategoryWrap>
        </ImegeCategoryBox>
        <ImegePreviewBox>
          {formoon.map((e, i) => (
            <UploadImegePreview
              key={i}
              src={ImgPreview[i]?.imgURL ? ImgPreview[i]?.imgURL : DefaultImega}
              alt=""
              onClick={Imageremove}
            />
          ))}
        </ImegePreviewBox>
        <WriteContentBox>
          <WriteContent
            name="content"
            id=""
            value={contents?.content}
            cols="30"
            rows="10"
            placeholder="내용을 입력해 주세요."
            required
            onChange={onChangeDataHandler}
          />
        </WriteContentBox>
        <ButtonWrap>
          <WriteButton>저장</WriteButton>
          <CancleButton type="button">취소</CancleButton>
        </ButtonWrap>
      </BoardWriteWrap>
    </BoardWriteContainer>
  );
};

export default BoardPostModify;
const ImegePreviewBox = styled.div`
  width: 100%;
  height: 100px;
  padding: 20px;
  display: flex;
  gap: 10px;
`;

const UploadImegePreview = styled.img`
  flex: 1;
  width: 91px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

const PetLabel = styled.label`
  font-size: 22px;
  margin-left: 20px;
`;

const PetCheckBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PetCheck = styled.input`
  width: 80px;
  height: 40px;
  position: relative;
  -webkit-appearance: none;
  background: #c6c6c6;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  &:checked {
    background: #03a9f4;
  }
  &::before {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: #fff;
    transform: scale(1.1);
    transition: all 0.5s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  &:checked::before {
    left: 40px;
  }
`;

const ButtonWrap = styled.div`
  text-align: center;
  padding: 20px;
  gap: 20px;
  display: flex;
  justify-content: center;
`;
const WriteButton = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  color: white;
  background-color: #222;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #000;
  }
`;
const CancleButton = styled.button`
  width: 150px;
  height: 50px;
  border: 1px solid #ddd;
  color: 222;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    border: 1px solid #222;
  }
`;

const BoardWriteContainer = styled.form`
  width: 90%;
  max-width: 1000px;
  height: auto;
  min-height: 1000px;
  margin: 0 auto;
  margin-top: 100px;
`;
const BoardWriteWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const WriteTitle = styled.div`
  width: 100%;
  padding: 0 20px;
  text-align: center;
`;
const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid #999;
  padding: 5px;
  outline: none;
`;
const ImegeCategoryBox = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  gap: 20px;
  padding: 20px;
`;
const ImagePreview = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
`;
const ImegeBox = styled.div`
  flex: 2;
  position: relative;
  border: 3px dashed #cdcdcd;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const ImegeTitle = styled.div``;
const ImegeInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  opacity: 0;
`;
const CategoryWrap = styled.div`
  flex: 1;
`;
const CategoryBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
const CategorySelect = styled.select`
  width: 70%;
  height: 50px;
  font-size: 15px;
  color: #999;
  border: 2px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
`;
const WriteContentBox = styled.div`
  width: 100%;
  padding: 0 20px;
`;
const WriteContent = styled.textarea`
  width: 100%;
  min-height: 100px;
  max-height: 500px;
  font-size: 18px;
  outline: none;
  border-radius: 5px;
  resize: none;
  border: 1px solid #999;
  padding: 10px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
