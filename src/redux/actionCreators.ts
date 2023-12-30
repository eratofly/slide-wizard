import { SlidesActions } from './actions'
import { Slide } from '../model/types'

function createChangeOrderAction(from: number, to: number) {
	return {
		type: SlidesActions.CHANGE_ORDER,
		payload: {
			from,
			to,
		},
	}
}

function createAddSlideAction(slide: Slide) {
	return {
		type: SlidesActions.ADD_SLIDE,
		payload: slide,
	}
}

function createDeleteSlideAction(slideId: string) {
	return {
		type: SlidesActions.DELETE_SLIDE,
		payload: {
			slideId,
		},
	}
}
export { createChangeOrderAction, createAddSlideAction, createDeleteSlideAction }
