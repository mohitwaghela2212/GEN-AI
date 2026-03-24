import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

// Create an axios instance configured for cross-site cookies
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true // Required to send/receive cookies between Vercel and Render
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if the user is logged in when the app starts
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/api/auth/get-me");
                if (response.data.user) {
                    setUser(response.data.user);
                }
            } catch (err) {
                console.log("Not logged in or token expired");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await api.post("/api/auth/login", { email, password });
            setUser(response.data.user);
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Login failed" 
            };
        }
    };

    // Registration function
    const register = async (username, email, password) => {
        try {
            const response = await api.post("/api/auth/register", { username, email, password });
            setUser(response.data.user);
            return { success: true };
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Registration failed" 
            };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await api.get("/api/auth/logout");
            setUser(null);
        } catch (err) {
            console.error("Logout error", err);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            loading, 
            setLoading, 
            login, 
            register, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth more easily in other components
export const useAuth = () => useContext(AuthContext);