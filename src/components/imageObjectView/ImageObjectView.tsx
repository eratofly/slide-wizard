import { Color, Image } from '../../model/types'
import React from 'react'
import styles from './ImageObjectView.module.css'

type ImageObjectViewProps = {
	image: Image
	slideWidth: number
	slideHeight: number
	onClick: () => void
}

function ImageObjectView(props: ImageObjectViewProps) {
	const { image, slideWidth, slideHeight, onClick } = props
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

	return (
		<div
			className={styles.wrapper}
			style={{
				width: `${(image.crop ? image.crop.width : image.width) * xRelation}%`,
				height: `${(image.crop ? image.crop.height : image.height) * yRelation}%`,
				top: `${((image.crop ? image.crop.y : 0) + image.y) * yRelation}%`,
				left: `${((image.crop ? image.crop.x : 0) + image.x) * xRelation}%`,
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
				className={styles.image}
				onClick={onClick}
				src={image.path}
				alt={''}
				style={{
					width: `${(image.width * slideHeight) / maxElementY}px`,
					height: `${(image.height * slideWidth) / maxElementX}px`,
					top: `${((image.crop ? -image.crop.y : 0) * slideHeight) / maxElementY}px`,
					left: `${((image.crop ? -image.crop.x : 0) * slideWidth) / maxElementX}px`,
				}}
			/>
		</div>
	)
}

export { ImageObjectView }
