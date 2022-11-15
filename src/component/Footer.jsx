import React from "react";
import styled from "styled-components";
import Layout from "./Layout";
const Footer = () => {
  return (
    <Container>
      <Layout>
        <Compeney>
          회사소개 이용약관 개인정보처리방침 여행약관 해외여행자보험 마케팅제휴
          공식인증 예약센터 검색
        </Compeney>
        <Logo>로고</Logo>
        <Information>
          (주)트립밸런스대표 : 송미선, 육경건 주소 : (03161) 서울특별시 종로구
          인사동 5길 41 사업자등록번호 :
          102-81-39440사업자정보확인통신판매업신고번호 : 종로01-1806호관광사업자
          등록번호 : 제1993-000006호 개인정보 보호책임자 : 채철훈 영업보증보험 :
          5000억 1천만원 가입팩스: 02-734-0392이메일 : 15771233@hanatour.com
          고객센터 1577-1233 해외항공권문의 1899-1833
        </Information>
      </Layout>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  background-color: #808080;
  border: 1px solid red;
  height: 432.91px;
`;
const Compeney = styled.div`
  width: 953px;
  height: 24px;
  margin: 0px 434.4px 51.7px 5px;
  font-family: Inter;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  position: relative;
  margin-top: 41.8px;
`;
const Information = styled.div`
  width: 1088px;
  height: 168px;
  margin: 51.7px 0 42.8px 304.4px;
  font-family: Inter;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  position: relative;
  margin-top: 0px;
`;
const Logo = styled.div`
  border: 1px solid red;
  width: 300px;
  position: relative;
  top: 50px;
`;