import React, { useEffect, useRef, useState } from 'react'
import { Color, ObjectType, Slide, Selection } from '../../model/types'
import styles from './SlideView.module.css'
import { TextObjectView } from '../textObjectView/TextObjectView'
import { PrimitiveObjectView } from '../primitiveObjectView/PrimitiveObjectView'
import { ImageObjectView } from '../imageObjectView/ImageObjectView'

type SlideViewProps = {
	slide: Slide
	state: 'preview' | 'selected'
	selection: Selection
}

function SlideView(props: SlideViewProps) {
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
		const selectedObjectId = props.selection.objectId
		for (const object of slide.slideObjects) {
			if (object.id === selectedObjectId) {
				return object
			}
		}
		return null
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
				<ImageObjectView
					key={slideObject.id}
					image={slideObject}
					slideWidth={slideWidth}
					slideHeight={slideHeight}
				/>
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
			{selectedObject && props.state === 'selected' ? (
				<div
					className={styles.objectSelection}
					style={{
						position: 'absolute',
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
