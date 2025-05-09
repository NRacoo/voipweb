    "use client"

    import { useEffect, useState, useRef } from "react"
    import { useRouter, useSearchParams } from "next/navigation"
    import { Button } from "@/components/ui/button"
    import { Card, CardContent } from "@/components/ui/card"
    import { PhoneOff, Video, VideoOff, Mic, MicOff } from "lucide-react"
    import { useCallContext } from "../context/call_context"

    export default function CallPage() {
    const searchParams = useSearchParams()
    const number = searchParams.get("number") || ""
    const isVideo = searchParams.get("video") === "true"
    const router = useRouter()
    const { addCallToHistory } = useCallContext()

    const [callStatus, setCallStatus] = useState("Calling")
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoEnabled, setIsVideoEnabled] = useState(isVideo)
    const [callDuration, setCallDuration] = useState(0)
    const [callStartTime, setCallStartTime] = useState<Date | null>(null)

    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Simulate call flow
        const callFlow = async () => {
        // Calling
        setCallStatus("Calling")
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Ringing
        setCallStatus("Ringing")
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Call started
        const startTime = new Date()
        setCallStartTime(startTime)
        setCallStatus("In Call")

        // Start timer for call duration
        timerRef.current = setInterval(() => {
            const now = new Date()
            const durationInSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000)
            setCallDuration(durationInSeconds)
        }, 1000)
        }

        // Initialize WebRTC if this was a real implementation
        // For demo purposes, we'll just simulate the call flow
        callFlow()

        // Cleanup function
        return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        }
    }, [])

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const endCall = () => {
        // End the call
        if (timerRef.current) {
        clearInterval(timerRef.current)
        }

        setCallStatus("Call Ended")

        // Add call to history
        if (callStartTime) {
        const endTime = new Date()
        const duration = Math.floor((endTime.getTime() - callStartTime.getTime()) / 1000)

        addCallToHistory({
            id: Date.now().toString(),
            number,
            type: isVideo ? "video" : "audio",
            status: "ended",
            duration,
            timestamp: callStartTime.toISOString(),
        })
        } else {
        // Call was not answered
        addCallToHistory({
            id: Date.now().toString(),
            number,
            type: isVideo ? "video" : "audio",
            status: "missed",
            duration: 0,
            timestamp: new Date().toISOString(),
        })
        }

        // Navigate back to dashboard after a short delay
        setTimeout(() => {
        router.push("/dashboard")
        }, 1500)
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
        // In a real implementation, you would mute the audio track here
    }

    const toggleVideo = () => {
        setIsVideoEnabled(!isVideoEnabled)
        // In a real implementation, you would enable/disable the video track here
    }

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md">
            <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
                {/* Call status and timer */}
                <div className="text-center">
                <h2 className="text-2xl font-bold">{number}</h2>
                <p className="text-muted-foreground">{callStatus}</p>
                {callStatus === "In Call" && <p className="text-sm font-mono">{formatDuration(callDuration)}</p>}
                </div>

                {/* Video container (shown only for video calls) */}
                {isVideo && (
                <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                    {isVideoEnabled ? (
                    <>
                        <video
                        ref={remoteVideoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        playsInline
                        />
                        <video
                        ref={localVideoRef}
                        className="absolute bottom-4 right-4 w-1/4 aspect-video object-cover rounded-lg border-2 border-background"
                        autoPlay
                        playsInline
                        muted
                        />
                    </>
                    ) : (
                    <div className="flex items-center justify-center h-full">
                        <VideoOff className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                    )}
                </div>
                )}

                {/* Call controls */}
                <div className="flex items-center justify-center space-x-6">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={toggleMute}>
                    {isMuted ? <MicOff /> : <Mic />}
                </Button>

                <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full" onClick={endCall}>
                    <PhoneOff className="h-8 w-8" />
                </Button>

                {isVideo && (
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={toggleVideo}>
                    {isVideoEnabled ? <Video /> : <VideoOff />}
                    </Button>
                )}
                </div>
            </div>
            </CardContent>
        </Card>
        </div>
    )
    }
