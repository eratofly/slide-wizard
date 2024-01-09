import { presentationReducer } from './presentationReducer'
import { combineReducers } from 'redux'
import { selectionReducer } from './selectionReducer'

const rootReducer = combineReducers({
	presentation: presentationReducer,
	selection: selectionReducer,
})

export { rootReducer }
