import React from 'react'
import { Editor } from '../../model/types'
import { SlidesPreview } from '../slidePreview/SlidePreview'
import { SlideView } from '../slideView/SlideView'
import styles from './WorkingField.module.css'

type EditorViewProps = {
	editor: Editor
}

function WorkingField(props: EditorViewProps) {
	const { editor } = props

	function getSelectedSlide() {
		for (const slide of editor.presentation.slides) {
			if (slide.id === editor.selection.slideId) {
				return slide
			}
		}
		return editor.presentation.slides[0]
	}

	function getSelectedSlideIndex() {
		for (const index in editor.presentation.slides) {
			if (editor.presentation.slides[index].id === editor.selection.slideId) {
				return Number(index)
			}
		}
		return 0
	}

	return (
		<div className={styles.workingField}>
			<SlidesPreview slides={editor.presentation.slides} selection={editor.selection} />
			<div className={styles.background}>
				<SlideView
					index={getSelectedSlideIndex()}
					slide={getSelectedSlide()}
					state={'selected'}
					selectedObjectId={editor.selection.objectId}
				/>
			</div>
		</div>
	)
}

export { WorkingField }
