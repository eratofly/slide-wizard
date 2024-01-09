import { presentationReducer } from './presentationReducer'
import { combineReducers } from 'redux'
import { previewReducer } from './previewReducer'
import { selectionReducer } from './selectionReducer'

const rootReducer = combineReducers({
	preview: previewReducer,
	presentation: presentationReducer,
	selection: selectionReducer,
})

export { rootReducer }
