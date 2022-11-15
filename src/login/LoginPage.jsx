import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Signup from "./Signup";
import "./login.css";
import TripImage from "../image/trip.jpg";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import instance from "./lib/instance";
import useInput from "../hooks/useInput";
function LoginPage() {
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail, emailchange] = useInput("");
  const [password, setPassword, pwchange] = useInput("");
  const [cookie, setCookie, removeCookie] = useCookies();
  console.log(watch());

  const onvaled = (event) => {
    event.preventDefault();
    if (email.trim() === "") {
      alert("이메일을 입력해 주세요!");
      return;
    }
    if (password.trim() === "") {
      alert("비밀번호를 입력해 주세요!");
      return;
    }
    // 이메일 비번입력안하면 알럿창
    const LoginValue = {
      email: email,
      pw: password,
    };
    // 서버로 보내줄 로그인값
    const data = instance.post("tb/login", LoginValue).then((res) => {
      // console.log(res)
      // console.log(res.data.data)
      // console.log(res.data.data.email)
      // console.log(res.data.statusMsg)
      // console.log(res.data.statusCode)
      localStorage.setItem("nickName", res.data.data.nickName);
      setCookie("refreshToken", res.request.getResponseHeader("refresh-token"));
      setCookie("token", res.request.getResponseHeader("authorization"));
      if (res.data.statusCode == 0) {
        localStorage.setItem("email", res.data.data.email);
        navigate("/");
        // window.location.reload();
        // 리로드 어떻게하는지 모르겠음.
      } else {
        alert(res.data.statusMsg);
      }
    });
  };

  ////////////////////////////로그인방법1

  //  await dispatch( 방법 2
  //     Add_LoginThunk({
  //       email: data.email,
  //       pw: data.password,
  //     }).then((res) => {
  //       setRefreshToken(res.headers.refresh_token);
  //       //console.log(response.headers.authorization);
  //       dispatch(SET_TOKEN(res.headers.authorization));
  //       //console.log(response.userInfo);

  //       return navigate("/");
  //     })
  //   );

  // axios.post("https://coding-kym.shop/tb/login", data).then((res) => {
  //   if (res.data.success) {
  //     console.log(res.data.data.email);
  //     setCookie("Access", res.request.getResponseHeader("authorization"), {
  //       path: "/",
  //     });
  //     setCookie("Refresh", res.request.getResponseHeader("refresh-token"), {
  //       path: "/",
  //     });
  //     localStorage.setItem("emailId", res.data.data.emailId);
  //     navigate("/");
  //   } else {
  //     setErrorMsg(res.data.error.message);
  //   }
  // });

  return (
    <div>
      {modal ? (
        <Signup />
      ) : (
        <motion.div
          className="loginPage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* <Header /> */}
          <LogoWrap>
            <Logo src={TripImage} />
          </LogoWrap>
          <div className="auth-wrapper">
            <form onSubmit={onvaled}>
              <div style={{ textAlign: "center" }}>
                <h3>로그인</h3>
              </div>
              <label>Email</label>
              <input
                value={email}
                name="email"
                type="email"
                onChange={emailchange}
              />
              {errors.email && <p>이메일은 필수 항목입니다.</p>}

              <label>Password</label>
              <input
                value={password}
                name="password"
                type="password"
                onChange={pwchange}
              />
              {errors.password && errors.password.type === "required" && (
                <p> 비밀번호는 필수 항목입니다.</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p>비밀번호는 6자 이상이어야 합니다</p>
              )}

              {errorFromSubmit && <p>{errorFromSubmit}</p>}

              <input type="submit" disabled={loading} />
              <Link
                style={{ color: "gray", textDecoration: "none" }}
                onClick={() => {
                  setModal(!modal);
                }}
              >
                아직 아이디가 없다면...
              </Link>
            </form>
          </div>
          {/* <Footer /> */}
        </motion.div>
      )}
    </div>
  );
}

export default LoginPage;
const LogoWrap = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 260px;
`;

const Logo = styled.img``;
// 필요할때 모달창쓰기
// import React, { useState } from "react";
// import LoginPage from "./Login";
//
// const Home = () => {
//   const [modal, setModal] = useState(false);

//   return (
//     <div>
//       <button
//         onClick={() => {
//           setModal(!modal);
//         }}
//       >
//         로그인창
//       </button>
//       {modal == true ? <LoginPage /> : ""}
//     </div>
//   );
// };

// export default Home;
