import { Action, PresentationActions } from './actions'
import { Image, Presentation, Primitive, Slide, TextObject } from '../model/types'
import { startEditor } from '../data/testDataMax'
import { jsPDF } from 'jspdf'
import { addSlides } from '../model/export'
import { getDefaultSlide } from '../model/utils'

const initState = startEditor

function changeTitle(state: Presentation, title: string): Presentation {
	return {
		...state,
		title,
	}
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
	return {
		...state,
		slides: newSlides,
	}
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
	return {
		...state,
		slides: newSlides,
	}
}

function addSlide(state: Presentation): Presentation {
	const newSlides = [...state.slides]
	const slide: Slide = getDefaultSlide()
	newSlides.push(slide)
	return {
		...state,
		slides: newSlides,
	}
}

function changeSlideOrder(state: Presentation, from: number, to: number): Presentation {
	const newSlides = [...state.slides]
	const removed = newSlides.splice(from, 1)
	newSlides.splice(to, 0, removed[0])
	return {
		...state,
		slides: newSlides,
	}
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
	return {
		...state,
		slides: newSlides,
	}
}

function removeObject(state: Presentation, slideId: string, objectId: string): Presentation {
	console.log(1)
	const newSlides = state.slides.map((slide) => {
		if (slide.id === slideId) {
			const newObjects = slide.slideObjects.filter((object) => {
				return object.id !== objectId
			})
			console.log(newObjects)
			return {
				...slide,
				slideObjects: newObjects,
			}
		}
		return slide
	})
	console.log(newSlides)
	return {
		...state,
		slides: newSlides,
	}
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
	return {
		...state,
		slides: newSlides,
	}
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

const presentationReducer = (state: Presentation = initState.presentation, action: Action) => {
	switch (action.type) {
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
		default:
			return state
	}
}

export { presentationReducer }
