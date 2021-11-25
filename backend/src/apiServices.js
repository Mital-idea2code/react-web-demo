import axios from "axios";

const mainUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4444" : "";
// axios.interceptors.request
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 405) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

export const adminLogin = (data) => axios.post(`${mainUrl}/admin/login`, data);

export const addService = (data) => {
  return axios.post(`${mainUrl}/service/add`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const editService = (data, id) => {
  console.log(data);
  return axios.put(`${mainUrl}/service/edit/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const listService = () => {
  return axios.get(`${mainUrl}/service/list`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteService = (id) => {
  return axios.delete(`${mainUrl}/service/delete/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const multipleService = (data) => {
  return axios.post(`${mainUrl}/service/multipleService`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const allSettings = () => {
  return axios.get(`${mainUrl}/setting/allSettings`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateSetting = (data, id) => {
  return axios.put(`${mainUrl}/setting/updateSetting/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
