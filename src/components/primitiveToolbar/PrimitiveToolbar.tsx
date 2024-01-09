import React from 'react'
import styles from './PrimitiveToolbar.module.css'
import { Button } from '../button/Button'
import { fillPrimitiveBtn, borderColorBtn, borderThicknessBtn } from '../button/icons'

export function PrimitiveToolbar() {
	return (
		<div className={styles.toolbar}>
			<div className={styles.fillBtn}>
				<Button typeButton="icon" icon={fillPrimitiveBtn} />
			</div>
			<div className={styles.colorThicknessBtn}>
				<Button typeButton="icon" icon={borderColorBtn} />
				<Button typeButton="icon" icon={borderThicknessBtn} />
			</div>
		</div>
	)
}
