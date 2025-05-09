    // This is a simplified mock of a SIP service
    // In a real application, you would use a library like JsSIP or SIP.js
    // to connect to your Kamailio server

    export type CallStatus = "idle" | "calling" | "ringing" | "in-call" | "ended"

    export class SipService {
    private static instance: SipService
    private status: CallStatus = "idle"
    private callbacks: { [key: string]: Function[] } = {}

    private constructor() {
        // Initialize SIP connection
        console.log("SIP Service initialized")
    }

    public static getInstance(): SipService {
        if (!SipService.instance) {
        SipService.instance = new SipService()
        }
        return SipService.instance
    }

    public connect(username: string, password: string): Promise<boolean> {
        // In a real implementation, this would connect to the Kamailio server
        return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Connected as ${username}`)
            resolve(true)
        }, 1000)
        })
    }

    public makeCall(number: string, isVideo: boolean): void {
        this.setStatus("calling")

        // Simulate call flow
        setTimeout(() => {
        this.setStatus("ringing")

        setTimeout(() => {
            this.setStatus("in-call")
        }, 3000)
        }, 2000)
    }

    public endCall(): void {
        this.setStatus("ended")

        setTimeout(() => {
        this.setStatus("idle")
        }, 1000)
    }

    public getStatus(): CallStatus {
        return this.status
    }

    private setStatus(status: CallStatus): void {
        this.status = status
        this.trigger("statusChanged", status)
    }

    public on(event: string, callback: Function): void {
        if (!this.callbacks[event]) {
        this.callbacks[event] = []
        }
        this.callbacks[event].push(callback)
    }

    public off(event: string, callback: Function): void {
        if (!this.callbacks[event]) return
        this.callbacks[event] = this.callbacks[event].filter((cb) => cb !== callback)
    }

    private trigger(event: string, ...args: any[]): void {
        if (!this.callbacks[event]) return
        this.callbacks[event].forEach((callback) => callback(...args))
    }
    }

    export default SipService.getInstance()
