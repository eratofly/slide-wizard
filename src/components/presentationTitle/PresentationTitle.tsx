import React from 'react'
import styles from './PresentationTitle.module.css'

type PresentationTitleProps = {
	presentationName?: string
}

export function PresentationTitle(props: PresentationTitleProps) {
	const { presentationName = 'New Presentation' } = props
	return (
		<input
			type="text"
			className={`${styles.title} ${styles.title_default}`}
			defaultValue={presentationName}
		/>
	)
}
