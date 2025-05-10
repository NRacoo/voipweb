"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginComponent } from "./login/page";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    
    if (authStatus === "true") {
      setIsAuthenticated(true);
      router.push("/dashboard");
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  // Handle login success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login page directly on the main page
  if (isAuthenticated === false) {
    return <LoginComponent onLoginSuccess={handleLoginSuccess} />;
  }

  // This will briefly show while redirecting to dashboard
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-600">Mengarahkan ke Dashboard...</p>
      </div>
    </div>
  );
}