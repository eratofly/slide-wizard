import React, { useState } from 'react'
import { ObjectType, Slide } from '../model/types'
import { Slide } from '../../model/types'
import styles from './SlideView.module.css'

type SlideViewProps = {
	slide: Slide
}

function SlideView(props: SlideViewProps) {
	const [background, setBackground] = useState(props.slide.backgroundColor.hex)
	const { slide } = props
	const listSlideObjects = slide.slideObjects.map((slideObject) => {
		if (slideObject.objectType === ObjectType.TEXT) {
			const listChars = slideObject.chars.map((char) => (
				<span key={char.id}>{char.value}</span>
			))
			return <div key={slideObject.id}>{listChars}</div>
		}
	})

	function onClick(): void {
		setBackground('#000000')
	}

	return (
		<div className={styles.slide} style={{ backgroundColor: background }} onClick={onClick}>
			{listSlideObjects}
		</div>
	)
}

export { SlideView }
