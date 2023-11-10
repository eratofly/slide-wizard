import { TextObject } from '../../model/types'
import React from 'react'

type TextObjectViewProps = {
	textObject: TextObject
	slideWidth: number
}

function TextObjectView(props: TextObjectViewProps) {
	const { textObject, slideWidth } = props
	const maxElementX = 1600
	const maxElementY = 900
	const xRelation = 100 / maxElementX
	const yRelation = 100 / maxElementY
	const fontSizeRelation = 4 / 3
	const listChars = textObject.chars.map((char) => (
		<span
			key={char.id}
			style={{
				fontSize: `${(slideWidth * char.size * fontSizeRelation) / maxElementY}px`,
			}}
		>
			{char.value}
		</span>
	))
	return (
		<div
			style={{
				width: `${textObject.width * xRelation}%`,
				height: `${textObject.height * yRelation}%`,
				top: `${textObject.y * yRelation}%`,
				left: `${textObject.x * xRelation}%`,
				position: 'absolute',
			}}
		>
			{listChars}
		</div>
	)
}

export { TextObjectView }
