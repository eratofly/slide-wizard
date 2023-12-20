import { Color, TextObject } from '../../model/types'
import styles from './TextObjectView.module.css'
import React from 'react'

type TextObjectViewProps = {
	textObject: TextObject
	slideWidth: number
	onClick: () => void
}

function TextObjectView(props: TextObjectViewProps) {
	const { textObject, slideWidth, onClick } = props
	const maxElementX = 1600
	const maxElementY = 900
	const xRelation = 100 / maxElementX
	const yRelation = 100 / maxElementY
	const fontSizeRelation = 4 / 3

	function getRgbaFromColor(color: Color) {
		const numericValue = parseInt(color.hex.substring(1), 16)
		const r = (numericValue >> 16) & 0xff
		const g = (numericValue >> 8) & 0xff
		const b = numericValue & 0xff
		return `rgba(${r}, ${g}, ${b}, ${color.opacity})`
	}

	const listChars = textObject.chars.map((char) => (
		<span
			key={char.id}
			style={{
				fontFamily: char.fontFamily,
				fontSize: `${(slideWidth * char.size * fontSizeRelation) / maxElementY}px`,
				fontWeight: `${char.bold ? 'bold' : 'none'}`,
				fontStyle: `${char.italic ? 'italic' : 'none'}`,
				color: `${getRgbaFromColor(char.color)}`,
			}}
		>
			{char.value}
		</span>
	))

	return (
		<div
			className={styles.textObject}
			onClick={onClick}
			style={{
				width: `${textObject.width * xRelation}%`,
				height: `${textObject.height * yRelation}%`,
				top: `${textObject.y * yRelation}%`,
				left: `${textObject.x * xRelation}%`,
				border:
					textObject.border !== undefined
						? `${
								(slideWidth * textObject.border.width) / maxElementX
						  }px solid ${getRgbaFromColor(textObject.border.color)}`
						: 'none',
			}}
		>
			{listChars}
		</div>
	)
}

export { TextObjectView }
