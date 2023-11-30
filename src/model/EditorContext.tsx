import React from 'react'
import { Editor } from './types'
import { startEditor } from '../data/testDataMin'

type EditorContextType = {
	editor: Editor
	setEditor: React.Dispatch<React.SetStateAction<Editor>>
}

const EditorContext = React.createContext<EditorContextType>({
	editor: startEditor,
	setEditor: () => void {},
})

export { EditorContext }
