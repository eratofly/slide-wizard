import React from 'react'
import styles from './ImageToolbar.module.css'
import { Button } from '../button/Button'
import { borderColorBtn } from '../button/icons'
import { useSlideObject } from '../../hooks/useSlideObject'

export function ImageToolbar() {
	const { setBorderColor } = useSlideObject()

	return (
		<div className={styles.toolbar}>
			<div className={styles.colorThicknessBtn}>
				<Button typeButton="icon" icon={borderColorBtn} onClick={setBorderColor} />
			</div>
		</div>
	)
}
