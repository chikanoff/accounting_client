import FetchAPI from "./FetchAPI";

export const checkAuth = async () => {
  try {
    const res = await FetchAPI.get(`/auth/check`);
    console.log(res.data);
    return res.data.token;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const res = await FetchAPI.get(`/auth/currentUser`);
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const login = async (username, password) => {
  try {
    const res = await FetchAPI.post(`/auth/signin`, {
      username,
      password,
    });
    const { data } = res;
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const logout = async () => {
  try {
    await FetchAPI.post(`/auth/logout`);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const authResource = {
  login,
  logout,
  checkAuth,
};

export default authResource;
