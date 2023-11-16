import React from 'react'
import { Button } from '../button/Button'
import styles from './BaseToolbar.module.css'
import newSlide from '../../content/buttonIcons/new-slide.svg'
import deleteSlide from '../../content/buttonIcons/delete-slide.svg'
import redo from '../../content/buttonIcons/redo.svg'
import undo from '../../content/buttonIcons/undo.svg'

export function BaseToolbar() {
	return (
		<div className={styles.baseToolbar}>
			<div className={styles.addDeleteBtn}>
				<Button typeButton="icon" iconPath={newSlide} />
				<Button typeButton="icon" iconPath={deleteSlide} />
			</div>
			<div className={styles.undoRedoBtn}>
				<Button typeButton="icon" iconPath={undo} />
				<Button typeButton="icon" iconPath={redo} />
			</div>
			<div className={styles.redactorBtn}>
				<Button text="Text" typeButton="default" />
				<Button text="Image" typeButton="default" />
				<Button text="Primitive" typeButton="default" />
				<Button text="Background" typeButton="default" />
			</div>
		</div>
	)
}
