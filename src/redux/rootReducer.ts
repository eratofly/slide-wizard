import { presentationReducer } from './presentation'
import { combineReducers } from 'redux'
import { previewReducer } from './preview'

const rootReducer = combineReducers({
	preview: previewReducer,
	presentation: presentationReducer,
})

export { rootReducer }
