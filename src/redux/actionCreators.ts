import { SlidesActions } from './actions'
import { Image, Primitive, TextObject } from '../model/types'

function createAddObjectAction(slideId: string, object: TextObject | Image | Primitive) {
	return {
		type: SlidesActions.ADD_OBJECT,
		payload: {
			slideId,
			object,
		},
	}
}

function createChangeOrderAction(from: number, to: number) {
	return {
		type: SlidesActions.CHANGE_ORDER,
		payload: {
			from,
			to,
		},
	}
}

function createAddSlideAction() {
	return {
		type: SlidesActions.ADD_SLIDE,
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

function createExportToPdfAction() {
	return {
		type: SlidesActions.EXPORT,
	}
}
export {
	createChangeOrderAction,
	createAddSlideAction,
	createDeleteSlideAction,
	createAddObjectAction,
	createExportToPdfAction,
}
