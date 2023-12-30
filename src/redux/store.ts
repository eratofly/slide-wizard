import { createStore } from 'redux'
import { Editor } from '../model/types'
import { Action } from './actions'
import { presentationReducer } from './presentation'
import { startEditor } from '../data/testDataMin'

const initState = startEditor
function rootReducer(state: Editor = initState, action: Action): Editor {
	const newState: Editor = { ...state }
	newState.presentation = presentationReducer(state.presentation, action)
	return newState
}

const store = createStore(rootReducer)

export { store }
