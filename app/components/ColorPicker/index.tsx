import React from 'react'
import { Input } from '../ui/input'

type Props = {
	value: string
	setValue: (a: string) => void
}

const ColorPicker = ({ value, setValue }: Props) => {
	return (
		<div className='flex  w-full color-picker relative items-stretch'>
			<Input type='text' value={value} onChange={e => setValue(e.target.value)} className='border-r-0 rounded-e-none' />
			<input
				type='color'
				value={value}
				onChange={e => setValue(e.target.value)}
				className='w-1/2 p-0 h-auto border-none cursor-pointer bg-transparent'
			/>
		</div>
	)
}

export default ColorPicker
