import React from 'react'
import './App.css'
import Topbar from './components/topbar/Topbar'
import { EditorView } from './components/editorView/EditorView'
import { editor } from './data/testDataMax'

function App() {
	return (
		<div>
			<Topbar presentationTitle={editor.presentation.title} />
			<EditorView editor={editor} />
		</div>
	)
}

export default App
