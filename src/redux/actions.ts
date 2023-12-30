import { Slide } from '../model/types'

enum SlidesActions {
	CHANGE_ORDER = 'CHANGE_ORDER',
	ADD_SLIDE = 'ADD_SLIDE',
	DELETE_SLIDE = 'DELETE_SLIDE',
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

type Action = ChangeOrderAction | AddSlideAction | DeleteSlideAction

export { SlidesActions, type Action }
