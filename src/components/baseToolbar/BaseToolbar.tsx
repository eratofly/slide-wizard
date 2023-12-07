import React, { useRef, useState, useContext } from 'react'
import { Button } from '../button/Button'
import styles from './BaseToolbar.module.css'
import { newSlideBtn, deleteSlideBtn, undoBtn, redoBtn } from '../button/icons'
import { useSlides } from '../../hooks/useSlides'
import { EditorContext } from '../../model/EditorContext'
import { FigurePicker, FigurePickerItem } from '../figurePicker/FigurePicker'
import { RectIcon } from './res/RectIcon'
import { EllipseIcon } from './res/EllipseIcon'
import { TriangleIcon } from './res/TriangleIcon'
import { useClickOutside } from '../../hooks/useOutsideClick'

export function BaseToolbar() {
	const figurePickerItems: FigurePickerItem[] = [
		{
			id: 'rect',
			icon: <RectIcon />,
			onClick: () => {
				console.log('add rectangle')
			},
		},
		{
			id: 'ellipse',
			icon: <EllipseIcon />,
			onClick: () => {
				console.log('add ellipse')
			},
		},
		{
			id: 'triangle',
			icon: <TriangleIcon />,
			onClick: () => {
				console.log('add triangle')
			},
		},
	]

	const [figurePickerOpened, setFigurePickerOpened] = useState(false)
	const figurePickerRef = useRef(null)
	useClickOutside(figurePickerRef, () => setFigurePickerOpened(false))

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
				<Button
					text="Primitive"
					typeButton="default"
					onClick={() => {
						if (!figurePickerOpened) {
							setFigurePickerOpened(true)
						}
					}}
				/>
				<Button text="Background" typeButton="default" />
			</div>
			<div ref={figurePickerRef}>
				{figurePickerOpened && <FigurePicker items={figurePickerItems} />}
			</div>
		</div>
	)
}
