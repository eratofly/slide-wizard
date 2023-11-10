import React from 'react'
import { Editor } from '../../model/types'
import { SlidesPreview } from '../slidePreview/SlidePreview'
import { SlideView } from '../slideView/SlideView'
import styles from './WorkingField.module.css'

type EditorViewProps = {
	editor: Editor
}

function WorkingField(props: EditorViewProps) {
	function getSelectedSlide() {
		for (const slide of props.editor.presentation.slides) {
			if (slide.id === props.editor.selection.slideId) {
				return slide
			}
		}
		return props.editor.presentation.slides[0]
	}

	return (
		<div className={styles.workingField}>
			<SlidesPreview slides={props.editor.presentation.slides} />
			<div className={styles.background}>
				<SlideView slide={getSelectedSlide()} state={'selected'} />
			</div>
		</div>
	)
}

export { WorkingField }
