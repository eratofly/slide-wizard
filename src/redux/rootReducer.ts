import { presentationReducer } from './presentation'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	presentation: presentationReducer,
})

export { rootReducer }
