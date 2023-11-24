import React from 'react'
import styles from './Button.module.css'

type textButton = {
	text: string
	typeButton: 'main' | 'default'
	onClick?: () => void
}

type imageButton = {
	iconPath: string
	typeButton: 'icon'
	onClick?: () => void
}

type ButtonProps = textButton | imageButton

function Button(props: ButtonProps) {
	const { typeButton } = props
	return (
		<div
			className={`${styles.button} ${typeButton === 'main' && styles.button_main} ${
				typeButton === 'default' && styles.button_default
			} ${typeButton === 'icon' && styles.button_icon}`}
			onClick={props.onClick}
		>
			{typeButton === 'icon' && <img src={props.iconPath} alt="" />}
			{(typeButton === 'main' || typeButton === 'default') && props.text}
		</div>
	)
}

export { Button }
