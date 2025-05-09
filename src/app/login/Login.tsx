    "use client";

    import { useState } from "react";
    import { Phone } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

    interface LoginComponentProps {
    onLoginSuccess: () => void;
    }

    export function LoginComponent({ onLoginSuccess }: LoginComponentProps) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Simple validation - you would replace this with your actual authentication logic
        if (phoneNumber.trim().length < 5) {
            throw new Error("Please enter a valid phone number");
        }
        
        // Store authentication data in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("user", JSON.stringify({
            phoneNumber,
            name: "User", // You would get this from your API
            loginTime: new Date().toISOString()
        }));
        
        // Trigger the success callback
        onLoginSuccess();
        } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication failed. Please try again.");
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-8 w-8 text-primary" />
                </div>
            </div>
            <CardTitle className="text-2xl text-center">Bandicall</CardTitle>
            <CardDescription className="text-center">
                Enter your registered phone number to sign in
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
                <div className="space-y-4">
                <div className="space-y-2">
                    <Input
                    id="phoneNumber"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    type="tel"
                    className="text-center text-lg"
                    />
                </div>
                <div className="space-y-2">
                    <Input
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    className="text-center text-lg"
                    />
                </div>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                </div>
            </form>
            </CardContent>
            <CardFooter>
            <p className="text-xs text-center text-muted-foreground w-full">
                By signing in, you agree to our Terms of Services and Privacy Policy
            </p>
            </CardFooter>
        </Card>
        </div>
    );
    }