import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/medicines/all`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/medicines/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/medicines`, data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const update = async (id, data) => {
  try {
    const res = await FetchAPI.put(`/medicines/${id}`, data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const medicinesResource = {
  getAll,
  deleteById,
  create,
  update,
};

export default medicinesResource;
