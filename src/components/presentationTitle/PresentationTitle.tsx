import React from 'react'

type PresentationTitleProps = {
	presentationName?: string
}

export function PresentationTitle(props: PresentationTitleProps) {
	if (!props.presentationName) {
		return <div>Enter presentation title</div>
	} else {
		return <div>{props.presentationName}</div>
	}
}
