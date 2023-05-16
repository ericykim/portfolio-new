import './globals.css'
import Navigation from '@/components/navigation/navigation'

export const metadata = {
    title: 'Eric Kim',
    description: 'An awesome portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                {/* @ts-expect-error Async Server Component */}
                <Navigation />
                {children}
            </body>
        </html>
    )
}
