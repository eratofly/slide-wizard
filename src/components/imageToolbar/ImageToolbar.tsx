import React from 'react'
import styles from './ImageToolbar.module.css'
import { Button } from '../button/Button'
import {
	cropImageBtn,
	borderColorBtn,
	borderThicknessBtn,
	upperAlignBtn,
	centerAlignBtn,
	bottomAlignBtn,
} from '../button/icons'

export function ImageToolbar() {
	return (
		<div className={styles.toolbar}>
			<div className={styles.cropBtn}>
				<Button typeButton="icon" icon={cropImageBtn} />
			</div>
			<div className={styles.colorThicknessBtn}>
				<Button typeButton="icon" icon={borderColorBtn} />
				<Button typeButton="icon" icon={borderThicknessBtn} />
			</div>
			<div className={styles.alignmentBtn}>
				<Button typeButton="icon" icon={upperAlignBtn} />
				<Button typeButton="icon" icon={centerAlignBtn} />
				<Button typeButton="icon" icon={bottomAlignBtn} />
			</div>
		</div>
	)
}
