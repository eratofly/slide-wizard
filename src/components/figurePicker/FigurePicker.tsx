import * as React from 'react'
import styles from './FigurePicker.module.css'
import { ReactElement } from 'react'
// import { RefObject } from 'react'

type FigurePickerItem = {
	id: string
	icon: ReactElement
	onClick: () => void
}

type FigurePickerProps = {
	items: FigurePickerItem[]
}

function FigurePicker(props: FigurePickerProps) {
	return (
		<div className={styles.container}>
			{props.items.map((item) => (
				<div key={item.id} className={styles.item} onClick={item.onClick}>
					{item.icon}
				</div>
			))}
		</div>
	)
}

export { FigurePicker, type FigurePickerItem }
