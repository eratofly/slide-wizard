import * as React from 'react'
import styles from './BackgroundPicker.module.css'
// import { RefObject } from 'react'

type BackgroundPickerItem = {
	id: string
	text: string
	onClick: () => void
}

type BackgroundPickerProps = {
	items: BackgroundPickerItem[]
}

function BackgroundPicker(props: BackgroundPickerProps) {
	return (
		<div className={styles.container}>
			{props.items.map((item) => (
				<div key={item.id} className={styles.item} onClick={item.onClick}>
					{item.text}
				</div>
			))}
		</div>
	)
}

export { BackgroundPicker, type BackgroundPickerItem }
