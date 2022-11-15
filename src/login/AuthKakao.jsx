const CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const REDIRECT = process.env.REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=code`;
