import React from 'react'
import { SlidesPreview } from '../slidePreview/SlidePreview'
import { SlideView } from '../slideView/SlideView'
import styles from './WorkingField.module.css'
import { useAppSelector } from '../../redux/hooks'

function WorkingField() {
	const { slides } = useAppSelector((state) => state.presentation)
	const selection = useAppSelector((state) => state.selection)

	function getSelectedSlide() {
		for (const slide of slides) {
			if (slide.id === selection.slideId) {
				return slide
			}
		}
		return slides[0]
	}

	function getSelectedSlideIndex() {
		for (const index in slides) {
			if (slides[index].id === selection.slideId) {
				return Number(index)
			}
		}
		return 0
	}

	return (
		<div className={styles.workingField}>
			<SlidesPreview />
			<div className={styles.background}>
				<SlideView
					index={getSelectedSlideIndex()}
					slide={getSelectedSlide()}
					state={'selected'}
				/>
			</div>
		</div>
	)
}

export { WorkingField }
