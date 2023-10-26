import React, { useState } from 'react'
import { Slide } from '../model/types'

type SlideViewProps = {
	slide: Slide
}

function SlideView(props: SlideViewProps) {
	const [background, setBackground] = useState(props.slide.backgroundColor.hex)

	function onClick(): void {
		setBackground('#000000')
	}

	return (
		<div style={{ backgroundColor: background }} onClick={onClick}>
			{background}
		</div>
	)
}

export { SlideView }
