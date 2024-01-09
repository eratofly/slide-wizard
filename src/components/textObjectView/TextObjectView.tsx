import { Color, TextObject } from '../../model/types'
import styles from './TextObjectView.module.css'
import React, { useRef } from 'react'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { EditableProperties, useDragAndDropObjects } from '../../hooks/useDragAndDropObjects'

type TextObjectViewProps = {
	textObject: TextObject
	slideWidth: number
	onClick: () => void
}

function TextObjectView(props: TextObjectViewProps) {
	const selection = useAppSelector((state) => state.selection)
	const { createChangeObjectAction } = useAppActions()

	const dragAndDropRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop } = useDragAndDropObjects(dragAndDropRef, [
		EditableProperties.X,
		EditableProperties.Y,
	])
	dragAndDrop()

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

	return (
		<div
			ref={dragAndDropRef}
			className={styles.wrapper}
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
			<textarea
				style={{
					fontFamily: textObject.fontFamily,
					fontSize: `${
						(slideWidth * textObject.size * fontSizeRelation) / maxElementY
					}px`,
					fontWeight: `${textObject.bold ? 'bold' : 'normal'}`,
					fontStyle: `${textObject.italic ? 'italic' : 'normal'}`,
					color: `${getRgbaFromColor(textObject.color)}`,
				}}
				value={textObject.value}
				className={styles.textObject}
				onChange={(e) =>
					createChangeObjectAction(selection.slideId, selection.objectId!, {
						value: e.target.value,
					})
				}
			>
				{textObject.value}
			</textarea>
		</div>
	)
}

export { TextObjectView }
