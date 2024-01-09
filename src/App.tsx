import React from 'react'
import Topbar from './components/topbar/Topbar'
import { WorkingField } from './components/workingField/WorkingField'
import styles from './App.module.css'
import { useAppSelector } from './redux/hooks'
import { Player } from './components/player/Player'
import { useUndoRedoListeners } from './hooks/useUndoRedoListeners'

function App() {
	const isPreview = useAppSelector((state) => state.preview)
	useUndoRedoListeners()
	return isPreview ? (
		<Player />
	) : (
		<div className={styles.page}>
			<Topbar />
			<WorkingField />
		</div>
	)
}

export default App
