    "use client";

    import { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import DialPad from "../components/dialpad";
    import CallHistory from "../components/call-history";
    import AboutSection from "../components/about";

    export default function DashboardPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        const authStatus = localStorage.getItem("isAuthenticated");
        if (authStatus !== "true") {
        router.push("/");
        } else {
        setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-600">Memuat...</p>
            </div>
        </div>
        );
    }

    return (
        <div className="container py-8">
        <Tabs defaultValue="dialpad" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dialpad">Dial Pad</TabsTrigger>
            <TabsTrigger value="history">Call History</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="dialpad" className="mt-6">
            <DialPad />
            </TabsContent>
            <TabsContent value="history" className="mt-6">
            <CallHistory />
            </TabsContent>
            <TabsContent value="about" className="mt-6">
            <AboutSection />
            </TabsContent>
        </Tabs>
        </div>
    );
    }