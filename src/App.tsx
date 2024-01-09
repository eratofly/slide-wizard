import React from 'react'
import Topbar from './components/topbar/Topbar'
import { WorkingField } from './components/workingField/WorkingField'
import styles from './App.module.css'

function App() {
	return (
		<div className={styles.page}>
			<Topbar />
			<WorkingField />
		</div>
	)
}

export default App
