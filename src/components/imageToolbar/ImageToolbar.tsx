import React from 'react'
import styles from './ImageToolbar.module.css'
import { Button } from '../button/Button'
import crop from '../../content/imageButtons/crop.svg'
import borderColor from '../../content/imageButtons/border-color.svg'
import borderThickness from '../../content/imageButtons/border-thickness.svg'
import changingSize from '../../content/imageButtons/changing-size.svg'
import upperEdge from '../../content/imageButtons/upper-edge.svg'
import centered from '../../content/imageButtons/centered.svg'
import bottomEdge from '../../content/imageButtons/bottom-edge.svg'

export function ImageToolbar() {
	return (
		<div className={styles.toolbar}>
			<div className={styles.cropBtn}>
				<Button typeButton="icon" iconPath={crop} />
			</div>
			<div className={styles.colorThicknessBtn}>
				<Button typeButton="icon" iconPath={borderColor} />
				<Button typeButton="icon" iconPath={borderThickness} />
			</div>
			<div className={styles.changingSizeBtn}>
				<Button typeButton="icon" iconPath={changingSize} />
			</div>
			<div className={styles.alignmentBtn}>
				<Button typeButton="icon" iconPath={upperEdge} />
				<Button typeButton="icon" iconPath={centered} />
				<Button typeButton="icon" iconPath={bottomEdge} />
			</div>
		</div>
	)
}
