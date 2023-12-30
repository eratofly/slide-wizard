import { useContext } from 'react'
import { Editor, Slide } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { EditorContext } from '../model/EditorContext'

function useSlideObjects(): {
	addObject: () => void
	removeObject: (objectId: string) => void
	selectObject: (objectId: string) => void
	unselectObject: (event: React.MouseEvent) => void
} {
	const { editor, setEditor } = useContext(EditorContext)
	function getSelectedSlideIndex() {
		for (const index in editor.presentation.slides) {
			if (editor.presentation.slides[index].id === editor.selection.slideId) {
				return Number(index)
			}
		}
		return 0
	}

	const addObject = () => {
		const newSlides = [...editor.presentation.slides]
		const slide: Slide = {
			id: uuidv4(),
			backgroundColor: { hex: '#FFFFFF', opacity: 0 },
			slideObjects: [],
		}
		newSlides.push(slide)
		const newEditor = {
			...editor,
			presentation: {
				...editor.presentation,
				slides: editor.presentation.slides,
			},
		}
		setEditor(newEditor)
	}

	const removeObject = (objectId: string) => {
		const newObjects = [...editor.presentation.slides[getSelectedSlideIndex()].slideObjects]
		for (const key in newObjects) {
			if (newObjects[key].id === objectId) {
				newObjects.splice(Number(key), 1)
				break
			}
		}
		const newSlides = [...editor.presentation.slides]
		newSlides[getSelectedSlideIndex()].slideObjects = [...newObjects]
		try {
			const newEditor = {
				...editor,
				presentation: {
					...editor.presentation,
					slides: newSlides,
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
		console.log(newEditor)
	}

	const unselectObject = (event: React.MouseEvent) => {
		if (event.currentTarget != event.target) return
		const newEditor: Editor = {
			...editor,
			selection: {
				slideId: editor.selection.slideId,
			},
		}
		setEditor(newEditor)
	}

	return {
		addObject,
		removeObject,
		selectObject,
		unselectObject,
	}
}

export { useSlideObjects }
