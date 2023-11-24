import styles from './EllipseView.module.css'
import React, { CSSProperties } from 'react'
import { Color, Primitive } from '../../model/types'

type EllipseViewProps = {
	ellipse: Primitive
	slideWidth: number
}

function EllipseView(props: EllipseViewProps) {
	const { ellipse, slideWidth } = props
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

	return (
		<svg className={styles.ellipse} style={svgStyle}>
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
