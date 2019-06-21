export const BASE_BACKEND_URL = process.env.REACT_APP_BACKEND_TYPE === "local" ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND_URL;

export const GOOGLE_SIGN_IN_API = BASE_BACKEND_URL + '/auth/google';
export const LOCAL_SIGN_IN_API = BASE_BACKEND_URL + '/auth/local/signin';
export const LOCAL_SIGN_UP_API = BASE_BACKEND_URL + '/auth/local/signup';

export const GET_USER_PROFILE_DATA = BASE_BACKEND_URL + '/users/profile';
export const DELETE_USER_PROFILE = BASE_BACKEND_URL + '/users/profile/delete';
export const GET_ALL_USERS = BASE_BACKEND_URL + '/users/all';
export const UPDATE_USER = BASE_BACKEND_URL + '/users/profile/update';

export const GET_PAPERS_API = BASE_BACKEND_URL + '/papers';
export const GET_PAPER_API = BASE_BACKEND_URL + '/papers';
export const DELETE_PAPER_API = BASE_BACKEND_URL + '/papers/delete';
export const INSERT_PAPER_API = BASE_BACKEND_URL + '/papers/new';
