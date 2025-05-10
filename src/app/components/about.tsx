"use client"

import {useEffect, useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"

export default function AboutSection (){
    const [phoneNumber, setPhonenumber] = useState("")

    useEffect (() => {
        const storedPhoneNumber = localStorage.getItem("phoneNumber")
        if(storedPhoneNumber){
            setPhonenumber(storedPhoneNumber)
        }
    }, [])

    return (
        <Card>
        <CardHeader>
            <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
            <h3 className="font-medium">User Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Phone Number:</span>
                <span>{phoneNumber}</span>
                <span className="text-muted-foreground">Account Type:</span>
                <span>Standard</span>
                <span className="text-muted-foreground">Registration Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
            </div>
            </div>

            <div>
            <h3 className="font-medium">Application Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Version:</span>
                <span>1.0.0</span>
                <span className="text-muted-foreground">Server:</span>
                <span>Kamailio VoIP</span>
                <span className="text-muted-foreground">Protocol:</span>
                <span>UDP</span>
                <span className="text-muted-foreground">Framework:</span>
                <span>Next.js</span>
            </div>
            </div>

            <div>
            <h3 className="font-medium">Features</h3>
            <Separator className="my-2" />
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Voice and video calling</li>
                <li>Call history tracking</li>
                <li>Real-time call status</li>
                <li>Secure authentication</li>
            </ul>
            </div>
        </CardContent>
        </Card>
    )
}