import { RefObject, useCallback, useEffect } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'

enum EditableProperties {
	X,
	Y,
	WIDTH,
	MINUS_WIDTH,
	HEIGHT,
	MINUS_HEIGHT,
}

function useDragAndDropObjects(
	draggedItem: RefObject<HTMLDivElement | HTMLTextAreaElement | HTMLImageElement | SVGSVGElement>,
	editableProperties: EditableProperties[],
) {
	const slides = useAppSelector((state) => state.presentation.slides)
	const selection = useAppSelector((state) => state.selection)
	const { createChangeObjectAction } = useAppActions()

	const dragAndDrop = useCallback(() => {
		const getSelectedSlideIndex = () => {
			for (const key in slides) {
				if (slides[key].id === selection.slideId) {
					return Number(key)
				}
			}
		}

		const getSelectedObjectIndex = () => {
			for (const key in slides[getSelectedSlideIndex()!].slideObjects) {
				if (slides[getSelectedSlideIndex()!].slideObjects[key].id === selection.objectId) {
					return Number(key)
				}
			}
			return
		}

		const mouseState = {
			x: 0,
			y: 0,
		}

		const newItem = slides[getSelectedSlideIndex()!].slideObjects[getSelectedObjectIndex()!]

		const startResize = (event: MouseEvent) => {
			event.preventDefault()
			;(draggedItem.current! as HTMLDivElement).removeEventListener('mousedown', startResize)

			mouseState.y = event.pageY
			mouseState.x = event.pageX

			window.addEventListener('mousemove', onDrag)
			window.addEventListener('mouseup', onDrop)
		}

		const onDrag = (event: MouseEvent) => {
			if (editableProperties.indexOf(EditableProperties.X) !== -1) {
				newItem!.x += 2 * (event.pageX - mouseState.x)
			}
			if (editableProperties.indexOf(EditableProperties.Y) !== -1) {
				newItem!.y += 2 * (event.pageY - mouseState.y)
			}
			if (editableProperties.indexOf(EditableProperties.WIDTH) !== -1) {
				newItem!.width += 2 * (event.pageX - mouseState.x)
			}
			if (editableProperties.indexOf(EditableProperties.MINUS_WIDTH) !== -1) {
				newItem!.width -= 2 * (event.pageX - mouseState.x)
			}
			if (editableProperties.indexOf(EditableProperties.HEIGHT) !== -1) {
				newItem!.height += 2 * (event.pageY - mouseState.y)
			}
			if (editableProperties.indexOf(EditableProperties.MINUS_HEIGHT) !== -1) {
				newItem!.height -= 2 * (event.pageY - mouseState.y)
			}
			mouseState.y = event.pageY
			mouseState.x = event.pageX

			createChangeObjectAction(selection.slideId, selection.objectId!, {
				x: newItem!.x,
				y: newItem!.y,
				width: newItem!.width,
				height: newItem!.height,
			})
		}

		const onDrop = () => {
			window.removeEventListener('mousemove', onDrag)
			window.removeEventListener('mouseup', onDrop)
		}

		useEffect(() => {
			if (draggedItem.current && getSelectedObjectIndex() !== undefined) {
				;(draggedItem.current! as HTMLDivElement).addEventListener('mousedown', startResize)
				return () => {
					if (draggedItem.current) {
						;(draggedItem.current! as HTMLDivElement).removeEventListener(
							'mousedown',
							startResize,
						)
					}
				}
			}
		})
	}, [selection])

	return {
		dragAndDrop,
	}
}

export { useDragAndDropObjects, EditableProperties }
