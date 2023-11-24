import React, { useEffect, useRef, useState } from 'react'
import { Color, ObjectType, Slide } from '../../model/types'
import styles from './SlideView.module.css'
import { TextObjectView } from '../textObjectView/TextObjectView'
import { PrimitiveObjectView } from '../primitiveObjectView/PrimitiveObjectView'
import { ImageObjectView } from '../imageObjectView/ImageObjectView'

type SlideViewProps = {
	slide: Slide
	state: 'preview' | 'selected'
	selectedObjectId?: string
}

function SlideView(props: SlideViewProps) {
	const { slide, state, selectedObjectId } = props
	const maxElementX = 1600
	const maxElementY = 900
	const xRelation = 100 / maxElementX
	const yRelation = 100 / maxElementY
	const slideRef = useRef<HTMLDivElement>(null)
	const [slideWidth, setSlideWidth] = useState(0)
	const [slideHeight, setSlideHeight] = useState(0)
	useEffect(() => {
		setSlideWidth(slideRef.current ? slideRef.current.offsetWidth : 0)
		setSlideHeight(slideRef.current ? slideRef.current.offsetHeight : 0)
	}, [slideRef.current])

	function getRgbaFromColor(color: Color) {
		const numericValue = parseInt(color.hex.substring(1), 16)
		const r = (numericValue >> 16) & 0xff
		const g = (numericValue >> 8) & 0xff
		const b = numericValue & 0xff
		return `rgba(${r}, ${g}, ${b})`
	}

	function getSelectedObject() {
		for (const object of slide.slideObjects) {
			if (object.id === selectedObjectId) {
				return object
			}
		}
		return null
	}

	let slideStateStyle
	if (state === 'preview') {
		slideStateStyle = styles.slidePreview
	} else if (state === 'selected') {
		slideStateStyle = styles.slideSelected
	}

	const listSlideObjects = slide.slideObjects.map((slideObject) => {
		let object
		if (slideObject.objectType === ObjectType.TEXT) {
			object = (
				<TextObjectView
					key={slideObject.id}
					textObject={slideObject}
					slideWidth={slideWidth}
				/>
			)
		} else if (slideObject.objectType === ObjectType.IMAGE) {
			object = (
				<ImageObjectView
					key={slideObject.id}
					image={slideObject}
					slideWidth={slideWidth}
					slideHeight={slideHeight}
				/>
			)
		} else if (slideObject.objectType === ObjectType.PRIMITIVE) {
			object = (
				<PrimitiveObjectView
					key={slideObject.id}
					primitive={slideObject}
					slideWidth={slideWidth}
				/>
			)
		}

		return object
	})

	const selectedObject = getSelectedObject()

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
			{selectedObject && state === 'selected' ? (
				<div
					className={styles.objectSelection}
					style={{
						width: `${selectedObject.width * xRelation}%`,
						height: `${selectedObject.height * yRelation}%`,
						top: `${selectedObject.y * yRelation}%`,
						left: `${selectedObject.x * xRelation}%`,
						rotate: `${selectedObject.rotateAngle}deg`,
					}}
				></div>
			) : null}
		</div>
	)
}

export { SlideView }
