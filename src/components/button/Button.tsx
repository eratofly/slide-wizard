import React from 'react'
import styles from './Button.module.css'

type ButtonProps = {
	text?: string
	iconPath?: string
	typeButton: 'main' | 'default' | 'icon'
}

function Button(props: ButtonProps) {
	let button
	if (props.typeButton === 'main') {
		button = <div className={`${styles.button} ${styles.button_main}`}>{props.text}</div>
	} else if (props.typeButton === 'default') {
		button = <div className={`${styles.button} ${styles.button_default}`}>{props.text}</div>
	} else if (props.typeButton === 'icon') {
		button = (
			<div className={`${styles.button} ${styles.button_icon}`}>
				<img src={props.iconPath} alt="" />
			</div>
		)
	} else {
		button = <div className="button button_toolbar">{props.text}</div>
	}

	return button
}

export { Button }
