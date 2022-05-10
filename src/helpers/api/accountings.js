import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/accountings`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/accountings/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/accountings`, data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getByDates = async (startDate, endDate) => {
  try {
    const res = await FetchAPI.get(`/accountings/byDates`, {
      startDate,
      endDate,
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const accountingsResource = {
  getAll,
  deleteById,
  create,
};

export default accountingsResource;
