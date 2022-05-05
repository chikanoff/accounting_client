import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/admin/suppliers`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/admin/suppliers/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/admin/suppliers`, data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const update = async (id, data) => {
  try {
    const res = await FetchAPI.put(`/admin/suppliers/${id}`, data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const suppliersResource = {
  getAll,
  deleteById,
  create,
  update,
};

export default suppliersResource;
