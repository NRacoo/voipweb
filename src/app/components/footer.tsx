    export default function Footer() {
    return (
        <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VoIP Integration. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">Powered by Kamailio VoIP Server</p>
        </div>
        </footer>
    )
    }
