import { useCallback, useContext } from 'react'
import { EditorContext } from '../model/EditorContext'
import { ObjectType } from '../model/types'

function useTextObject(): {
	setColor: () => void
} {
	const { editor, setEditor } = useContext(EditorContext)

	const setColor = useCallback(() => {
		const input = document.createElement('input')
		input.type = 'color'
		input.hidden = true
		input.onchange = () => {
			const newSlides = [...editor.presentation.slides]
			let newObjects = []
			for (const slide of newSlides) {
				if (slide.id === editor.selection.slideId) {
					newObjects = [...slide.slideObjects]
					for (const object of newObjects) {
						if (
							object.id === editor.selection.objectId &&
							object.objectType === ObjectType.TEXT
						) {
							object.color.hex = input.value
						}
					}
					slide.slideObjects = newObjects
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

	return {
		setColor,
	}
}

export { useTextObject }
