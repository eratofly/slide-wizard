import React from 'react'
import { Slide } from '../model/types'
import { SlideView } from './SlideView'

type SlidesPreviewProps = {
	slides: Array<Slide>
}

function SlidesPreview(props: SlidesPreviewProps) {
	const { slides } = props
	const listSlides = slides.map((slide) => <SlideView key={slide.id} slide={slide} />)
	return <div>{listSlides}</div>
}

export { SlidesPreview }
