import { Color, Image } from '../../model/types'
import React from 'react'
import styles from './ImageObjectView.module.css'

type ImageObjectViewProps = {
	image: Image
	slideWidth: number
	slideHeight: number
}

function ImageObjectView(props: ImageObjectViewProps) {
	const { image, slideWidth, slideHeight } = props
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

	if (!image.crop) {
		return (
			<img
				src={image.path}
				alt={''}
				style={{
					position: 'absolute',
					width: `${image.width * xRelation}%`,
					height: `${image.height * yRelation}%`,
					top: `${image.y * yRelation}%`,
					left: `${image.x * xRelation}%`,
					rotate: `${image.rotateAngle}deg`,
					border:
						image.border !== undefined
							? `${
									(slideWidth * image.border.width) / maxElementX
							  }px solid ${getRgbaFromColor(image.border.color)}`
							: 'none',
				}}
			/>
		)
	} else {
		return (
			<div
				className={styles.wrapper}
				style={{
					position: 'relative',
					width: `${image.crop.width * xRelation}%`,
					height: `${image.crop.height * yRelation}%`,
					top: `${(image.crop.y + image.y) * yRelation}%`,
					left: `${(image.crop.x + image.x) * xRelation}%`,
					rotate: `${image.rotateAngle}deg`,
					border:
						image.border !== undefined
							? `${
									(slideWidth * image.border.width) / maxElementX
							  }px solid ${getRgbaFromColor(image.border.color)}`
							: 'none',
				}}
			>
				<img
					src={image.path}
					alt={''}
					style={{
						position: 'absolute',
						width: `${(image.width * slideHeight) / maxElementY}px`,
						height: `${(image.height * slideWidth) / maxElementX}px`,
						top: `${(-image.crop.y * slideHeight) / maxElementY}px`,
						left: `${(-image.crop.x * slideWidth) / maxElementX}px`,
					}}
				/>
			</div>
		)
	}
}

export { ImageObjectView }
