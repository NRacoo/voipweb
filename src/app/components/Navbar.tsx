    "use client"

    import { useState, useEffect } from "react"
    import Link from "next/link"
    import { usePathname, useRouter } from "next/navigation"
    import { Button } from "@/components/ui/button"
    import { Phone, Menu, X } from "lucide-react"

    export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("phoneNumber")
        setIsAuthenticated(false)
        router.push("/")
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    return (
        <header className="border-b relative z-20">
        <div className="container flex h-16 items-center justify-between">
            <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Phone className="h-6 w-6 text-primary" />
            <span className="font-bold">BandiCall</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`text-sm font-medium ${pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
                Home
            </Link>
            <Link href="/about" className={`text-sm font-medium ${pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
                About Us
            </Link>
            {/* Logout dalam dashboard */}
            {isAuthenticated && (
            <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{phoneNumber}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
                </Button>
            </div>)}
            </nav>

            {/* Desktop Authentication */}
        

            {/* Mobile Hamburger Menu Button */}
            <button 
            className="md:hidden p-2 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-10">
            <div className="container py-4 flex flex-col space-y-4">
                <Link 
                href="/" 
                className={`text-sm font-medium px-4 py-2 rounded-md ${pathname === "/" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                onClick={() => setIsMenuOpen(false)}
                >
                Home
                </Link>
                <Link 
                href="/about" 
                className={`text-sm font-medium px-4 py-2 rounded-md ${pathname === "/about" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                onClick={() => setIsMenuOpen(false)}
                >
                About Us
                </Link>
                
            </div>
            </div>
        )}
        </header>
    )
    }