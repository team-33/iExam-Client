export const  BASE_BACKEND_URL=process.env.REACT_APP_BACKEND_TYPE === "local" ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND_URL;

export const GOOGLE_SIGN_IN_API=BASE_BACKEND_URL + '/auth/google';
export const GET_PAPERS_API=BASE_BACKEND_URL + '/papers';
export const GET_PAPER_API=BASE_BACKEND_URL + '/papers';
