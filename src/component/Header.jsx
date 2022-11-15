import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "./Layout";
import TripImage from "../img/trip.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import instance from "../lib/instance";
const Header = () => {
  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies();
  const nickname = localStorage.getItem("nickName");
  // console.log(`지금 accessToken: ${accessToken}`);
  // console.log(`지금 refreshToken: ${refreshToken}`);
  async function logout() {
    // 백으로부터 받은 응답
    //ss
    // axios.defaults.headers.post["authorization"] = cookie.Access;
    // axios.defaults.headers.post["refresh-token"] = cookie.Refresh;

    instance
      .post("/tb/logout")
      .then((res) => {
        localStorage.removeItem("nickName");
        removeCookie("token");
        removeCookie("refreshToken");
        console.log(res);
        console.log(cookie);
        alert("로그아웃완료!");
        window.location.reload();
      })
      .catch((err) => {
        alert("잠시만기다려주세요~");
        window.location.reload();
      });
  }

  return (
    <Container>
      <Layout>
        <WriteWrap>
          <Link to="/">
            <Logo
              src={TripImage}
              onClick={() => {
                navigate("/post");
              }}
            />
          </Link>

          <Posting
            onClick={() => {
              navigate("/post");
            }}
          >
            게시판
          </Posting>
          <Trip>추천여행지</Trip>
          <Mypage
            onClick={() => {
              navigate("/mypage");
            }}
          >
            마이페이지
          </Mypage>
          {nickname ? (
            <Logout onClick={logout}>로그아웃</Logout>
          ) : (
            <Login
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Login>
          )}
        </WriteWrap>
      </Layout>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  text-decoration: underline;
  height: 120px;
  background-color: #fff;
  margin: 0 auto;
  text-underline-position: under;
`;
const Logo = styled.img`
  width: 321.06px;
  height: 105.3px;
  display: flex;
`;
const WriteWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 5px;
`;

const Posting = styled.button`
  border-radius: 10px;
  padding: -20px;
  width: 200px;
  margin-top: 56px;
  margin-top: 10px;
  font-size: 24px;
`;
const Trip = styled.button`
  border-radius: 10px;
  width: 200px;
  margin-top: 56px;
  margin-top: 10px;
  font-size: 24px;
`;

const Mypage = styled.button`
  border-radius: 10px;
  width: 200px;
  margin-top: 56px;
  margin-top: 10px;
  font-size: 24px;
`;

const Login = styled.button`
  margin-top: 56px;
  margin-top: 20px;
  font-size: 24px;
  text-decoration: underline;
  align-items: center;
`;

const Logout = styled.button`
  margin-top: 56px;
  margin-top: 20px;
  font-size: 24px;
  text-decoration: underline;
`;

const Wrap = styled.div`
  position: relative;
  top: 30px;
`;
