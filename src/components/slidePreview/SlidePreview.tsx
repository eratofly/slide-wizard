import React from 'react'
import { Slide } from '../../model/types'
import { SlideView } from '../slideView/SlideView'
import styles from './SlidePreview.module.css'

type SlidesPreviewProps = {
	slides: Array<Slide>
}

function SlidesPreview(props: SlidesPreviewProps) {
	const { slides } = props
	const listSlides = slides.map((slide, index) => {
		return (
			<div key={slide.id} className={styles.element}>
				<span className={styles.index}>{index + 1}</span>
				<div className={styles.container}>
					<SlideView slide={slide} state={'preview'} />
				</div>
			</div>
		)
	})
	return <div className={styles['slides-preview']}>{listSlides}</div>
}

export { SlidesPreview }
