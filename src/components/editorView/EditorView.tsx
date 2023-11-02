import React from 'react'
import { Editor } from '../../model/types'
import { SlidesPreview } from '../slidePreview/SlidePreview'

type EditorViewProps = {
	editor: Editor
}

function EditorView(props: EditorViewProps) {
	return (
		<div>
			<div className="top-bar"></div>
			<div className="working-field">
				<SlidesPreview slides={props.editor.presentation.slides} />
			</div>
		</div>
	)
}

export { EditorView }
