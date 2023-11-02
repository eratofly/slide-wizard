import React from 'react'
import './App.css'
import Topbar from './components/topbar/Topbar'
import { SlidesPreview } from './components/slidePreview/SlidePreview'
import { editor } from './data/testDataMax'

function App() {
	return (
		<div>
			<Topbar />
			<SlidesPreview slides={editor.presentation.slides} />
		</div>
	)
}

export default App
