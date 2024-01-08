import React, { useState } from 'react'
import Topbar from './components/topbar/Topbar'
import { WorkingField } from './components/workingField/WorkingField'
import styles from './App.module.css'
import { startEditor } from './data/testDataMax'
import { EditorContext } from './model/EditorContext'
import { useAppSelector } from './redux/hooks'
import { Player } from './components/player/Player'
import { useUndoRedoListeners } from './hooks/useUndoRedoListeners'

function App() {
	const [editor, setEditor] = useState(startEditor)
	const isPreview = useAppSelector((state) => state.preview)
	useUndoRedoListeners()
	const content = isPreview ? (
		<Player />
	) : (
		<div className={styles.page}>
			<Topbar editor={editor} />
			<WorkingField editor={editor} />
		</div>
	)
	return (
		<EditorContext.Provider value={{ editor: editor, setEditor }}>
			{content}
		</EditorContext.Provider>
	)
}

export default App
