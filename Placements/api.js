import axios from 'axios';

const API_URL = 'http://localhost:5173';

const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};

export { signup };

