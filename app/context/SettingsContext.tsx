import React, { createContext, useContext, useReducer, useState } from 'react'
import { backgroundText } from '../constants/backgroundText'

type SettingsContextType = {
	setHeadingText: (a: string) => void
	headingText: string
	setBgText: (a: string) => void
	bgText: string
	setHeadingSize: (a: number) => void
	headingSize: number
	setBgTextSize: (a: number) => void
	bgTextSize: number
	setBgTextRotation: (a: number) => void
	bgTextRotation: number
	setBgTextColor: (a: string) => void
	bgTextColor: string
	setHeadingColor: (a: string) => void
	headingColor: string
	setBgColor: (a: string) => void
	bgColor: string
	showHeading: boolean
	setShowHeading: (a: boolean) => void
	showBackground: boolean
	setShowBackground: (a: boolean) => void
	resetSettings: () => void
}

const initialState: SettingsContextType = {
	setHeadingText: () => {},
	headingText: 'HEADING',
	setBgText: () => {},
	bgText: backgroundText,
	setHeadingSize: () => {},
	headingSize: 93,
	setBgTextSize: () => {},
	bgTextSize: 25,
	setBgTextRotation: () => {},
	bgTextRotation: 3,
	setBgTextColor: () => {},
	bgTextColor: '#1b1b1b',
	setHeadingColor: () => {},
	headingColor: '#9333EA',
	setBgColor: () => {},
	bgColor: '#000000',
	showHeading: true,
	setShowHeading: () => {},
	showBackground: true,
	setShowBackground: () => {},
	resetSettings: () => {}
}

const SettingsContext = createContext(initialState)

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
	const [headingText, setHeadingText] = useState('HEADING')
	const [bgText, setBgText] = useState(backgroundText)
	const [headingSize, setHeadingSize] = useState(93)
	const [bgTextSize, setBgTextSize] = useState(25)
	const [bgTextRotation, setBgTextRotation] = useState(3)
	const [headingColor, setHeadingColor] = useState('#9333EA')
	const [bgTextColor, setBgTextColor] = useState('#1b1b1b')
	const [bgColor, setBgColor] = useState('#000000')
	const [showHeading, setShowHeading] = useState(true)
	const [showBackground, setShowBackground] = useState(true)

	const resetSettings = () => {
		setHeadingText(initialState.headingText)
		setBgText(initialState.bgText)
		setHeadingSize(initialState.headingSize)
		setBgTextSize(initialState.bgTextSize)
		setBgTextRotation(initialState.bgTextRotation)
		setHeadingColor(initialState.headingColor)
		setBgTextColor(initialState.bgTextColor)
		setBgColor(initialState.bgColor)
		setShowHeading(initialState.showHeading)
		setShowBackground(initialState.showBackground)
	}

	return (
		<SettingsContext.Provider
			value={{
				setHeadingText,
				headingText,
				setBgText,
				bgText,
				setHeadingSize,
				headingSize,
				setBgTextSize,
				bgTextSize,
				setBgTextRotation,
				bgTextRotation,
				headingColor,
				setHeadingColor,
				bgTextColor,
				setBgTextColor,
				bgColor,
				setBgColor,
				showHeading,
				setShowHeading,
				showBackground,
				setShowBackground,
				resetSettings
			}}>
			{children}
		</SettingsContext.Provider>
	)
}

export const useSettingsContext = () => {
	const context = useContext(SettingsContext)

	if (!context) {
		console.log('useSettingsContext must be used inside an SettingsContext')
		throw Error('useSettingsContext must be used inside an SettingsContext')
	}

	return context
}
