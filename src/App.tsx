import React, { useState } from 'react'
import Topbar from './components/topbar/Topbar'
import { WorkingField } from './components/workingField/WorkingField'
import styles from './App.module.css'
import { startEditor } from './data/testDataMax'

function App() {
	const [editor, setEditor] = useState(startEditor)
	return (
		<div className={styles.page}>
			<Topbar editor={editor} onExport={setEditor} />
			<WorkingField editor={editor} />
		</div>
	)
}

export default App
