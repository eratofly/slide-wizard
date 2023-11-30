import React from 'react'
import { Selection, Slide } from '../../model/types'
import { SlideView } from '../slideView/SlideView'
import styles from './SlidePreview.module.css'
import {useSlides} from "../../hooks/useSlides";

type SlidesPreviewProps = {
	slides: Array<Slide>
	selection: Selection
}

function SlidesPreview(props: SlidesPreviewProps) {
	const { slides, selection } = props
	const listSlides = slides.map((slide, index) => {
		return (
			<div key={slide.id} className={styles.element}>
				<span className={styles.index}>{index + 1}</span>
				<div
					className={`${styles.container} ${
						slide.id === selection.slideId ? styles.select : ''
					}`}
				>
					<SlideView
						slide={slide}
						state={'preview'}
						selectedObjectId={selection.objectId}
					/>
				</div>
			</div>
		)
	})
	return <div className={styles.slidesPreview}>{listSlides}</div>
}

export { SlidesPreview }
