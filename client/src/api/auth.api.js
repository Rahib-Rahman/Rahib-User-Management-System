import instanceAxios from "./axios.js";

export const register = async (data) => {
    const response = await instanceAxios.post('/register', data);
    return response.data;
};

export const login = async (data) => {
    const response = await instanceAxios.post('/login', data);
    return response.data;
};
