'use client'

import { createRef } from 'react'
import Canvas from './components/Canvas'
import Sidebar from './components/Sidebar'
import { SettingsProvider } from './context/SettingsContext'
import Link from 'next/link'

type CanvasFns = {
	generateImageFn: () => void
}

export default function Home() {
	const canvasEl = createRef<CanvasFns>()

	return (
		<main className='h-full flex overflow-x-hidden'>
			<SettingsProvider>
				<div className='flex grow flex-col'>
					<Canvas ref={canvasEl} />
					<footer className='w-full mt-auto py-8 flex items-center justify-center h-full'>
						<p className='text-muted-foreground'>
							Made for{' '}
							<Link href={'https://github.com/FESTUSNIX/'} className='hover:underline text-foreground'>
								myself
							</Link>{' '}
							with 🤍, feel free to use :&#41;
						</p>
					</footer>
				</div>

				<Sidebar
					callGenerateImage={() => {
						canvasEl?.current?.generateImageFn()
					}}
				/>
			</SettingsProvider>
		</main>
	)
}
