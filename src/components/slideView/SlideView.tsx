import React, { useState } from 'react'
import { Slide } from '../../model/types'
import styles from './SlideView.module.css'

type SlideViewProps = {
	slide: Slide
	state: 'preview' | 'selected'
}

function SlideView(props: SlideViewProps) {
	const [background] = useState(props.slide.backgroundColor.hex)
	let slideStateStyle
	if (props.state === 'preview') {
		slideStateStyle = styles.slidePreview
	} else if (props.state === 'selected') {
		slideStateStyle = styles.slideSelected
	}

	return <div className={`${slideStateStyle}`} style={{ backgroundColor: background }}></div>
}

export { SlideView }
