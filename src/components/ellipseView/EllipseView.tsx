import styles from './EllipseView.module.css'
import React, { CSSProperties, useRef } from 'react'
import { Color, Primitive } from '../../model/types'
import { EditableProperties, useDragAndDropObjects } from '../../hooks/useDragAndDropObjects'

type EllipseViewProps = {
	ellipse: Primitive
	slideWidth: number
	onClick: () => void
}

function EllipseView(props: EllipseViewProps) {
	const { ellipse, slideWidth, onClick } = props
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
		width: `${ellipse.width * xRelation}%`,
		height: `${ellipse.height * yRelation}%`,
		top: `${ellipse.y * yRelation}%`,
		left: `${ellipse.x * xRelation}%`,
		rotate: `${ellipse.rotateAngle}deg`,
	}

	const dndRef = useRef<SVGSVGElement>(null)
	const { dragAndDrop } = useDragAndDropObjects(dndRef, [
		EditableProperties.X,
		EditableProperties.Y,
	])
	dragAndDrop()

	return (
		<svg ref={dndRef} className={styles.ellipse} onClick={onClick} style={svgStyle}>
			<ellipse
				cx={`50%`}
				cy={`50%`}
				rx={`50%`}
				ry={`50%`}
				fill={getRgbaFromColor(ellipse.color)}
				stroke={
					ellipse.border !== undefined
						? `${getRgbaFromColor(ellipse.border.color)}`
						: '#000000'
				}
				strokeWidth={
					ellipse.border !== undefined
						? `${(slideWidth * ellipse.border.width) / maxElementX}px`
						: '0'
				}
			/>
		</svg>
	)
}

export { EllipseView }
