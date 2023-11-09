import React from 'react'
import Topbar from './components/topbar/Topbar'
import { editor } from './data/testDataMax'
import { WorkingField } from './components/workingField/WorkingField'
import styles from './App.module.css'

function App() {
	return (
		<div className={styles.page}>
			<Topbar presentationTitle={editor.presentation.title} />
			<WorkingField editor={editor} />
		</div>
	)
}

export default App
