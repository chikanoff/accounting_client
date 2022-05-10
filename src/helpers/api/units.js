import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/units`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const unitsResource = {
  getAll,
};

export default unitsResource;
