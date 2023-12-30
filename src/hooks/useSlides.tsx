import { useCallback, useContext } from 'react'
import { Editor, Slide } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { EditorContext } from '../model/EditorContext'

function useSlides(): {
	addSlide: () => void
	removeSlide: (slideId: string) => void
	selectSlide: (slideId: string) => void
	setBackgroundColor: () => void
	setBackgroundImage: () => void
} {
	const { editor, setEditor } = useContext(EditorContext)

	const addSlide = () => {
		const newSlides = [...editor.presentation.slides]
		const slide: Slide = {
			id: uuidv4(),
			backgroundColor: { hex: '#FFFFFF', opacity: 0 },
			slideObjects: [],
		}
		newSlides.push(slide)
		const newEditor: Editor = {
			...editor,
			presentation: {
				...editor.presentation,
				slides: newSlides,
			},
			selection: {
				slideId: editor.selection.slideId,
			},
		}
		setEditor(newEditor)
	}

	const removeSlide = (slideId: string) => {
		let newSlides = [...editor.presentation.slides]
		let removedIndex = 0
		newSlides = newSlides.filter((slide, index) => {
			if (slide.id !== slideId) {
				return true
			}
			removedIndex = index
			return false
		})
		try {
			const newEditor: Editor = {
				...editor,
				presentation: {
					...editor.presentation,
					slides: newSlides,
				},
				selection: {
					slideId: newSlides[removedIndex === 0 ? 0 : removedIndex - 1].id,
				},
			}
			setEditor(newEditor)
		} catch (e) {
			alert('Can`t delete slide')
		}
	}

	const selectSlide = (slideId: string) => {
		const newEditor: Editor = {
			...editor,
			selection: {
				slideId,
			},
		}
		setEditor(newEditor)
	}

	const setBackgroundColor = useCallback(() => {
		const input = document.createElement('input')
		input.type = 'color'
		input.hidden = true
		input.onchange = () => {
			const newSlides = [...editor.presentation.slides]
			for (const slide of newSlides) {
				if (slide.id === editor.selection.slideId) {
					slide.backgroundColor.hex = input.value
				}
			}
			const newEditor = {
				...editor,
				presentation: {
					...editor.presentation,
					slides: newSlides,
				},
			}
			setEditor(newEditor)
			input.remove()
		}
		document.body.appendChild(input)
		input.click()
	}, [editor.selection])

	const setBackgroundImage = useCallback(() => {
		const input = document.createElement('input')
		input.type = 'file'
		input.hidden = true
		input.accept = 'image/*'
		input.onchange = () => {
			const newSlides = [...editor.presentation.slides]
			const fileReader = new FileReader()
			if (!input.files) {
				return
			}
			fileReader.readAsDataURL(input.files[0])
			fileReader.onloadend = (event) => {
				for (const slide of newSlides) {
					if (
						slide.id === editor.selection.slideId &&
						typeof event.target!.result === 'string'
					) {
						slide.backgroundImage = event.target!.result
					}
				}
				const newEditor = {
					...editor,
					presentation: {
						...editor.presentation,
						slides: newSlides,
					},
				}
				setEditor(newEditor)
			}
		}
		document.body.appendChild(input)
		input.click()
		input.remove()
	}, [editor.selection])

	return {
		addSlide,
		removeSlide,
		selectSlide,
		setBackgroundColor,
		setBackgroundImage,
	}
}

export { useSlides }
