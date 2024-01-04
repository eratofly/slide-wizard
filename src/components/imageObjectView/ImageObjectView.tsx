import { Color, Image } from '../../model/types'
import React, { useRef } from 'react'
import styles from './ImageObjectView.module.css'
import { EditableProperties, useDragAndDropObjects } from '../../hooks/useDragAndDropObjects'

type ImageObjectViewProps = {
	image: Image
	slideWidth: number
	slideHeight: number
	onClick: () => void
}

function ImageObjectView(props: ImageObjectViewProps) {
	const { image, slideWidth, onClick } = props
	const maxElementX = 1600
	const maxElementY = 900
	const xRelation = 100 / maxElementX
	const yRelation = 100 / maxElementY

	function getRgbaFromColor(color: Color) {
		const numericValue = parseInt(color.hex.substring(1), 16)
		const r = (numericValue >> 16) & 0xff
		const g = (numericValue >> 8) & 0xff
		const b = numericValue & 0xff
		return `rgba(${r}, ${g}, ${b}, ${color.opacity})`
	}

	const dndRef = useRef<HTMLImageElement>(null)
	const { dragAndDrop } = useDragAndDropObjects(dndRef, [
		EditableProperties.X,
		EditableProperties.Y,
	])
	dragAndDrop()

	return (
		<img
			className={styles.image}
			ref={dndRef}
			onClick={onClick}
			src={image.path}
			alt={''}
			style={{
				width: `${image.width * xRelation}%`,
				height: `${image.height * yRelation}%`,
				top: `${image.y * yRelation}%`,
				left: `${image.x * xRelation}%`,
				border:
					image.border !== undefined
						? `${
								(slideWidth * image.border.width) / maxElementX
						  }px solid ${getRgbaFromColor(image.border.color)}`
						: 'none',
				rotate: `${image.rotateAngle}deg`,
			}}
		/>
	)
}

export { ImageObjectView }
