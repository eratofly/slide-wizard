import { Action, SlidesActions } from './actions'
import { Image, Presentation, Primitive, Slide, TextObject } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { startEditor } from '../data/testDataMax'
import { jsPDF } from 'jspdf'
import { addSlides } from '../model/export'
import { createHistory } from '../model/History'

const initState = startEditor
const history = createHistory<Presentation>(initState.presentation)

function deleteSlide(state: Presentation, slideId: string): Presentation {
	let newSlides = [...state.slides]
	newSlides = newSlides.filter((slide) => {
		return slide.id !== slideId
	})
	try {
		const newPresentation: Presentation = {
			...state,
		}
		newPresentation.slides = newSlides
		history.addHistoryItem(newPresentation)
		return newPresentation
	} catch (e) {
		alert('Can`t delete slide')
	}

	return { ...state }
}

function addSlide(state: Presentation): Presentation {
	const newSlides = [...state.slides]
	const slide: Slide = {
		id: uuidv4(),
		backgroundColor: { hex: '#FFFFFF', opacity: 0 },
		slideObjects: [],
	}
	newSlides.push(slide)
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
		if (slide.id == slideId) {
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
	console.log(prevState)
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
		// case SlidesActions.CHANGE_ORDER:
		// 	const newNotes = [...state]
		// 	const removed = newNotes.splice(action.payload.from, 1)
		// 	newNotes.splice(action.payload.to, 0, removed[0])
		// 	return newNotes
		case SlidesActions.ADD_SLIDE:
			return addSlide(state)
		case SlidesActions.DELETE_SLIDE:
			return deleteSlide(state, action.payload.slideId)
		case SlidesActions.ADD_OBJECT:
			return addObject(state, action.payload.slideId, action.payload.object)
		case SlidesActions.EXPORT:
			exportSlides(state)
			return state
		case SlidesActions.UNDO:
			return undo(state)
		case SlidesActions.REDO:
			return redo(state)
		default:
			return state
	}
}

export { presentationReducer }
