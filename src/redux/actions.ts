import {Image, Primitive, Slide, TextObject} from '../model/types'

enum SlidesActions {
	CHANGE_ORDER = 'CHANGE_ORDER',
	ADD_SLIDE = 'ADD_SLIDE',
	DELETE_SLIDE = 'DELETE_SLIDE',
	ADD_OBJECT = 'ADD_OBJECT',
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

type Action = ChangeOrderAction | AddSlideAction | DeleteSlideAction | AddObjectAction

export { SlidesActions, type Action }
