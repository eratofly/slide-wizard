import React from 'react'
import { Slide } from '../../model/types'
import { SlideView } from '../slideView/SlideView'

type SlidesPreviewProps = {
	slides: Array<Slide>
}

function SlidesPreview(props: SlidesPreviewProps) {
	const { slides } = props
	const listSlides = slides.map((slide, index) => {
		return (
			<div key={slide.id}>
				<span>{index + 1}.</span>
				<div>
					<SlideView slide={slide} />
				</div>
			</div>
		)
	})
	return <div>{listSlides}</div>
}

export { SlidesPreview }
