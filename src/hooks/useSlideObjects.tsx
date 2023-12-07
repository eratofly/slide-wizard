import { useContext, useState } from 'react'
import { Editor, Slide } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { EditorContext } from '../model/EditorContext'

function useSlideObjects(): {
	addObject: () => void
	removeObject: (slideId: string) => void
	selectObject: (slideId: string) => void
} {
	const { editor, setEditor } = useContext(EditorContext)
	const [slides, setSlides] = useState<Slide[]>(editor.presentation.slides)

	const addObject = () => {
		const newSlides = slides
		const slide: Slide = {
			id: uuidv4(),
			backgroundColor: { hex: '#FFFFFF', opacity: 0 },
			slideObjects: [],
		}
		newSlides.push(slide)
		setSlides(newSlides)
		const newEditor = {
			...editor,
			presentation: {
				...editor.presentation,
				slides,
			},
		}
		setEditor(newEditor)
	}

	const removeObject = (slideId: string) => {
		const newSlides = slides
		let removedIndex = 0
		for (const key in newSlides) {
			if (newSlides[key].id === slideId) {
				newSlides.splice(Number(key), 1)
				removedIndex = Number(key)
				break
			}
		}
		setSlides(newSlides)
		try {
			const newEditor = {
				...editor,
				presentation: {
					...editor.presentation,
					slides,
				},
				selection: {
					slideId: slides[removedIndex === 0 ? 0 : removedIndex - 1].id,
				},
			}
			setEditor(newEditor)
		} catch (e) {
			alert('Can`t delete slide')
		}
	}

	const selectObject = (objectId: string) => {
		const newEditor: Editor = {
			...editor,
			selection: {
				...editor.selection,
				objectId,
			},
		}
		setEditor(newEditor)
	}

	return {
		addObject,
		removeObject,
		selectObject,
	}
}

export { useSlideObjects }
