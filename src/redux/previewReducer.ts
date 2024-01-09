import { Action, PreviewActions } from './actions'

const initPreviewModeData = false

const previewReducer = (state: boolean = initPreviewModeData, action: Action) => {
	switch (action.type) {
		case PreviewActions.START_PREVIEW:
			return true
		case PreviewActions.END_PREVIEW:
			return false
		default:
			return state
	}
}

export { previewReducer }
