import React from 'react'
import './Button.css'

type types = 'main' | 'default' | 'icon'

type ButtonProps = {
	text?: string
	iconPath?: string
	typeButton: types
}

function Button(props: ButtonProps) {
	if (props.typeButton === 'main') {
		return <div className="button button_topbar">{props.text}</div>
	}
	if (props.typeButton === 'default') {
		return <div className="button button_toolbar">{props.text}</div>
	}
	if (props.typeButton === 'icon') {
		return (
			<div className="button button_toolbar">
				<img src={props.iconPath} alt="" />
			</div>
		)
	}
	return <div className="button button_toolbar">{props.text}</div>
}

export { Button }
