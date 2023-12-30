import styles from './TriangleView.module.css'
import React, { CSSProperties, useRef } from 'react'
import { Color, Primitive } from '../../model/types'
import { EditableProperties, useDragAndDropObjects } from '../../hooks/useDragAndDropObjects'

type TriangleViewProps = {
	triangle: Primitive
	slideWidth: number
	onClick: () => void
}

function TriangleView(props: TriangleViewProps) {
	const { triangle, slideWidth, onClick } = props
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
		width: `${triangle.width * xRelation}%`,
		height: `${triangle.height * yRelation}%`,
		top: `${triangle.y * yRelation}%`,
		left: `${triangle.x * xRelation}%`,
		rotate: `${triangle.rotateAngle}deg`,
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
			className={styles.triangle}
			onClick={onClick}
			preserveAspectRatio="none"
			viewBox="0 0 100 100"
			style={svgStyle}
		>
			<polygon
				points={`
							0 100,
							100 100,
							50 0
						`}
				fill={getRgbaFromColor(triangle.color)}
				stroke={
					triangle.border !== undefined
						? `${getRgbaFromColor(triangle.border.color)}`
						: '#000000'
				}
				strokeWidth={
					triangle.border !== undefined
						? `${(slideWidth * triangle.border.width) / maxElementX}px`
						: '0'
				}
			/>
		</svg>
	)
}

export { TriangleView }
