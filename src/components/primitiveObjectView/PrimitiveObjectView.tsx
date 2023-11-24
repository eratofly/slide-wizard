import { Color, Primitive, PrimitiveType } from '../../model/types'
import React, { CSSProperties } from 'react'

type PrimitiveObjectViewProps = {
	primitive: Primitive
	slideWidth: number
}

function PrimitiveObjectView(props: PrimitiveObjectViewProps) {
	const { primitive, slideWidth } = props
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

	const svgStyle: CSSProperties = {
		position: 'absolute',
		width: `${primitive.width * xRelation}%`,
		height: `${primitive.height * yRelation}%`,
		top: `${primitive.y * yRelation}%`,
		left: `${primitive.x * xRelation}%`,
		rotate: `${primitive.rotateAngle}deg`,
	}

	if (primitive.primitiveType === PrimitiveType.RECTANGLE) {
		return (
			<svg style={svgStyle}>
				<rect
					x={0}
					y={0}
					width={`100%`}
					height={`100%`}
					fill={getRgbaFromColor(primitive.color)}
					stroke={
						primitive.border !== undefined
							? `${getRgbaFromColor(primitive.border.color)}`
							: '#000000'
					}
					stroke-width={
						primitive.border !== undefined
							? `${(slideWidth * primitive.border.width) / maxElementX}px`
							: '0'
					}
				/>
			</svg>
		)
	} else if (primitive.primitiveType === PrimitiveType.ELLIPSE) {
		return (
			<svg style={svgStyle}>
				<ellipse
					cx={`50%`}
					cy={`50%`}
					rx={`50%`}
					ry={`50%`}
					fill={getRgbaFromColor(primitive.color)}
					stroke={
						primitive.border !== undefined
							? `${getRgbaFromColor(primitive.border.color)}`
							: '#000000'
					}
					stroke-width={
						primitive.border !== undefined
							? `${(slideWidth * primitive.border.width) / maxElementX}px`
							: '0'
					}
				/>
			</svg>
		)
	} else if (primitive.primitiveType === PrimitiveType.TRIANGLE) {
		return (
			<svg preserveAspectRatio="none" viewBox="0 0 100 100" style={svgStyle}>
				<polygon
					points={`
							0 100,
							100 100,
							50 0
						`}
					fill={getRgbaFromColor(primitive.color)}
					stroke={
						primitive.border !== undefined
							? `${getRgbaFromColor(primitive.border.color)}`
							: '#000000'
					}
					stroke-width={
						primitive.border !== undefined
							? `${(slideWidth * primitive.border.width) / maxElementX}px`
							: '0'
					}
				/>
			</svg>
		)
	} else {
		return <div></div>
	}
}

export { PrimitiveObjectView }
