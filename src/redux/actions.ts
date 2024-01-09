import { Image, Presentation, Primitive, Slide, TextObject } from '../model/types'
import React from 'react'

enum PresentationActions {
	IMPORT_FROM_JSON = 'IMPORT_FROM_JSON',
	CHANGE_TITLE = 'CHANGE_TITLE',
	CHANGE_ORDER = 'CHANGE_ORDER',
	ADD_SLIDE = 'ADD_SLIDE',
	DELETE_SLIDE = 'DELETE_SLIDE',
	CHANGE_SLIDE_BACKGROUND_COLOR = 'CHANGE_SLIDE_BACKGROUND_COLOR',
	CHANGE_SLIDE_BACKGROUND_IMAGE = 'CHANGE_SLIDE_BACKGROUND_IMAGE',
	ADD_OBJECT = 'ADD_OBJECT',
	REMOVE_OBJECT = 'REMOVE_OBJECT',
	CHANGE_OBJECT = 'CHANGE_OBJECT',
	EXPORT = 'EXPORT',
}

enum SelectionActions {
	SELECT_SLIDE = 'SELECT_SLIDE',
	SELECT_OBJECT = 'SELECT_OBJECT',
	UNSELECT_OBJECT = 'UNSELECT_OBJECT',
}

type ImportFromJsonAction = {
	type: PresentationActions.IMPORT_FROM_JSON
	payload: {
		presentation: Presentation
	}
}

type ChangeTitleAction = {
	type: PresentationActions.CHANGE_TITLE
	payload: {
		title: string
	}
}

type AddObjectAction = {
	type: PresentationActions.ADD_OBJECT
	payload: {
		slideId: string
		object: TextObject | Image | Primitive
	}
}

type RemoveObjectAction = {
	type: PresentationActions.REMOVE_OBJECT
	payload: {
		slideId: string
		objectId: string
	}
}

type ChangeObjectAction = {
	type: PresentationActions.CHANGE_OBJECT
	payload: {
		slideId: string
		objectId: string
		changeProps: object
	}
}

type ChangeOrderAction = {
	type: PresentationActions.CHANGE_ORDER
	payload: {
		from: number
		to: number
	}
}

type AddSlideAction = {
	type: PresentationActions.ADD_SLIDE
}

type DeleteSlideAction = {
	type: PresentationActions.DELETE_SLIDE
	payload: {
		slideId: string
	}
}

type ChangeSlideBackgroundColorAction = {
	type: PresentationActions.CHANGE_SLIDE_BACKGROUND_COLOR
	payload: {
		slideId: string
		color: string
	}
}

type ChangeSlideBackgroundImageAction = {
	type: PresentationActions.CHANGE_SLIDE_BACKGROUND_IMAGE
	payload: {
		slideId: string
		path: string
	}
}

type ExportAction = {
	type: PresentationActions.EXPORT
	payload: {
		slides: Array<Slide>
	}
}

type SelectSlideAction = {
	type: SelectionActions.SELECT_SLIDE
	payload: {
		slideId: string
	}
}

type SelectObjectAction = {
	type: SelectionActions.SELECT_OBJECT
	payload: {
		objectId: string
	}
}

type UnselectObjectAction = {
	type: SelectionActions.UNSELECT_OBJECT
	payload: {
		event: React.MouseEvent
	}
}

type Action =
	| ImportFromJsonAction
	| ChangeTitleAction
	| ChangeOrderAction
	| AddSlideAction
	| DeleteSlideAction
	| ChangeSlideBackgroundColorAction
	| ChangeSlideBackgroundImageAction
	| AddObjectAction
	| RemoveObjectAction
	| ChangeObjectAction
	| ExportAction
	| SelectSlideAction
	| SelectObjectAction
	| UnselectObjectAction

export { PresentationActions, SelectionActions, type Action }
