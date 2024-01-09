import React from 'react'
import styles from './PresentationTitle.module.css'
import { useAppActions } from '../../redux/hooks'

type PresentationTitleProps = {
	presentationName?: string
}

export function PresentationTitle(props: PresentationTitleProps) {
	const { createChangeTitleAction } = useAppActions()
	const { presentationName = 'New Presentation' } = props
	return (
		<input
			type="text"
			className={`${styles.title} ${styles.title_default}`}
			defaultValue={presentationName}
			onChange={(e) => createChangeTitleAction(e.target.value)}
		/>
	)
}
