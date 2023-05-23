import '@/styles/globals.scss'
import Navigation from '@/components/navigation/navigation'
import ReactDOM from 'react-dom'
import { Container } from '@/layout'

export const metadata = {
    title: 'Eric Kim',
    description: 'An awesome portfolio',
}

ReactDOM.preload('/fonts/PPWoodland-Bold.otf', { as: 'font', crossOrigin: 'anonymous' })
ReactDOM.preload('/fonts/PPWoodland-Heavy.otf', { as: 'font', crossOrigin: 'anonymous' })
ReactDOM.preload('/fonts/PPWoodland-Regular.otf', { as: 'font', crossOrigin: 'anonymous' })
ReactDOM.preload('/fonts/PPWoodland-Ultralight.otf', { as: 'font', crossOrigin: 'anonymous' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                {/* @ts-expect-error Async Server Component */}
                <Navigation />
                <main>
                    <Container fluid>{children}</Container>
                </main>
            </body>
        </html>
    )
}
