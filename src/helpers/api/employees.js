import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/admin/employees`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/admin/employees/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/admin/employees`, data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const update = async (id, data) => {
  try {
    const res = await FetchAPI.put(`/admin/employees/${id}`, data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const employeesResource = {
  getAll,
  deleteById,
  create,
  update,
};

export default employeesResource;
