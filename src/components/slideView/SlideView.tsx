import React, { useState } from 'react'
import { ObjectType, PrimitiveType, Slide } from '../../model/types'
import styles from './SlideView.module.css'
import { TextObjectView } from '../textObjectView/TextObjectView'

type SlideViewProps = {
	slide: Slide
}

function SlideView(props: SlideViewProps) {
	const [background, setBackground] = useState(props.slide.backgroundColor.hex)
	const { slide } = props
	const selectedSlideWidth = 900
	const selectedSlideHeight = 506
	const previewSlideWidth = 160
	const previewSlideHeight = 90
	const widthRelation = previewSlideWidth / selectedSlideWidth
	const heightRelation = previewSlideHeight / selectedSlideHeight
	const listSlideObjects = slide.slideObjects.map((slideObject, index) => {
		if (slideObject.objectType === ObjectType.TEXT) {
			return <TextObjectView key={slideObject.id} textObject={slideObject} zIndex={index} />
		}
		if (slideObject.objectType === ObjectType.IMAGE) {
			return (
				<img
					key={slideObject.id}
					src={slideObject.path}
					alt={''}
					style={{
						zIndex: index,
						position: 'absolute',
						width: `${slideObject.width * widthRelation}px`,
						height: `${slideObject.height * heightRelation}px`,
						marginTop: `${slideObject.y * widthRelation}px`,
						marginLeft: `${slideObject.x * heightRelation}px`,
						rotate: `${slideObject.rotateAngle}deg`,
					}}
				/>
			)
		}
		if (slideObject.objectType === ObjectType.PRIMITIVE) {
			if (slideObject.primitiveType === PrimitiveType.RECTANGLE) {
				return (
					<svg
						width={`${(slideObject.width + slideObject.x) * widthRelation}px`}
						height={`${(slideObject.height + slideObject.y) * heightRelation}px`}
						key={slideObject.id}
						style={{
							zIndex: index,
							position: 'absolute',
							transformOrigin: `
								${(slideObject.width / 2 + slideObject.x) * widthRelation}px
								${(slideObject.height / 2 + slideObject.y) * heightRelation}px`,
							rotate: `${slideObject.rotateAngle}deg`,
						}}
					>
						<rect
							x={`${slideObject.x * widthRelation}px`}
							y={`${slideObject.y * heightRelation}px`}
							width={`${slideObject.width * widthRelation}px`}
							height={`${slideObject.height * heightRelation}px`}
							fill={slideObject.color.hex}
						/>
					</svg>
				)
			}
			if (slideObject.primitiveType === PrimitiveType.ELLIPSE) {
				return (
					<svg
						width={`${(slideObject.width + slideObject.x) * widthRelation}px`}
						height={`${(slideObject.height + slideObject.y) * heightRelation}px`}
						key={slideObject.id}
						style={{
							zIndex: index,
							position: 'absolute',
							transformOrigin: `
								${(slideObject.width / 2 + slideObject.x) * widthRelation}px
								${(slideObject.height / 2 + slideObject.y) * heightRelation}px`,
							rotate: `${slideObject.rotateAngle}deg`,
						}}
					>
						<ellipse
							cx={`${(slideObject.width / 2 + slideObject.x) * widthRelation}px`}
							cy={`${(slideObject.height / 2 + slideObject.y) * heightRelation}px`}
							rx={`${(slideObject.width / 2) * widthRelation}px`}
							ry={`${(slideObject.height / 2) * heightRelation}px`}
							fill={slideObject.color.hex}
						/>
					</svg>
				)
			}
			if (slideObject.primitiveType === PrimitiveType.TRIANGLE) {
				return (
					<svg
						width={`${(slideObject.width + slideObject.x) * widthRelation}px`}
						height={`${(slideObject.height + slideObject.y) * heightRelation}px`}
						key={slideObject.id}
						style={{
							zIndex: index,
							position: 'absolute',
							transformOrigin: `
								${(slideObject.width / 2 + slideObject.x) * widthRelation}px
								${(slideObject.height / 2 + slideObject.y) * heightRelation}px`,
							rotate: `${slideObject.rotateAngle}deg`,
						}}
					>
						<polygon
							points={`
								${slideObject.x * widthRelation} ${(slideObject.height + slideObject.y) * heightRelation},
								${(slideObject.width + slideObject.x) * widthRelation} 
								${(slideObject.height + slideObject.y) * heightRelation},
								${(slideObject.width / 2 + slideObject.x) * widthRelation} ${slideObject.y * heightRelation},
							`}
							fill={slideObject.color.hex}
						/>
					</svg>
				)
			}
		}
	})

	function onClick(): void {
		setBackground('#000000')
	}

	return (
		<div
			className={styles.slide}
			style={{ backgroundColor: background, position: 'relative', zIndex: -1 }}
			onClick={onClick}
		>
			{listSlideObjects}
		</div>
	)
}

export { SlideView }
