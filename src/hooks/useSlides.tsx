import { useContext, useState } from 'react'
import { Selection, Slide } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { EditorContext } from '../model/EditorContext'

function useSlides(): {
	addSlide: () => void
	removeSlide: (slideId: string) => void
	selectSlide: (slideId: string) => void
} {
	const { editor, setEditor } = useContext(EditorContext)
	const [slides, setSlides] = useState<Slide[]>(editor.presentation.slides)

	const addSlide = () => {
		const newSlides = slides
		const slide: Slide = {
			id: uuidv4(),
			backgroundColor: { hex: '#FFFFFF', opacity: 0 },
			slideObjects: [],
		}
		newSlides.push(slide)
		setSlides(newSlides)
		editor.presentation.slides = slides
		setEditor(editor)
		console.log(editor)
	}

	const removeSlide = (slideId: string) => {
		const newSlides = slides
		for (const key in newSlides) {
			if (newSlides[key].id === slideId) {
				newSlides.splice(Number(key), 1)
				break
			}
		}
		setSlides(newSlides)
		const newEditor = editor
		newEditor.presentation.slides = slides
		setEditor(newEditor)
		console.log(editor.presentation.slides.length)
	}

	const selectSlide = (slideId: string) => {
		const newEditor = editor
		editor.selection.slideId = slideId
		setEditor(newEditor)
		console.log(slideId)
		console.log(editor.selection.slideId)
	}

	return {
		addSlide,
		removeSlide,
		selectSlide,
	}
}

export { useSlides }
