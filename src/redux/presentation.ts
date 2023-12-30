import { Action, SlidesActions } from './actions'
import { Presentation, Slide } from '../model/types'
import { v4 as uuidv4 } from 'uuid'

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

const presentationReducer = (state: Presentation, action: Action) => {
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
		default:
			return state
	}
}

export { presentationReducer }
