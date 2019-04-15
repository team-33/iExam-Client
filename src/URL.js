export const  BASE_BACKEND_URL=process.env.NODE_ENV === "development1" ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND_URL;

export const GOOGLE_SIGN_IN_API=BASE_BACKEND_URL + '/auth/google';
