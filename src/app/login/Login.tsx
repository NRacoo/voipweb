"use client"
import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import { Phone } from 'lucide-react'


export async function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("phoneNumber", phoneNumber)
        router.push("/dashboard")
    }catch(err){
        setError("Authentication failed. Please try again.")
    }finally{
        setIsLoading(false)
    }






    return (
        <div className='container flex items-center justify-center 
        min-h-[calc(100vh-8rem)]'>
            <Card className='w-full max-w-md'>
                <CardHeader className='space-y-1'>
                    <div className='flex justify-center mb-4'>
                        <div className='bg-primary/10 p-3 rounded-full'>
                            <Phone className='h-8 w-8 text-primary'/>
                        </div>
                    </div>
                    <CardTitle className='text-2xl text-center'>VoIp Login</CardTitle>
                    <CardDescription className= 'text-center'>
                        Enter your registered phone number to sign in
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <form onSubmit = {handleLogin}>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Input id = 'phoneNumber'
                                placeholder = 'Phone Number'
                                value = {phoneNumber}
                                onChange= {(e) => setPhoneNumber(e.target.value)}
                                required
                                type = 'tel'
                                className='text-center text-lg'/>
                            </div>
                            {error && <p className = 'text-sm text-red-500'>{error}</p>}
                            <Button type = 'submit' className='w-full' disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className='text-xs text-center text-muted-foreground w-full'>By signing in, you agree to our Terms of Services and Privacy Policy</p>
                </CardFooter>
            </Card>
        </div>


    )
}
