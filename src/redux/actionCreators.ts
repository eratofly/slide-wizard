import { PresentationActions, SelectionActions, PreviewActions } from './actions'
import { Image, Presentation, Primitive, TextObject } from '../model/types'
import React from 'react'

function createImportFromJsonAction(presentation: Presentation) {
	return {
		type: PresentationActions.IMPORT_FROM_JSON,
		payload: {
			presentation,
		},
	}
}

function createChangeTitleAction(title: string) {
	return {
		type: PresentationActions.CHANGE_TITLE,
		payload: {
			title,
		},
	}
}

function createAddObjectAction(slideId: string, object: TextObject | Image | Primitive) {
	return {
		type: PresentationActions.ADD_OBJECT,
		payload: {
			slideId,
			object,
		},
	}
}

function createRemoveObjectAction(slideId: string, objectId: string) {
	return {
		type: PresentationActions.REMOVE_OBJECT,
		payload: {
			slideId,
			objectId,
		},
	}
}

function createChangeObjectAction(slideId: string, objectId: string, changeProps: object) {
	return {
		type: PresentationActions.CHANGE_OBJECT,
		payload: {
			slideId,
			objectId,
			changeProps,
		},
	}
}

function createChangeOrderAction(from: number, to: number) {
	return {
		type: PresentationActions.CHANGE_ORDER,
		payload: {
			from,
			to,
		},
	}
}

function createAddSlideAction() {
	return {
		type: PresentationActions.ADD_SLIDE,
	}
}

function createDeleteSlideAction(slideId: string) {
	return {
		type: PresentationActions.DELETE_SLIDE,
		payload: {
			slideId,
		},
	}
}

function createChangeSlideBackgroundColorAction(slideId: string, color: string) {
	return {
		type: PresentationActions.CHANGE_SLIDE_BACKGROUND_COLOR,
		payload: {
			slideId,
			color,
		},
	}
}

function createChangeSlideBackgroundImageAction(slideId: string, path: string) {
	return {
		type: PresentationActions.CHANGE_SLIDE_BACKGROUND_IMAGE,
		payload: {
			slideId,
			path,
		},
	}
}

function createStartPreviewAction() {
	return {
		type: PreviewActions.START_PREVIEW,
	}
}

function createEndPreviewAction() {
	return {
		type: PreviewActions.END_PREVIEW,
	}
}

function createExportToPdfAction() {
	return {
		type: PresentationActions.EXPORT,
	}
}

function createSelectSlideAction(slideId: string) {
	return {
		type: SelectionActions.SELECT_SLIDE,
		payload: {
			slideId,
		},
	}
}

function createSelectObjectAction(objectId: string) {
	return {
		type: SelectionActions.SELECT_OBJECT,
		payload: {
			objectId,
		},
	}
}

function createUnselectObjectAction(event?: React.MouseEvent) {
	return {
		type: SelectionActions.UNSELECT_OBJECT,
		payload: {
			event,
		},
	}
}

function createUndoAction() {
	return {
		type: PresentationActions.UNDO,
	}
}

function createRedoAction() {
	return {
		type: PresentationActions.REDO,
	}
}

export {
	createImportFromJsonAction,
	createChangeTitleAction,
	createChangeOrderAction,
	createAddSlideAction,
	createDeleteSlideAction,
	createChangeSlideBackgroundColorAction,
	createChangeSlideBackgroundImageAction,
	createAddObjectAction,
	createRemoveObjectAction,
	createChangeObjectAction,
	createStartPreviewAction,
	createEndPreviewAction,
	createExportToPdfAction,
	createSelectSlideAction,
	createSelectObjectAction,
	createUnselectObjectAction,
	createUndoAction,
	createRedoAction,
}
