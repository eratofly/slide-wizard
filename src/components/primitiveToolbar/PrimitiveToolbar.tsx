import React from 'react'
import styles from './PrimitiveToolbar.module.css'
import { Button } from '../button/Button'
import { fillPrimitiveBtn, borderColorBtn } from '../button/icons'
import { useSlideObject } from '../../hooks/useSlideObject'

export function PrimitiveToolbar() {
	const { setColor, setBorderColor } = useSlideObject()
	return (
		<div className={styles.toolbar}>
			<div className={styles.fillBtn}>
				<Button typeButton="icon" icon={fillPrimitiveBtn} onClick={setColor} />
			</div>
			<div className={styles.colorThicknessBtn}>
				<Button typeButton="icon" icon={borderColorBtn} onClick={setBorderColor} />
			</div>
		</div>
	)
}
