import '@/styles/globals.scss'
import Navigation from '@/components/navigation/navigation'
import ReactDOM from 'react-dom'
import { Container } from '@/layout'
import localFont from 'next/font/local';

export const metadata = {
    title: 'Eric Kim',
    description: 'An awesome portfolio',
}
const myFont = localFont({ src: './PPAgrandir-Variable.ttf' });
// ReactDOM.preload('/fonts/PPAgrandir-Variable.ttf', { as: 'font', crossOrigin: 'anonymous' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={myFont.className}>
            <body>
                {/* @ts-expect-error Async Server Component */}
                <Navigation />
                <main>
                    <Container fluid debug>{children}</Container>
                </main>
            </body>
        </html>
    )
}
