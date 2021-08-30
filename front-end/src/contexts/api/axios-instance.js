import axios from "axios";

const DEV_URL = "http://127.0.0.1:8000";
const STAGING_URL = "http://hr-api.geraldolandre.com";

const baseURL = process.env.NODE_ENV === "development" ? DEV_URL : STAGING_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
});

export { axiosInstance };
