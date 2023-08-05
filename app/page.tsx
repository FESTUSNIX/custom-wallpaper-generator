'use client'

import { createRef } from 'react'
import Canvas from './components/Canvas'
import Sidebar from './components/Sidebar'
import { SettingsProvider } from './context/SettingsContext'

type CanvasFns = {
	generateImageFn: () => void
}

export default function Home() {
	const canvasEl = createRef<CanvasFns>()

	return (
		<main className='h-full flex overflow-x-hidden'>
			<SettingsProvider>
				<Canvas ref={canvasEl} />

				<Sidebar
					callGenerateImage={() => {
						canvasEl?.current?.generateImageFn()
					}}
				/>
			</SettingsProvider>
		</main>
	)
}
