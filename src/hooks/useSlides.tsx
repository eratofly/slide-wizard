import { useCallback } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'

function useSlides(): {
	setBackgroundColor: () => void
	setBackgroundImage: () => void
} {
	const { createChangeSlideBackgroundColorAction, createChangeSlideBackgroundImageAction } =
		useAppActions()
	const selection = useAppSelector((state) => state.selection)

	const setBackgroundColor = useCallback(() => {
		const input = document.createElement('input')
		input.type = 'color'
		input.hidden = true
		input.onchange = () => {
			createChangeSlideBackgroundColorAction(selection.slideId, input.value)
			input.remove()
		}
		document.body.appendChild(input)
		input.click()
	}, [selection])

	const setBackgroundImage = useCallback(() => {
		const input = document.createElement('input')
		input.type = 'file'
		input.hidden = true
		input.accept = 'image/*'
		input.onchange = () => {
			const fileReader = new FileReader()
			if (!input.files) {
				return
			}
			fileReader.readAsDataURL(input.files[0])
			fileReader.onloadend = (event) => {
				if (typeof event.target!.result === 'string') {
					createChangeSlideBackgroundImageAction(selection.slideId, event.target!.result)
				}
			}
		}
		document.body.appendChild(input)
		input.click()
		input.remove()
	}, [selection])

	return {
		setBackgroundColor,
		setBackgroundImage,
	}
}

export { useSlides }
