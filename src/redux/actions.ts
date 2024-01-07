import { Image, Primitive, Slide, TextObject } from '../model/types'

enum SlidesActions {
	CHANGE_ORDER = 'CHANGE_ORDER',
	ADD_SLIDE = 'ADD_SLIDE',
	DELETE_SLIDE = 'DELETE_SLIDE',
	ADD_OBJECT = 'ADD_OBJECT',
	EXPORT = 'EXPORT',
}

type AddObjectAction = {
	type: SlidesActions.ADD_OBJECT
	payload: {
		slideId: string
		object: TextObject | Image | Primitive
	}
}

type ChangeOrderAction = {
	type: SlidesActions.CHANGE_ORDER
	payload: {
		from: number
		to: number
	}
}

type AddSlideAction = {
	type: SlidesActions.ADD_SLIDE
	payload: Slide
}

type DeleteSlideAction = {
	type: SlidesActions.DELETE_SLIDE
	payload: {
		slideId: string
	}
}

type ExportAction = {
	type: SlidesActions.EXPORT
	payload: {
		slides: Array<Slide>
	}
}

type Action =
	| ChangeOrderAction
	| AddSlideAction
	| DeleteSlideAction
	| AddObjectAction
	| ExportAction

export { SlidesActions, type Action }
