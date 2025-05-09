"use client"

import {useCallContext} from "@/app/context/call_context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Video, ArrowDownLeft, ArrowUpRight, XCircle } from "lucide-react"
import {format} from 'date-fns'

export default function CallHistory(){
    const {callHistory} = useCallContext()

    const formatduration = (seconds : number) => {
        if (seconds == 0) return " --:--"
        const mins = Math.floor(seconds/60)
        const secs = seconds % 60

        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const getStatusIcon = (status : string, type : string) => {
        switch(status) {
            case 'missed':
                return <XCircle className="h-4 w-4 text-red-500" />
            case 'received':
                return <ArrowDownLeft className ="h-4 w-4 text-green-500"/>
            case 'ended':
                return <ArrowUpRight className = "h-4 w-4 text-blue-500"/>
            default:
                return null
        }
    }

    const getTypeIcon = (type: string) => {
        return type === "video" ? <Video className="h-4 w-4 text-blue-500" /> : <Phone className="h-4 w-4 text-green-500" />
    }

        return (
            <Card>
            <CardHeader>
                <CardTitle>Call History</CardTitle>
            </CardHeader>
            <CardContent>
                {callHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No call history yet</p>
                ) : (
                <div className="space-y-4">
                    {callHistory.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
                            {getStatusIcon(call.status, call.type)}
                        </div>
                        <div>
                            <p className="font-medium">{call.number}</p>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{format(new Date(call.timestamp), "MMM d, h:mm a")}</span>
                            <span>•</span>
                            <span className="flex items-center">{getTypeIcon(call.type)}</span>
                            </div>
                        </div>
                        </div>
                        <div className="text-sm font-mono">{formatduration(call.duration)}</div>
                    </div>
                    ))}
                </div>
                )}
            </CardContent>
            </Card>
        )
}