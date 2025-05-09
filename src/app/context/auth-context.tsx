    "use client";

    import { createContext, useContext, useState, useEffect, ReactNode } from "react";

    // Define user type
    type User = {
    phoneNumber: string;
    name?: string;
    loginTime: string;
    };

    // Define auth context type
    type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (phoneNumber: string, password: string) => Promise<void>;
    logout: () => void;
    };

    // Create the auth context
    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    // Auth provider component
    export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user data from localStorage on mount
    useEffect(() => {
        const loadUser = () => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated === "true") {
            try {
            const userData = localStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }
            } catch (error) {
            console.error("Failed to parse user data:", error);
            // Clear invalid data
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
            }
        }
        setLoading(false);
        };

        loadUser();
    }, []);

    // Login function
    const login = async (phoneNumber: string, password: string) => {
        setLoading(true);
        
        try {
        // Here you would typically make an API call to verify credentials
        // For this example, we're simulating a successful login
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create user object
        const userData: User = {
            phoneNumber,
            name: "User", // In a real app, this would come from API
            loginTime: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        } catch (error) {
        console.error("Login failed:", error);
        throw error;
        } finally {
        setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }

    // Custom hook to use auth context
    export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
    }