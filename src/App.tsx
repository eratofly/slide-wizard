import React, { useState } from 'react'
import Topbar from './components/topbar/Topbar'
import { WorkingField } from './components/workingField/WorkingField'
import styles from './App.module.css'
import { startEditor } from './data/testDataMax'
import { EditorContext } from './model/EditorContext'

function App() {
	const [editor, setEditor] = useState(startEditor)
	return (
		<EditorContext.Provider value={{ editor: editor, setEditor }}>
			<div className={styles.page}>
				<Topbar editor={editor} />
				<WorkingField editor={editor} />
			</div>
		</EditorContext.Provider>
	)
}

export default App
