import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMemberThunk } from "../redux/modules/Signup";
import Header from "../component/Header";
import LoginPage from "./LoginPage";

function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const password = useRef();
  password.current = watch("password");
  console.log(watch());

  const onSubmit = async (data) => {
    await dispatch(
      addMemberThunk({
        email: data.email,
        nickName: data.name,
        pw: data.password,
        pwConfirm: data.password_confirm,
      })
    ).then((res) => {
      console.log(res);
      alert("회원가입완료!");
      window.location.reload();
    });
  };

  return (
    <div>
      {modal ? (
        <LoginPage />
      ) : (
        <div>
          {/* <Header /> */}
          <div className="auth-wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ textAlign: "center" }}>
                <h3>회원가입</h3>
              </div>
              <label>이메일</label>
              <input
                name="email"
                type="email"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && <p>이메일형식이아닙니다</p>}

              <label>이름</label>
              <input
                name="name"
                {...register("name", { required: true, maxLength: 10 })}
              />
              {errors.name && errors.name.type === "required" && (
                <p>이름 필드는 필수 항목입니다.</p>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <p>입력이 최대 길이를 초과합니다.</p>
              )}

              <label>비밀번호</label>
              <input
                name="password"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern: /[~!@#$%^&*()_+|<>?:{}]/,
                })}
              />
              {errors.password && <p>특수문자를포함해주세요</p>}

              {errors.password && errors.password.type === "minLength" && (
                <p>비밀번호는 8자 이상이어야 합니다</p>
              )}

              <label>비밀번호확인</label>
              <input
                name="password_confirm"
                type="password"
                {...register("password_confirm", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
              />
              {errors.password_confirm &&
                errors.password_confirm.type === "required" && (
                  <p>비밀번호를입력하세요</p>
                )}
              {errors.password_confirm &&
                errors.password_confirm.type === "validate" && (
                  <p>암호가 일치하지 않습니다</p>
                )}

              {errorFromSubmit && <p>{errorFromSubmit}</p>}

              <input type="submit" disabled={loading} />
              <Link
                style={{ color: "gray", textDecoration: "none" }}
                onClick={() => {
                  setModal(!modal);
                }}
              >
                이미 아이디가 있다면...{" "}
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
