import React from 'react'
import './App.css'
import { editor } from './data/testDataMax'
import { EditorView } from './components/editorView'

function App() {
	return (
		<div className="app">
			<EditorView editor={editor}></EditorView>
		</div>
	)
}

export default App
