import React from "react";
import styled from "styled-components";

const BalanceButton = () => {
  return (
    <Container>
      <Btn>밸런스 게임</Btn>
    </Container>
  );
};

export default BalanceButton;

const Container = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 61.6px;
`;
const Btn = styled.button`
  margin-bottom: 149.9px;
  width: 466.1px;
  height: 98.5px;
  color: white;
  background-color: #00c1ec;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: 24px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;
