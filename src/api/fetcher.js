import axios from "axios";

// Setup axios instance - tạo ra cấu hình mặc định
const fetcher = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default fetcher;
