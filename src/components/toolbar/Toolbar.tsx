import React from 'react'
import { Button } from '../button/Button'
import styles from './Toolbar.module.css'
import newSlide from '../../content/button-icons/new-slide.svg'
import deleteSlide from '../../content/button-icons/delete-slide.svg'
import redo from '../../content/button-icons/redo.svg'
import undo from '../../content/button-icons/undo.svg'

export function Toolbar() {
	return (
		<div className={styles.toolbar}>
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
