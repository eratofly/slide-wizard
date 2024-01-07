import { Action, SlidesActions } from './actions'
import { Image, Presentation, Primitive, Slide, TextObject } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { startEditor } from '../data/testDataMax'

const initState = startEditor

function deleteSlide(state: Presentation, slideId: string): Presentation {
	let newSlides = [...state.slides]
	newSlides = newSlides.filter((slide) => {
		if (slide.id !== slideId) {
			return true
		}
		return false
	})
	try {
		const newPresentation: Presentation = {
			...state,
		}
		newPresentation.slides = newSlides
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
	const newPresentation: Presentation = {
		...state,
		slides: newSlides,
	}
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
	const newPresentation: Presentation = {
		...state,
		slides: newSlides,
	}
	return newPresentation
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
		default:
			return state
	}
}

export { presentationReducer }
