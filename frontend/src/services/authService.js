import api from './api.js';

export async function login(email, password) {
    try {
        const { data } = await api.post('/auth/login', { email, password });
        if (data.success) {
            localStorage.setItem('hackmate_token', data.token);
            return data.user;
        }
        throw new Error(data.message || 'Login failed');
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message || 'Login failed');
    }
}

export async function signup(userData) {
    try {
        const { data } = await api.post('/auth/signup', userData);
        if (data.success) {
            localStorage.setItem('hackmate_token', data.token);
            return data.user;
        }
        throw new Error(data.message || 'Signup failed');
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message || 'Signup failed');
    }
}

export async function getMe() {
    const token = localStorage.getItem('hackmate_token');
    if (!token) return null;
    try {
        const { data } = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (data.success) return data.user;
        return null;
    } catch {
        // Token invalid or expired
        localStorage.removeItem('hackmate_token');
        return null;
    }
}

export async function updateProfile(userData) {
    const token = localStorage.getItem('hackmate_token');
    if (!token) throw new Error("No token");
    try {
        const { data } = await api.put('/auth/profile', userData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (data.success) {
            return data.user;
        }
        throw new Error(data.message || 'Profile update failed');
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message || 'Profile update failed');
    }
}

export function logout() {
    localStorage.removeItem('hackmate_token');
}
