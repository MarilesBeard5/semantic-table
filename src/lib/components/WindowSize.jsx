import { useLayoutEffect, useState } from 'react'

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window
	return {
		width,
		height,
	}
}

//Window Resize Event Listener
export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	)

	const handleResize = () => {
		setWindowDimensions(getWindowDimensions())
	}

	useLayoutEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowDimensions
}
