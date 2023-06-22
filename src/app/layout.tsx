import '@/styles/globals.scss'
import Navigation from '@/components/navigation/navigation'
import ReactDOM from 'react-dom'
import { Container } from '@/layout'
import localFont from 'next/font/local'
import styles from './homePage.module.scss'
import { classes } from '@/utils'

export const metadata = {
    title: 'Eric Kim',
    description: 'An awesome portfolio',
}
const myFont = localFont({
    src: '/PPAgrandir-Variable.ttf',
})
const myFontVariable = localFont({
    src: '/PPAgrandir-Variable.ttf',
    variable: '--font-family',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={classes(myFontVariable.variable, myFont.className)}>
            <body>
                {/* @ts-expect-error Async Server Component */}
                <Navigation/>
                <main>{children}</main>
            </body>
        </html>
    )
}
