import { TextObject } from '../../model/types'
import React from 'react'

type TextObjectViewProps = {
	textObject: TextObject
	zIndex: number
}

function TextObjectView(props: TextObjectViewProps) {
	const { textObject, zIndex } = props
	const listChars = textObject.chars.map((char) => <span key={char.id}>{char.value}</span>)
	return (
		<div
			style={{
				marginTop: `${(textObject.y / 90) * 100}%`,
				marginLeft: `${(textObject.x / 160) * 100}%`,
				zIndex: zIndex,
				position: 'relative',
			}}
		>
			{listChars}
		</div>
	)
}

export { TextObjectView }
