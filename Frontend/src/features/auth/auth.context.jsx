import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

// Use the URL from Vercel environment variables
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://gen-ai-backend-u7rz.onrender.com",
    withCredentials: true 
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await api.get("/api/auth/get-me");
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post("/api/auth/login", { email, password });
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Login failed" };
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await api.post("/api/auth/register", { username, email, password });
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Registration failed" };
        }
    };

    const logout = async () => {
        try {
            await api.get("/api/auth/logout");
            setUser(null);
        } catch (err) {
            console.error("Logout error", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, api }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);