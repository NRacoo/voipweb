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

    return(
        <Card>
            <CardTitle>
                About
            </CardTitle>
            <CardContent className="space-y-4">
                <div >
                    <h3 className="font-medium">User Information
                    </h3>
                    <Separator className = "my-2">
                        <div>
                            
                        <div className = "grid grid-cols-2 gap-2 text-sm">
                            <span className = "text-muted-foregorund">Phone Number:</span>
                            <span>{phoneNumber}</span>
                            <span className = "text-muted-foreground">Account Type:</span>
                            <span>Standard</span>
                            <span className="text-muted-foreground"> Registration Date:</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>

                        </div>
                    </Separator>
                </div>
            </CardContent>
        </Card>
    )
}