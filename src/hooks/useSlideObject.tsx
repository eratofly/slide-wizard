import { useCallback } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'

function useSlideObject(): {
	setColor: () => void
	setBorderColor: () => void
} {
	const selection = useAppSelector((state) => state.selection)
	const { createChangeObjectAction } = useAppActions()

	const setColor = useCallback(() => {
		const input = document.createElement('input')
		input.type = 'color'
		input.hidden = true
		input.onchange = () => {
			createChangeObjectAction(selection.slideId, selection.objectId!, {
				color: {
					hex: input.value,
					opacity: 1,
				},
			})
			input.remove()
		}
		document.body.appendChild(input)
		input.click()
	}, [selection])

	const setBorderColor = useCallback(() => {
		const input = document.createElement('input')
		input.type = 'color'
		input.hidden = true
		input.onchange = () => {
			createChangeObjectAction(selection.slideId, selection.objectId!, {
				border: {
					color: {
						hex: input.value,
						opacity: 1,
					},
				},
			})
			input.remove()
		}
		document.body.appendChild(input)
		input.click()
	}, [selection])

	return {
		setColor,
		setBorderColor,
	}
}

export { useSlideObject }