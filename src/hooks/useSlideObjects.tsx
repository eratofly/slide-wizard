import { useContext, useState } from 'react'
import { Editor, Image, Primitive, Slide, TextObject } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { EditorContext } from '../model/EditorContext'

function useSlideObjects(): {
	addObject: () => void
	removeObject: (objectId: string) => void
	selectObject: (objectId: string) => void
} {
	const { editor, setEditor } = useContext(EditorContext)
	const [slides, setSlides] = useState<Slide[]>(editor.presentation.slides)
	function getSelectedSlideIndex() {
		for (const index in slides) {
			if (slides[index].id === editor.selection.slideId) {
				return Number(index)
			}
		}
		return 0
	}

	const [objects, setObjects] = useState<(TextObject | Primitive | Image)[]>(
		editor.presentation.slides[getSelectedSlideIndex()].slideObjects,
	)

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

	const removeObject = (objectId: string) => {
		const newObjects = [...objects]
		for (const key in newObjects) {
			if (newObjects[key].id === objectId) {
				newObjects.splice(Number(key), 1)
				break
			}
		}
		setObjects(newObjects)
		const newSlides = [...slides]
		newSlides[getSelectedSlideIndex()].slideObjects = [...objects]
		setSlides(newSlides)
		try {
			const newEditor = {
				...editor,
				presentation: {
					...editor.presentation,
					slides,
				},
				selection: {
					...editor.selection,
					objectId: undefined,
				},
			}
			setEditor(newEditor)
		} catch (e) {
			alert('Can`t delete object')
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
