import { useDispatch } from "react-redux";
import { restinAPI } from "../config";
import { setuserData } from "../../store/modules/userSlice";
import { setVerifiToken } from "../../store/modules/tokenSlice";
import { useNavigate } from "react-router-dom";

// const user_login = async () => {
//   if (auth_Token === "") {
//     console.log("토큰 없음-로그인 진행");
//   } else {
//     console.log("토큰 발견 > 데이터 내부 토큰으로 로그인 진행");
//     try {
//     } catch (error) {
//       //토큰로그인 오류가 났다고 해서 자동로그인 데이터를 초기화하는게 맞는가?
//       //한번 고민해보자, 그런데 만약 계속 에러가나는 상황이면, 초기화해주는게 오히려 나은데 말이지
//       dispatch(setVerifiToken(""));
//       console.log("토큰 로그인 에러!", error);
//     }
//   }
// };

// const user_register = async (profile) => {
//   const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/auth/register`, {
//     mode: "cors",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(profile),
//   });
//   if (res.status === 200) {
//     const { message, user, newToken } = await res.json();
//     dispatch(setuserData(user.data));
//     //userState에 연결
//     navi("/app/home");
//   } else {
//     console.log(error);
//   }
// };

// const user_tokenAccess = async () => {
//   const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/auth/login`, {
//     mode: "cors",
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: "Bearer " + auth_Token,
//     },
//   });
//   if (res.status === 200) {
//     const awaitRES = await res.json();
//     const resUserData = awaitRES.user.data;
//     dispatch(setuserData(resUserData));
//     dispatch(setVerifiToken(resUserData.security.auth_Token));
//     console.log("토큰 로그인 성공!");
//   } else {
//     dispatch(setVerifiToken(""));
//     console.log("토큰 로그인 실패..");
//   }
// };

// const dispatch = useDispatch();
// export const user_logout = () => {
//   dispatch(setVerifiToken(""));
//   dispatch(setuserData({}));
// };
// export const user_deleteAccount = () => {
//   dispatch();
// };
