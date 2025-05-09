"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DialPad from "../components/dialpad"
import CallHistory from "../components/call-history"
import AboutSection from "../components/about"

export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Check if user is authenticated
        const authStatus = localStorage.getItem("isAuthenticated")
        if (authStatus !== "true") {
        router.push("/login")
        } else {
        setIsAuthenticated(true)
        }
    }, [router])

    if (!isAuthenticated) {
        return null // Don't render anything while checking authentication
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
    )
    }
