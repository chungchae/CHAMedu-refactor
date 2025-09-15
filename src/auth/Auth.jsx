const CLIENT_ID = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
