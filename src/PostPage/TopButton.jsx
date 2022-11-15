import { useEffect, useState } from "react";
import styled from "styled-components";

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    console.log(window.scrollY);
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <ScrollContainer>
        <Balance>밸런스게임</Balance>
        <Write>글쓰기</Write>

        <Top id="top" onClick={scrollToTop} type="button">
          Top
        </Top>
      </ScrollContainer>
    )
  );
};

export default TopButton;

const ScrollContainer = styled.div`
  position: fixed;
  right: 3%;
  bottom: 10%;
  z-index: 1;

  width: 80px;
  height: 150px;
`;
const Top = styled.button`
  margin-top: 7px;
  font-weight: bold;
  font-size: 15px;
  height: 70px;
  width: 70px;
  padding: 15px 10px;
  background-color: #d9d9d9;
  color: black;
  border: 1px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  :hover {
    color: rgb(142, 26, 26);
  }
`;
const Write = styled.button`
  border: 1px solid red;
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #d9d9d9;
  color: black;
  border: 1px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  height: 70px;
  margin-top: 8px;
  width: 70px;
  cursor: pointer;
  :hover {
    color: rgb(142, 26, 26);
  }
`;
const Balance = styled.button`
  border: 1px solid red;
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #d9d9d9;
  color: black;
  border: 1px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  height: 70px;
  margin-top: 8px;
  width: 70px;
  cursor: pointer;
  :hover {
    color: rgb(142, 26, 26);
  }
`;
