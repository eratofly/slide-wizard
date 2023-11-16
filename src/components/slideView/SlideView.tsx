import React, { useEffect, useRef, useState } from 'react'
import { Color, ObjectType, Slide } from '../../model/types'
import styles from './SlideView.module.css'
import { TextObjectView } from '../textObjectView/TextObjectView'
import { PrimitiveObjectView } from '../primitiveObjectView/PrimitiveObjectView'
import { ImageObjectView } from '../imageObjectView/ImageObjectView'

type SlideViewProps = {
	slide: Slide
	state: 'preview' | 'selected'
}

function SlideView(props: SlideViewProps) {
	const slideRef = useRef<HTMLDivElement>(null)
	const [slideWidth, setSlideWidth] = useState(0)
	useEffect(() => {
		setSlideWidth(slideRef.current ? slideRef.current.offsetWidth : 0)
	}, [slideRef.current])

	function getRgbaFromColor(color: Color) {
		const numericValue = parseInt(color.hex.substring(1), 16)
		const r = (numericValue >> 16) & 0xff
		const g = (numericValue >> 8) & 0xff
		const b = numericValue & 0xff
		return `rgba(${r}, ${g}, ${b}, ${color.opacity})`
	}

	let slideStateStyle
	if (props.state === 'preview') {
		slideStateStyle = styles.slidePreview
	} else if (props.state === 'selected') {
		slideStateStyle = styles.slideSelected
	}

	const { slide } = props
	const listSlideObjects = slide.slideObjects.map((slideObject) => {
		if (slideObject.objectType === ObjectType.TEXT) {
			return (
				<TextObjectView
					key={slideObject.id}
					textObject={slideObject}
					slideWidth={slideWidth}
				/>
			)
		}
		if (slideObject.objectType === ObjectType.IMAGE) {
			return (
				<ImageObjectView key={slideObject.id} image={slideObject} slideWidth={slideWidth} />
			)
		}
		if (slideObject.objectType === ObjectType.PRIMITIVE) {
			return (
				<PrimitiveObjectView
					key={slideObject.id}
					primitive={slideObject}
					slideWidth={slideWidth}
				/>
			)
		}
	})

	return (
		<div
			className={`${slideStateStyle}`}
			style={{
				background: `center / 100% 100% no-repeat ${getRgbaFromColor(
					slide.backgroundColor,
				)} url(${slide.backgroundImage})`,
			}}
			ref={slideRef}
		>
			{listSlideObjects}
		</div>
	)
}

export { SlideView }
