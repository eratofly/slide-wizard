import React from 'react'
import styles from './PresentationTitle.module.css'

type PresentationTitleProps = {
	presentationName?: string
}

export function PresentationTitle(props: PresentationTitleProps) {
	if (!props.presentationName) {
		return (
			<input
				type="text"
				className={`${styles.title} ${styles.title_default}`}
				defaultValue="New Presentation"
			/>
		)
	} else {
		return <input className={styles.title} defaultValue={props.presentationName} />
	}
}
