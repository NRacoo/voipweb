'use client'


import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Video, X } from "lucide-react"

export default function Dialpad (){
    const [inputNumber, setInputNumber] = useState("")
    const router = useRouter()

    const handNumberClick = (num : string) =>{
        setInputNumber((prev)=> prev + num)
    }

    const handleBackspace = () =>{
        setInputNumber((prev)=> prev.slice(0,-1))   
    }

    const handleClear = () =>{
        setInputNumber ("")
    }

    const handleCall = (isVideo = false) =>{
        if(inputNumber.trim()){
            router.push(`/call?number=${inputNumber}&video=${isVideo}`)
        }
    }

    return(
        <Card>
            <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="relative">
                        <Input value={inputNumber}
                            onChange={(e) => setInputNumber(e.target.value)}
                            className="text-center"
                            placeholder = "Enter Number"/>
                        {inputNumber && (
                            <Button variant = 'ghost'
                                    size = 'icon'
                                    className = "absolute right-2 top-1/2 transfom -translate-y-1/2"
                        >
                            <X className="h-4 w-4"/>
                        </Button>)}
                    </div>

                    {/* Dial Pad */}
                    <div className = ' gird gird-cols-3 gap-4'>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                            <Button key = {num}
                                    variant = "outline"
                                    className = "h-14 text-xl"
                                    onClick={() => handNumberClick (num.toString())}>
                                        {num}
                                        {num == 0 && <span className="ml-1 text-xs">+</span>}
                                    </Button>))}
                    </div>
                    
                    {/*Call Buttons */}
                    <div className="flex justify-center space-x-4">
                        <Button 
                            size = "lg"
                            className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600" 
                            onClick={() => handleCall(false)}
                            disabled = {!inputNumber}>
                                <Phone className = "h-6 w-6"/>
                            </Button>
                            <Button 
                                className = "rounded-full h-14 w-14 bg-blue-500 hover:bg-blue-600"
                                onClick = {() => handleCall(true)}
                            >
                                    <Video className = "h-6 w-6"/>
                            </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}