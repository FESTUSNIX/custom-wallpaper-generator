import './globals.scss'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Cool wallpaper generator',
	description: 'Wallpaper generator that works in only 50%'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark'>
			<body className={jetBrainsMono.className}>{children}</body>
		</html>
	)
}
