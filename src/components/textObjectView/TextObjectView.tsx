import { Color, TextObject } from '../../model/types'
import styles from './TextObjectView.module.css'
import React, { useRef } from 'react'
import { EditableProperties, useDragAndDropObjects } from '../../hooks/useDragAndDropObjects'

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

	const dndRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop } = useDragAndDropObjects(dndRef, [
		EditableProperties.X,
		EditableProperties.Y,
	])
	dragAndDrop()

	return (
		<div
			contentEditable={true}
            ref={dndRef}
			className={styles.textObject}
			onClick={onClick}
			content={'editable'}
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
				fontFamily: textObject.fontFamily,
				fontSize: `${(slideWidth * textObject.size * fontSizeRelation) / maxElementY}px`,
				fontWeight: `${textObject.bold ? 'bold' : 'none'}`,
				fontStyle: `${textObject.italic ? 'italic' : 'none'}`,
				color: `${getRgbaFromColor(textObject.color)}`,
			}}
		>
			{textObject.value}
		</div>
	)
}

export { TextObjectView }
