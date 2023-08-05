import { useSettingsContext } from '@/app/context/SettingsContext'
import { RulerSquareIcon } from '@radix-ui/react-icons'
import { toPng } from 'html-to-image'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { Button } from '../ui/button'

const Canvas = forwardRef((props, ref) => {
	const canvasElement = useRef<HTMLDivElement>(null)
	const [canvasWidth, setCanvasWidth] = useState(900)
	const [canvasHeight, setCanvasHeight] = useState(600)

	const [ruler, setRuler] = useState(false)

	const {
		headingText,
		headingSize,
		bgText,
		bgTextSize,
		bgTextRotation,
		bgColor,
		bgTextColor,
		headingColor,
		showBackground,
		showHeading
	} = useSettingsContext()

	useEffect(() => {
		if (!canvasElement.current) return
		const resizeObserver = new ResizeObserver(() => {
			if (!canvasElement.current) return
			const width = canvasElement?.current?.clientWidth
			const height = canvasElement?.current?.clientHeight

			if (width !== canvasWidth) setCanvasWidth(width)
			if (height !== canvasHeight) setCanvasHeight(height)
		})
		resizeObserver.observe(canvasElement.current)
		return () => resizeObserver.disconnect()
	}, [])

	const generateImage = useCallback(() => {
		if (canvasElement.current === null) {
			return
		}

		toPng(canvasElement.current, {
			cacheBust: true,
			canvasHeight: 1080,
			canvasWidth: 1920
		})
			.then(dataUrl => {
				const link = document.createElement('a')
				link.download = `${headingText}-wallpaper.png`
				link.href = dataUrl
				link.click()
			})
			.catch(err => {
				console.log(err)
			})
	}, [canvasElement])

	useImperativeHandle(ref, () => ({
		generateImageFn() {
			generateImage()
		}
	}))

	return (
		<div className='h-fit w-full aspect-video border-b alpha-bg'>
			<div
				className='aspect-video relative flex items-center justify-center w-full overflow-hidden'
				ref={canvasElement}>
				{ruler && (
					<Draggable defaultPosition={{ x: 0, y: 0 }}>
						<div className='absolute inset-0 z-40'>
							<div className='relative w-full h-full pointer-events-none'>
								<div className='w-px h-full bg-red-600 absolute top-0 left-1/2 -translate-x-1/2'></div>
								<div className='h-px w-full bg-red-600 absolute top-1/2 -translate-y-1/2 left-0'></div>
							</div>
						</div>
					</Draggable>
				)}

				<svg width='0' height='0'>
					<defs>
						<clipPath
							id='headingClip'
							style={{
								transform: `rotate(calc(${bgTextRotation > 0 ? '-' : '-1 * '}${bgTextRotation}deg))`
							}}>
							<text
								x={canvasWidth}
								y={canvasHeight}
								dominantBaseline='middle'
								textAnchor='middle'
								style={{
									fontSize: canvasWidth / (100 - headingSize)
								}}
								className='text-center cursor-grab active:cursor-grabbing select-none font-black z-10'>
								{headingText}
							</text>
						</clipPath>
					</defs>
				</svg>

				<p
					className='select-none origin-top-left absolute top-[-50%] left-[-50%] w-[200%] z-10'
					style={{
						fontSize: canvasWidth / (100 - bgTextSize),
						transform: `rotate(${bgTextRotation}deg)`,
						color: headingColor || '#8400ff',
						opacity: showHeading ? 100 : 0,
						clipPath: 'url(#headingClip)'
					}}>
					{bgText}
				</p>

				<p
					className='select-none origin-top-left absolute top-[-50%] left-[-50%] pointer-events-none w-[200%] z-0'
					style={{
						fontSize: canvasWidth / (100 - bgTextSize),
						transform: `rotate(${bgTextRotation}deg)`,
						color: bgTextColor || '#1b1b1b',
						opacity: showBackground ? 100 : 0,
						backgroundColor: bgColor || '#000000'
					}}>
					{bgText}
				</p>
			</div>

			<Button
				variant={'outline'}
				className='aspect-square p-2 fixed top-4 left-6 z-50'
				onClick={() => {
					setRuler(prev => !prev)
				}}>
				<RulerSquareIcon className='w-4 h-4' />
			</Button>
		</div>
	)
})
Canvas.displayName = 'Canvas'

export default Canvas
