    "use client"

    import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

    export type CallType = {
    id: string
    number: string
    type: "audio" | "video"
    status: "missed" | "received" | "ended"
    duration: number
    timestamp: string
    }

    type CallContextType = {
    callHistory: CallType[]
    addCallToHistory: (call: CallType) => void
    clearCallHistory: () => void
    }

    const CallContext = createContext<CallContextType | undefined>(undefined)

    export function CallProvider({ children }: { children: ReactNode }) {
    const [callHistory, setCallHistory] = useState<CallType[]>([])

    // Load call history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem("callHistory")
        if (savedHistory) {
        try {
            setCallHistory(JSON.parse(savedHistory))
        } catch (error) {
            console.error("Failed to parse call history:", error)
        }
        }
    }, [])

    // Save call history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("callHistory", JSON.stringify(callHistory))
    }, [callHistory])

    const addCallToHistory = (call: CallType) => {
        setCallHistory((prev) => [call, ...prev])
    }

    const clearCallHistory = () => {
        setCallHistory([])
    }

    return (
        <CallContext.Provider value={{ callHistory, addCallToHistory, clearCallHistory }}>{children}</CallContext.Provider>
    )
    }

    export function useCallContext() {
    const context = useContext(CallContext)
    if (context === undefined) {
        throw new Error("useCallContext must be used within a CallProvider")
    }
    return context
    }
