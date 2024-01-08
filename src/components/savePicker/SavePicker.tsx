import * as React from 'react'
import styles from './SavePicker.module.css'

type SavePickerItem = {
	id: string
	text: string
	onClick: () => void
}

type SavePickerProps = {
	items: SavePickerItem[]
}

function SavePicker(props: SavePickerProps) {
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

export { SavePicker, type SavePickerItem }
