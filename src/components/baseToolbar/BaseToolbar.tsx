import React, { useContext } from 'react'
import { Button } from '../button/Button'
import styles from './BaseToolbar.module.css'
import { newSlideBtn, deleteSlideBtn, undoBtn, redoBtn } from '../button/icons'
import { useSlides } from '../../hooks/useSlides'
import { EditorContext } from '../../model/EditorContext'

export function BaseToolbar() {
	const { addSlide, removeSlide } = useSlides()
	const { editor } = useContext(EditorContext)
	return (
		<div className={styles.baseToolbar}>
			<div className={styles.addDeleteBtn}>
				<Button typeButton="icon" icon={newSlideBtn} onClick={addSlide} />
				<Button
					typeButton="icon"
					icon={deleteSlideBtn}
					onClick={() => {
						console.log(editor.selection.slideId)
						removeSlide(editor.selection.slideId)
						console.log(editor.presentation.slides)
					}}
				/>
			</div>
			<div className={styles.undoRedoBtn}>
				<Button typeButton="icon" icon={undoBtn} />
				<Button typeButton="icon" icon={redoBtn} />
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
