import axios from "axios";

const API_URL = "http://localhost:8080/api/nhan_vien";

export const getNhanVienById = async (maNV) => {
    try {
        const response = await axios.get(`${API_URL}/${maNV}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};
