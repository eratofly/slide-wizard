import { Color, Image } from '../../model/types'
import React from 'react'

type TextObjectViewProps = {
	image: Image
	slideWidth: number
}

function ImageObjectView(props: TextObjectViewProps) {
	const { image, slideWidth } = props
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
}

export { ImageObjectView }
