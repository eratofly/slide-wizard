import React from 'react'
import styles from './Button.module.css'

type types = 'main' | 'default' | 'icon'

type ButtonProps = {
	text?: string
	iconPath?: string
	typeButton: types
	onClick?: () => void
}

function Button(props: ButtonProps) {
	if (props.typeButton === 'main') {
		return (
			<div className={`${styles.button} ${styles.button_main}`} onClick={props.onClick}>
				{props.text}
			</div>
		)
	}
	if (props.typeButton === 'default') {
		return <div className={`${styles.button} ${styles.button_default}`}>{props.text}</div>
	}
	if (props.typeButton === 'icon') {
		return (
			<div className={`${styles.button} ${styles.button_icon}`}>
				<img src={props.iconPath} alt="" />
			</div>
		)
	}
	return <div className="button button_toolbar">{props.text}</div>
}

export { Button }
