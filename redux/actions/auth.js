// import FirebaseService from '../../services/FirebaseService';
// import * as actionTypes from '../constants';

// const SignOutUser = () => async (dispatch) => {
//   dispatch({
//     type: actionTypes.LOGOUT_PENDING,
//   });

//   // await FirebaseService.signOutRequest();
//   // await localStorage.clear();
//   // history.push("/");

//   dispatch({
//     type: actionTypes.LOGOUT_SUCCESS,
//   });
// };

// export const signOut = () => (dispatch) => {
//   dispatch(SignOutUser());
// };

// const PresistUser = () => async (dispatch) => {
//   dispatch({
//     type: actionTypes.SIGNIN,
//   });
//   try {
//     const user = await FirebaseService.signInGetUserDetailsRequest(localStorage.getItem(actionTypes.AUTH_TOKEN_ID));
//     // localStorage.setItem(actionTypes.AUTH_USER, JSON.stringify(user.data()));
//     dispatch({
//       type: actionTypes.SIGNIN_SUCCESS,
//       payload: user.data(),
//     });
//     if (user.data().userType === "owner") {
//       // history.push("/owner")
//     } else if (user.data().userType === "admin") {
//       // history.push("/admin")
//     } else {
//       // history.push("/");
//     }
//   } catch(err) {
//     console.log(err);
//     dispatch({
//       type: actionTypes.SIGNIN_ERROR,
//       payload: err,
//     });
//   }
// };

// export const presistUser = () => (dispatch) => {
//   dispatch(PresistUser());
// };

// const SigninUser = (data) => async (dispatch) => {
//   dispatch({
//     type: actionTypes.SIGNIN,
//   });
//   try {
//     const res = await FirebaseService.signInEmailRequest(data.email, data.password);
//     const user = await FirebaseService.signInGetUserDetailsRequest(res.user.uid);
//     // localStorage.setItem(actionTypes.AUTH_TOKEN_ID, res.user.uid);
//     // localStorage.setItem(actionTypes.AUTH_TOKEN, res.user.Aa);
//     // localStorage.setItem(actionTypes.AUTH_USER, JSON.stringify(user.data()));
//     dispatch({
//       type: actionTypes.SIGNIN_SUCCESS,
//       payload: user.data(),
//     });
//     if (data.userType === "regular") {
//       // history.push("/")
//     } else {
//       history.push("/owner");
//     }
//   } catch(err) {
//     console.log(err);
//     dispatch({
//       type: actionTypes.SIGNIN_ERROR,
//       payload: err,
//     });
//   }
// };

// export const signin = (data) => (dispatch) => {
//   dispatch(SigninUser(data));
// };

// const SignupUser = (payload) => async (dispatch) => {
//   dispatch({
//     type: actionTypes.SIGNUP,
//   });

//   try {
//     const res = await FirebaseService.signUpEmailRequest(payload.email, payload.password);
//     const value = { id: res.user.uid, email: payload.email, userType: payload.userType, name: payload.name };
//     await FirebaseService.signUpAddUserDetailsRequest(res.user.uid, value);
//     localStorage.setItem(actionTypes.AUTH_TOKEN_ID, res.user.uid);
//     localStorage.setItem(actionTypes.AUTH_TOKEN, res.user.Aa);
//     localStorage.setItem(actionTypes.AUTH_USER, JSON.stringify(value));
//     dispatch({
//       type: actionTypes.SIGNUP_SUCCESS,
//       payload: value,
//     });
//     if (payload.userType === "regular") {
//       history.push("/")
//     } else {
//       history.push("/owner");
//     }
//   } catch(err) {
//     console.log(err);
//     dispatch({
//       type: actionTypes.SIGNUP_ERROR,
//       payload: err,
//     });
//   }
// };

// export const signup = (data) => (dispatch) => {
//   dispatch(SignupUser(data));
// };
