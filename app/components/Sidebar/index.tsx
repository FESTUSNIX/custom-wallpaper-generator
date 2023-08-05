'use client'

import { useSettingsContext } from '@/app/context/SettingsContext'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import ColorPicker from '../ColorPicker'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'

type Props = {
	callGenerateImage: () => void
}

const Sidebar = ({ callGenerateImage }: Props) => {
	const [show, setShow] = useState(true)

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
		showHeading,
		setHeadingText,
		setHeadingSize,
		setBgText,
		setBgTextSize,
		setBgTextRotation,
		setBgColor,
		setBgTextColor,
		setHeadingColor,
		setShowBackground,
		setShowHeading,
		resetSettings
	} = useSettingsContext()

	return (
		<div
			className='relative shrink-0 w-96 flex flex-col border-l bg-background duration-300 h-screen'
			style={{ width: show ? '384px' : '0' }}>
			<div className='flex px-6 py-4 border-b items-center justify-between'>
				<h2 className='text-lg font-bold'>Settings</h2>
				<div className='h-9'></div>
				<Button
					variant={'outline'}
					className='fixed top-4 right-6 aspect-square p-2'
					onClick={() => {
						setShow(prev => !prev)
					}}>
					{show && <ChevronRightIcon className='w-4 h-4' />}
					{!show && <ChevronLeftIcon className='w-4 h-4' />}
				</Button>
			</div>

			<ScrollArea className=''>
				<div className='space-y-6 px-6 grow py-6'>
					<div className='flex flex-col gap-y-2'>
						<Label>Heading text</Label>
						<Input type='text' placeholder='Aa...' value={headingText} onChange={e => setHeadingText(e.target.value)} />
					</div>

					<div className='flex flex-col gap-y-2'>
						<Label>Heading size</Label>
						<Input
							type='number'
							placeholder='123'
							value={headingSize}
							onChange={e => setHeadingSize(e.target.valueAsNumber)}
						/>
					</div>

					<div className='flex flex-col gap-y-2'>
						<Label>Heading color</Label>
						<ColorPicker value={headingColor} setValue={setHeadingColor} />
					</div>

					<Separator />

					<div className='flex flex-col gap-y-2'>
						<Label>Background text</Label>
						<Textarea
							placeholder='Lorem ipsum dolor sit amet...'
							value={bgText}
							onChange={e => setBgText(e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-y-2'>
						<Label>Background text size</Label>
						<Input
							type='number'
							placeholder='123'
							value={bgTextSize}
							onChange={e => setBgTextSize(e.target.valueAsNumber)}
						/>
						<p className='text-muted-foreground text-xs'>
							You must put more text than you want to display to fill off-screen
						</p>
					</div>

					<div className='flex flex-col gap-y-2'>
						<Label>Background text color</Label>
						<ColorPicker value={bgTextColor} setValue={setBgTextColor} />
					</div>

					<div className='flex flex-col gap-y-2'>
						<Label>Background text rotation</Label>
						<Input
							type='number'
							placeholder='123'
							value={bgTextRotation}
							onChange={e => setBgTextRotation(e.target.valueAsNumber)}
						/>
					</div>

					<Separator />

					<div className='flex flex-col gap-y-2'>
						<Label>Background color</Label>
						<ColorPicker value={bgColor} setValue={setBgColor} />
					</div>

					<Separator />

					<div className='flex items-center space-x-2'>
						<Checkbox
							id='showHeading'
							checked={showHeading}
							onCheckedChange={checked => {
								setShowHeading(!!checked)
							}}
						/>
						<label
							htmlFor='showHeading'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Show heading
						</label>
					</div>

					<div className='flex items-center space-x-2'>
						<Checkbox
							id='showBg'
							checked={showBackground}
							onCheckedChange={checked => {
								setShowBackground(!!checked)
							}}
						/>
						<label
							htmlFor='showBg'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Show background
						</label>
					</div>
				</div>
			</ScrollArea>

			<div className='mt-auto flex items-center gap-2 border-t py-6 px-6'>
				<Button
					className='grow'
					variant={'secondary'}
					onClick={() => {
						resetSettings()
					}}>
					Reset
				</Button>
				<Button
					className='grow'
					onClick={() => {
						callGenerateImage && callGenerateImage()
					}}>
					Download
				</Button>
			</div>
		</div>
	)
}

export default Sidebar
