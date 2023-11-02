import React, { useState } from 'react'
import { Slide } from '../../model/types'
import styles from './SlideView.module.css'

type SlideViewProps = {
	slide: Slide
}

function SlideView(props: SlideViewProps) {
	const [background, setBackground] = useState(props.slide.backgroundColor.hex)

	function onClick(): void {
		setBackground('#000000')
	}

	return (
		<div className={styles.slide} style={{ backgroundColor: background }} onClick={onClick}>
			{background}
		</div>
	)
}

export { SlideView }
