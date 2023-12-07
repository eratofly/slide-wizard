import * as React from 'react'
import { useCallback, useEffect } from 'react'

const useClickOutside = (
	elementRef: React.RefObject<HTMLElement | null>,
	onOutsideClick: () => void,
) => {
	const onMouseDown = useCallback(
		(e: MouseEvent) => {
			if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
				onOutsideClick()
			}
		},
		[elementRef, onOutsideClick],
	)

	useEffect(() => {
		window.addEventListener('mousedown', onMouseDown)

		return () => {
			window.removeEventListener('mousedown', onMouseDown)
		}
	}, [onMouseDown])
}

export { useClickOutside }
