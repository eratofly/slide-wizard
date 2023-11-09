import React, { useState } from 'react'
import { ObjectType, Slide } from '../../model/types'
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

	const { slide } = props
	const listSlideObjects = slide.slideObjects.map((slideObject) => {
		if (slideObject.objectType === ObjectType.TEXT) {
			const listChars = slideObject.chars.map((char) => (
				<span key={char.id}>{char.value}</span>
			))
			return <div key={slideObject.id}>{listChars}</div>
		}
	})

	return (
		<div className={`${slideStateStyle}`} style={{ backgroundColor: background }}>
			{listSlideObjects}
		</div>
	)
}

export { SlideView }
