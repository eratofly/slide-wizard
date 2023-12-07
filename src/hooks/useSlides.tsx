import { useContext } from 'react'
import { Editor, Slide } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { EditorContext } from '../model/EditorContext'

function useSlides(): {
	addSlide: () => void
	removeSlide: (slideId: string) => void
	selectSlide: (slideId: string) => void
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
		}
		setEditor(newEditor)
	}

	const removeSlide = (slideId: string) => {
		const newSlides = [...editor.presentation.slides]
		let removedIndex = 0
		for (const key in newSlides) {
			if (newSlides[key].id === slideId) {
				newSlides.splice(Number(key), 1)
				removedIndex = Number(key)
				break
			}
		}
		try {
			const newEditor: Editor = {
				...editor,
				presentation: {
					...editor.presentation,
					slides: newSlides,
				},
				selection: {
					slideId:
						editor.presentation.slides[removedIndex === 0 ? 0 : removedIndex - 1].id,
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

	return {
		addSlide,
		removeSlide,
		selectSlide,
	}
}

export { useSlides }
