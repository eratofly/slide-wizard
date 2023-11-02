import React from 'react'
import './App.css'
import Topbar from './components/topbar/Topbar'
import { EditorView } from './components/editorView'
import { editor } from './data/testDataMax'

function App() {
	return (
		<div>
			<Topbar />
			<EditorView editor={editor} />
		</div>
	)
}

export default App
