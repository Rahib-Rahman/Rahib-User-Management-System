import api from './axios';

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const updateUsersStatus = async (ids, status) => {
    const response = await api.patch('/users/status', { ids, status });
    return response.data;
};

export const deleteUsers = async (ids) => {
    const response = await api.delete('/users', { data: { ids } });
    return response.data;
};

export const deleteUnverified = async () => {
    const response = await api.delete('/users/unverified/all');
    return response.data;
};

// Email verification emulation
export const verifyEmailEmulation = async () => {
    const response = await api.post('/users/verify-email-emulation');
    return response.data;
};
