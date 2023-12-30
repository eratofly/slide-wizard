import React from 'react'
import { Editor } from '../../model/types'
import { SlidesPreview } from '../slidePreview/SlidePreview'
import { SlideView } from '../slideView/SlideView'
import styles from './WorkingField.module.css'
import {useAppSelector} from "../../redux/hooks";

type EditorViewProps = {
	editor: Editor
}

function WorkingField(props: EditorViewProps) {
	const { editor } = props
	const { slides} = useAppSelector(state => state.presentation)

	function getSelectedSlide() {
		for (const slide of slides) {
			if (slide.id === editor.selection.slideId) {
				return slide
			}
		}
		return slides[0]
	}

	function getSelectedSlideIndex() {
		for (const index in slides) {
			if (slides[index].id === editor.selection.slideId) {
				return Number(index)
			}
		}
		return 0
	}

	return (
		<div className={styles.workingField}>
			<SlidesPreview slides={slides} selection={editor.selection} />
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
