import React from 'react'
import { Editor } from '../model/types'
import { SlidesPreview } from './slidePreview'
import Topbar from './Topbar'

type EditorViewProps = {
	editor: Editor
}

function EditorView(props: EditorViewProps) {
	return (
		<div>
			<div className="top-bar"></div>
			<div className="working-field">
				<Topbar />
				<SlidesPreview slides={props.editor.presentation.slides} />
			</div>
		</div>
	)
}

export { EditorView }
