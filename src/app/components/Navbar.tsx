    "use client"

    import { useState, useEffect } from "react"
    import Link from "next/link"
    import { usePathname, useRouter } from "next/navigation"
    import { Button } from "@/components/ui/button"
    import { Phone } from "lucide-react"

    export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        // Check authentication status
        const authStatus = localStorage.getItem("isAuthenticated")
        const storedPhoneNumber = localStorage.getItem("phoneNumber")

        setIsAuthenticated(authStatus === "true")
        if (storedPhoneNumber) {
        setPhoneNumber(storedPhoneNumber)
        }
    }, [pathname])

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("phoneNumber")
        setIsAuthenticated(false)
        router.push("/")
    }

    return (
        <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
            <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Phone className="h-6 w-6 text-primary" />
            <span className="font-bold">BandiCall</span>
            </Link>

            {isAuthenticated && (
            <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{phoneNumber}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
                </Button>
            </div>
            )}
        </div>
        </header>
    )
    }
