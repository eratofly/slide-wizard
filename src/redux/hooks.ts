import { rootReducer } from './rootReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PresentationActionCreator from './actionCreators'

// Выведение типа `RootState` из хранилища
type RootState = ReturnType<typeof rootReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useAppActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(PresentationActionCreator, dispatch)
}

export { useAppActions, useAppSelector }
