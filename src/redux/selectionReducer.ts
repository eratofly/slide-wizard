import { Action, SelectionActions } from './actions'
import { Selection } from '../model/types'
import { startEditor } from '../data/testDataMin'
import React from 'react'

const initState = startEditor

function selectSlide(slideId: string): Selection {
	return {
		slideId,
	}
}

function selectObject(state: Selection, objectId: string): Selection {
	return {
		...state,
		objectId,
	}
}

function unselectObject(state: Selection, event?: React.MouseEvent): Selection {
	if (event && event.currentTarget !== event.target) return state
	return {
		slideId: state.slideId,
	}
}

const selectionReducer = (state: Selection = initState.selection, action: Action) => {
	switch (action.type) {
		case SelectionActions.SELECT_SLIDE:
			return selectSlide(action.payload.slideId)
		case SelectionActions.SELECT_OBJECT:
			return selectObject(state, action.payload.objectId)
		case SelectionActions.UNSELECT_OBJECT:
			return unselectObject(state, action.payload.event)
		default:
			return state
	}
}

export { selectionReducer }
