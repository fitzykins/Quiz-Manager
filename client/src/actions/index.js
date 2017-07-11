export const INITIAL = "INITIAL";
export const initial = () => ({
  type:INITIAL
});

export const GET_USER = "GET_USER";
export const getUser = username => ({
  type: GET_USER,
  username
});
