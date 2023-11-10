import React, { useEffect, useRef, useState } from 'react'
import { ObjectType, PrimitiveType, Slide } from '../../model/types'
import styles from './SlideView.module.css'
import { TextObjectView } from '../textObjectView/TextObjectView'

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

	let slideStateStyle
	if (props.state === 'preview') {
		slideStateStyle = styles.slidePreview
	} else if (props.state === 'selected') {
		slideStateStyle = styles.slideSelected
	}

	const { slide } = props
	const maxElementX = 1600
	const maxElementY = 900
	const xRelation = 100 / maxElementX
	const yRelation = 100 / maxElementY
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
				<img
					key={slideObject.id}
					src={slideObject.path}
					alt={''}
					style={{
						position: 'absolute',
						width: `${slideObject.width * xRelation}%`,
						height: `${slideObject.height * yRelation}%`,
						top: `${slideObject.y * yRelation}%`,
						left: `${slideObject.x * xRelation}%`,
						rotate: `${slideObject.rotateAngle}deg`,
					}}
				/>
			)
		}
		if (slideObject.objectType === ObjectType.PRIMITIVE) {
			if (slideObject.primitiveType === PrimitiveType.RECTANGLE) {
				return (
					<svg
						key={slideObject.id}
						style={{
							position: 'absolute',
							width: `${slideObject.width * xRelation}%`,
							height: `${slideObject.height * yRelation}%`,
							top: `${slideObject.y * yRelation}%`,
							left: `${slideObject.x * xRelation}%`,
							rotate: `${slideObject.rotateAngle}deg`,
						}}
					>
						<rect
							x={0}
							y={0}
							width={`100%`}
							height={`100%`}
							fill={slideObject.color.hex}
						/>
					</svg>
				)
			}
			if (slideObject.primitiveType === PrimitiveType.ELLIPSE) {
				return (
					<svg
						key={slideObject.id}
						style={{
							position: 'absolute',
							width: `${slideObject.width * xRelation}%`,
							height: `${slideObject.height * yRelation}%`,
							top: `${slideObject.y * yRelation}%`,
							left: `${slideObject.x * xRelation}%`,
							rotate: `${slideObject.rotateAngle}deg`,
						}}
					>
						<ellipse
							cx={`50%`}
							cy={`50%`}
							rx={`50%`}
							ry={`50%`}
							fill={slideObject.color.hex}
						/>
					</svg>
				)
			}
			if (slideObject.primitiveType === PrimitiveType.TRIANGLE) {
				return (
					<svg
						key={slideObject.id}
						preserveAspectRatio="none"
						viewBox="0 0 100 100"
						style={{
							position: 'absolute',
							width: `${slideObject.width * xRelation}%`,
							height: `${slideObject.height * yRelation}%`,
							top: `${slideObject.y * yRelation}%`,
							left: `${slideObject.x * xRelation}%`,
							rotate: `${slideObject.rotateAngle}deg`,
						}}
					>
						<polygon
							points={`
								0 100,
								100 100,
								50 0
							`}
							fill={slideObject.color.hex}
						/>
					</svg>
				)
			}
		}
	})

	return (
		<div
			className={`${slideStateStyle}`}
			style={{ backgroundColor: slide.backgroundColor.hex }}
			ref={slideRef}
		>
			{listSlideObjects}
		</div>
	)
}

export { SlideView }
