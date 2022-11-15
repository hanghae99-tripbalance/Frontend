import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "./Layout";
import TripImage from "../image/trip.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookieToken, removeCookieToken } from "../storage/Cookie";
import { logoutUser } from "../login/api/Users";
import { DELETE_TOKEN } from "../redux/modules/Auth";
import axios from "axios";
import { useCookies } from "react-cookie";
import instance from "../login/lib/instance";
const Header = () => {
  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies();

  // console.log(`지금 accessToken: ${accessToken}`);
  // console.log(`지금 refreshToken: ${refreshToken}`);
  async function logout() {
    // 백으로부터 받은 응답

    // axios.defaults.headers.post["authorization"] = cookie.Access;
    // axios.defaults.headers.post["refresh-token"] = cookie.Refresh;
    // localStorage.removeItem("emailId");
    // removeCookie("Access", { path: "/" });
    // removeCookie("Refresh", { path: "/" });

    instance
      .post("/tb/logout")
      .then((res) => {
        console.log(res);
        alert("로그아웃에 성공했습니다.");
        localStorage.removeItem("nickName");
        removeCookie("refreshToken");
        removeCookie("token");
        console.log(cookie);
        // window.location.reload();
      })
      .catch((err) => {
        alert("logout failed");
        console.log(err);
        localStorage.removeItem("nickName");
        removeCookie("refreshToken");
        removeCookie("token");
        // window.location.reload();
      });
  }

  return (
    <Container>
      <Layout>
        <WriteWrap>
          <Logo src={TripImage} />

          <Posting
            onClick={() => {
              navigate("/post");
            }}
          >
            게시판
          </Posting>
          <Trip>추천여행지</Trip>
          <Mypage>마이페이지</Mypage>
          <Login
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Login>
          <Logout onClick={logout}>로그아웃</Logout>
        </WriteWrap>
      </Layout>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 120px;
  background-color: #fff;
  margin: 0 auto;
`;
const Logo = styled.img`
  width: 321.06px;
  height: 105.3px;
  display: flex;
`;
const WriteWrap = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 5px;
`;

const Posting = styled.button`
  margin-top: 56px;
  margin-top: 10px;
  font-size: 24px;
`;
const Trip = styled.button`
  margin-top: 56px;
  margin-top: 10px;
  font-size: 24px;
`;

const Mypage = styled.button`
  margin-top: 56px;
  margin-top: 10px;
  font-size: 24px;
`;

const Login = styled.button`
  margin-top: 56px;
  margin-top: 10px;
  font-size: 24px;
`;

const Logout = styled.button`
  margin-top: 56px;
  margin-top: 10px;
  font-size: 24px;
`;
