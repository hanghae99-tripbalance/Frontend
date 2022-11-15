import axios from "axios";
import instance from "../lib/instance";

//
// promise 요청 타임아웃 시간 선언
const TIME_OUT = 300 * 1000;
// 에러 처리를 위한 status 선언
const statusError = {
  status: false,
  headers: {
    error: {
      code: "NO_CONNECTION",
      message: "연결이 원할하지 않습니다. 잠시 후 다시 시도해 주세요",
    },
  },
};
// promise 타임아웃 처리
const timeoutPromise = () => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), TIME_OUT)
  );
};
// promise 요청
const getPromise = async (requestPromise) => {
  return await Promise.race([requestPromise(), timeoutPromise()]);
};
// 백으로 로그인 요청
export const loginUser = async (credentials) => {
  const requestPromise = () => {
    return axios.post(
      "https://coding-kym.shop/tb/login",
      JSON.stringify(credentials),
      {
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  };

  const data = await getPromise(requestPromise).catch(() => {
    return statusError;
  });

  //console.log(data.data.error, data.data.success, data.status);

  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.data.success;
    const code = data.status;
    // const text = status
    //   ? JSON.stringify(data.headers)
    //   : JSON.stringify(data.data.error);
    // const headers = text.length ? JSON.parse(text) : "";
    const userInfo = data.data.data;

    return {
      status,
      code,
      // headers,
      // userInfo,
    };
  } else {
    return statusError;
  }
};

//로그아웃
export const logoutUser = async (credentials) => {
  const requestPromise = () => {
    return instance.post(
      "/tb/logout",
      {},
      {
        headers: credentials,
      }
    );
  };

  const data = await getPromise(requestPromise).catch(() => {
    return statusError;
  });
  //console.log(data.status);
  if (parseInt(Number(data.status) / 100) === 2) {
    console.log("Start Logout!");
    const status = true;
    const code = data.status;
    const text = JSON.stringify(data.headers);
    const headers = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      headers,
    };
  } else {
    return statusError;
  }
};

export const requestToken = async (credentials) => {
  const requestPromise = () => {
    return instance.post(
      "https://coding-kym.shop/tb/login",
      {},
      {
        headers: credentials,
      }
    );
  };

  const data = await getPromise(requestPromise).catch(() => {
    return statusError;
  });

  //console.log(data);

  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.data.success;
    const code = data.status;
    const text = status
      ? JSON.stringify(data.headers)
      : JSON.stringify(data.data.error);
    const headers = text.length ? JSON.parse(text) : "";
    const userInfo = data.data.data;

    return {
      status,
      code,
      headers,
      userInfo,
    };
  } else {
    return statusError;
  }
};

// export const signupUser = async (signupInfo) => {
//   const requestPromise = () => {
//     return instance.post("/members/signup", JSON.stringify(signupInfo), {
//       headers: { "Content-Type": "application/json;charset=UTF-8" },
//     });
//   };

//   const data = await getPromise(requestPromise).catch(() => {
//     return statusError;
//   });

//   if (parseInt(Number(data.status) / 100) === 2) {
//     const status = data.data.success;
//     const code = data.status;
//     const text = status
//       ? JSON.stringify(data.headers)
//       : JSON.stringify(data.data.error);
//     const headers = text.length ? JSON.parse(text) : "";

//     return {
//       status,
//       code,
//       headers,
//     };
//   } else {
//     return statusError;
//   }
// };
