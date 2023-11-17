import React from 'react'
import styles from './PrimitiveToolbar.module.css'
import { Button } from '../button/Button'
import fill from '../../content/primitiveButtons/fill.svg'
import borderColor from '../../content/primitiveButtons/border-color.svg'
import borderThickness from '../../content/primitiveButtons/border-thickness.svg'
import figure from '../../content/primitiveButtons/figure.svg'
import changingSize from '../../content/primitiveButtons/changing-size.svg'
import upperEdge from '../../content/primitiveButtons/upper-edge.svg'
import centered from '../../content/primitiveButtons/centered.svg'
import bottomEdge from '../../content/primitiveButtons/bottom-edge.svg'

export function PrimitiveToolbar() {
	return (
		<div className={styles.toolbar}>
			<div className={styles.fillBtn}>
				<Button typeButton="icon" iconPath={fill} />
			</div>
			<div className={styles.colorThicknessBtn}>
				<Button typeButton="icon" iconPath={borderColor} />
				<Button typeButton="icon" iconPath={borderThickness} />
			</div>
			<div className={styles.figureChangingSizeBtn}>
				<Button typeButton="icon" iconPath={figure} />
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
