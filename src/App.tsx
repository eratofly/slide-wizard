import React from 'react'
import './App.css'
import Topbar from './components/topbar/Topbar'
import { editor } from './data/testDataMax'
import { WorkingField } from './components/editorView/WorkingField'

function App() {
	return (
		<div>
			<Topbar presentationTitle={editor.presentation.title} />
			<WorkingField editor={editor} />
		</div>
	)
}

export default App
