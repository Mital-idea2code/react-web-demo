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
  }
);

export const getSetting = () => {
  return axios.get(`${mainUrl}/service/topServices`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
