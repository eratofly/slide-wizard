import { Action, PresentationActions } from './actions'
import { Image, Presentation, Primitive, Slide, TextObject } from '../model/types'
import { startEditor } from '../data/testDataMin'
import { jsPDF } from 'jspdf'
import { addSlides } from '../model/export'
import { getDefaultSlide } from '../model/utils'
import { createHistory } from '../model/History'

const initState = startEditor
const history = createHistory<Presentation>(initState.presentation)

function importFromJson(presentation: Presentation): Presentation {
	history.addHistoryItem(presentation)
	return presentation
}

function changeTitle(state: Presentation, title: string): Presentation {
	title = title !== '' ? title : 'New Presentation'
	const newPresentation = {
		...state,
		title,
	}
	history.addHistoryItem(newPresentation)
	return newPresentation
}

function deleteSlide(state: Presentation, slideId: string): Presentation {
	let newSlides = [...state.slides]
	if (newSlides.length === 1) {
		alert('Can`t delete slide')
		return { ...state }
	}
	newSlides = newSlides.filter((slide) => {
		return slide.id !== slideId
	})
	const newPresentation: Presentation = {
		...state,
	}
	newPresentation.slides = newSlides
	history.addHistoryItem(newPresentation)
	return newPresentation
}

function changeSlideBackgroundColor(
	state: Presentation,
	slideId: string,
	color: string,
): Presentation {
	const newSlides = state.slides.map((slide) => {
		if (slide.id === slideId) {
			return {
				...slide,
				backgroundColor: {
					hex: color,
					opacity: 1,
				},
			}
		}
		return slide
	})
	const newPresentation = {
		...state,
		slides: newSlides,
	}
	history.addHistoryItem(newPresentation)
	return newPresentation
}

function changeSlideBackgroundImage(
	state: Presentation,
	slideId: string,
	path: string,
): Presentation {
	const newSlides = state.slides.map((slide) => {
		if (slide.id === slideId) {
			return {
				...slide,
				backgroundImage: path,
			}
		}
		return slide
	})
	const newPresentation = {
		...state,
		slides: newSlides,
	}
	history.addHistoryItem(newPresentation)
	return newPresentation
}

function addSlide(state: Presentation): Presentation {
	const newSlides = [...state.slides]
	const slide: Slide = getDefaultSlide()
	newSlides.push(slide)
	const newPresentation = {
		...state,
		slides: newSlides,
	}
	history.addHistoryItem(newPresentation)
	return newPresentation
}

function changeSlideOrder(state: Presentation, from: number, to: number): Presentation {
	const newSlides = [...state.slides]
	const removed = newSlides.splice(from, 1)
	newSlides.splice(to, 0, removed[0])
	const newPresentation = {
		...state,
		slides: newSlides,
	}
	history.addHistoryItem(newPresentation)
	return newPresentation
}

function addObject(
	state: Presentation,
	slideId: string,
	object: Image | TextObject | Primitive,
): Presentation {
	const newSlides = state.slides.map((slide) => {
		if (slide.id === slideId) {
			const newObjects = slide.slideObjects.concat(object)
			return {
				...slide,
				slideObjects: newObjects,
			}
		}
		return slide
	})
	const newPresentation = {
		...state,
		slides: newSlides,
	}
	history.addHistoryItem(newPresentation)
	return newPresentation
}

function removeObject(state: Presentation, slideId: string, objectId: string): Presentation {
	const newSlides = state.slides.map((slide) => {
		if (slide.id === slideId) {
			const newObjects = slide.slideObjects.filter((object) => {
				return object.id !== objectId
			})
			return {
				...slide,
				slideObjects: newObjects,
			}
		}
		return slide
	})
	const newPresentation = {
		...state,
		slides: newSlides,
	}
	history.addHistoryItem(newPresentation)
	return newPresentation
}

function changeObject(
	state: Presentation,
	slideId: string,
	objectId: string,
	changeProps: object,
): Presentation {
	const newSlides = state.slides.map((slide) => {
		if (slide.id === slideId) {
			const newObjects = slide.slideObjects.map((object) => {
				if (object.id === objectId) {
					return {
						...object,
						...changeProps,
					}
				}
				return object
			})
			return {
				...slide,
				slideObjects: newObjects,
			}
		}
		return slide
	})
	const newPresentation = {
		...state,
		slides: newSlides,
	}
	history.addHistoryItem(newPresentation)
	return newPresentation
}

async function exportSlides(state: Presentation) {
	const slides = state.slides
	const title = state.title ?? 'untitled'
	const slideSize = [818, 582]
	const doc = new jsPDF({
		unit: 'px',
		orientation: 'l',
		format: slideSize,
	})
	await addSlides(doc, slides)
	doc.deletePage(doc.getNumberOfPages())
	doc.save(title)
}

function undo(state: Presentation): Presentation {
	const prevState = history.undo()
	if (prevState) {
		return prevState
	}
	return state
}

function redo(state: Presentation): Presentation {
	const nextState = history.redo()
	if (nextState) {
		return nextState
	}
	return state
}

const presentationReducer = (state: Presentation = initState.presentation, action: Action) => {
	switch (action.type) {
		case PresentationActions.IMPORT_FROM_JSON:
			return importFromJson(action.payload.presentation)
		case PresentationActions.CHANGE_TITLE:
			return changeTitle(state, action.payload.title)
		case PresentationActions.CHANGE_ORDER:
			return changeSlideOrder(state, action.payload.from, action.payload.to)
		case PresentationActions.ADD_SLIDE:
			return addSlide(state)
		case PresentationActions.DELETE_SLIDE:
			return deleteSlide(state, action.payload.slideId)
		case PresentationActions.CHANGE_SLIDE_BACKGROUND_COLOR:
			return changeSlideBackgroundColor(state, action.payload.slideId, action.payload.color)
		case PresentationActions.CHANGE_SLIDE_BACKGROUND_IMAGE:
			return changeSlideBackgroundImage(state, action.payload.slideId, action.payload.path)
		case PresentationActions.ADD_OBJECT:
			return addObject(state, action.payload.slideId, action.payload.object)
		case PresentationActions.REMOVE_OBJECT:
			return removeObject(state, action.payload.slideId, action.payload.objectId)
		case PresentationActions.CHANGE_OBJECT:
			return changeObject(
				state,
				action.payload.slideId,
				action.payload.objectId,
				action.payload.changeProps,
			)
		case PresentationActions.EXPORT:
			exportSlides(state).then()
			return state
		case PresentationActions.UNDO:
			return undo(state)
		case PresentationActions.REDO:
			return redo(state)
		default:
			return state
	}
}

export { presentationReducer }
