import styles from './RectangleView.module.css'
import React, { CSSProperties, useRef } from 'react'
import { Color, Primitive } from '../../model/types'
import { EditableProperties, useDragAndDropObjects } from '../../hooks/useDragAndDropObjects'

type RectangleViewProps = {
	rectangle: Primitive
	slideWidth: number
	onClick: () => void
	onKeyPress: () => void
}

function RectangleView(props: RectangleViewProps) {
	const { rectangle, slideWidth, onClick, onKeyPress } = props
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
		width: `${rectangle.width * xRelation}%`,
		height: `${rectangle.height * yRelation}%`,
		top: `${rectangle.y * yRelation}%`,
		left: `${rectangle.x * xRelation}%`,
		rotate: `${rectangle.rotateAngle}deg`,
	}

	const dndRef = useRef<SVGSVGElement>(null)
	const { dragAndDrop } = useDragAndDropObjects(dndRef, [
		EditableProperties.X,
		EditableProperties.Y,
	])
	dragAndDrop()

	return (
		<svg
			ref={dndRef}
			className={styles.rectangle}
			onClick={onClick}
			onKeyPress={onKeyPress}
			style={svgStyle}
		>
			<rect
				x={0}
				y={0}
				width={`100%`}
				height={`100%`}
				fill={getRgbaFromColor(rectangle.color)}
				stroke={
					rectangle.border !== undefined
						? `${getRgbaFromColor(rectangle.border.color)}`
						: '#000000'
				}
				strokeWidth={
					rectangle.border !== undefined
						? `${(slideWidth * rectangle.border.width) / maxElementX}px`
						: '0'
				}
			/>
		</svg>
	)
}

export { RectangleView }
