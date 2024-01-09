import React, { useRef, useState } from 'react'
import { Button } from '../button/Button'
import styles from './BaseToolbar.module.css'
import { newSlideBtn, deleteSlideBtn, undoBtn, redoBtn } from '../button/icons'
import { FigurePicker, FigurePickerItem } from '../figurePicker/FigurePicker'
import { BackgroundPicker, BackgroundPickerItem } from '../backgroundPicker/BackgroundPicker'
import { RectIcon } from './res/RectIcon'
import { EllipseIcon } from './res/EllipseIcon'
import { TriangleIcon } from './res/TriangleIcon'
import { useClickOutside } from '../../hooks/useOutsideClick'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { useSlides } from '../../hooks/useSlides'
import {
	getDefaultEllipse,
	getDefaultImage,
	getDefaultRectangle,
	getDefaultText,
	getDefaultTriangle,
} from '../../model/utils'

export function BaseToolbar() {
	const { createAddObjectAction, createSelectSlideAction } = useAppActions()
	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state.presentation.slides)

	function getSelectedSlideIndex() {
		for (const index in slides) {
			if (slides[index].id === selection.slideId) {
				return Number(index)
			}
		}
		return 0
	}

	const figurePickerItems: FigurePickerItem[] = [
		{
			id: 'rect',
			icon: <RectIcon />,
			onClick: () => {
				createAddObjectAction(selection.slideId, getDefaultRectangle())
			},
		},
		{
			id: 'ellipse',
			icon: <EllipseIcon />,
			onClick: () => {
				createAddObjectAction(selection.slideId, getDefaultEllipse())
			},
		},
		{
			id: 'triangle',
			icon: <TriangleIcon />,
			onClick: () => {
				createAddObjectAction(selection.slideId, getDefaultTriangle())
			},
		},
	]

	const { setBackgroundColor, setBackgroundImage } = useSlides()
	const backgroundPickerItems: BackgroundPickerItem[] = [
		{
			id: 'color',
			text: 'Color',
			onClick: () => {
				setBackgroundColor()
			},
		},
		{
			id: 'file',
			text: 'Picture',
			onClick: () => {
				setBackgroundImage()
			},
		},
	]

	const [figurePickerOpened, setFigurePickerOpened] = useState(false)
	const figurePickerRef = useRef(null)
	useClickOutside(figurePickerRef, () => setFigurePickerOpened(false))

	const [backgroundPickerOpened, setBackgroundPickerOpened] = useState(false)
	const backgroundPickerRef = useRef(null)
	useClickOutside(backgroundPickerRef, () => setBackgroundPickerOpened(false))

	const { createDeleteSlideAction, createAddSlideAction } = useAppActions()

	return (
		<div className={styles.baseToolbar}>
			<div className={styles.addDeleteBtn}>
				<Button typeButton="icon" icon={newSlideBtn} onClick={createAddSlideAction} />
				<Button
					typeButton="icon"
					icon={deleteSlideBtn}
					onClick={() => {
						createDeleteSlideAction(selection.slideId)
						if (slides.length > 1) {
							const slideIndex = getSelectedSlideIndex()
							createSelectSlideAction(
								slideIndex === 0
									? slides[slideIndex + 1].id
									: slides[slideIndex - 1].id,
							)
						}
					}}
				/>
			</div>
			<div className={styles.undoRedoBtn}>
				<Button typeButton="icon" icon={undoBtn} />
				<Button typeButton="icon" icon={redoBtn} />
			</div>
			<div className={styles.redactorBtn}>
				<Button
					text="Text"
					typeButton="default"
					onClick={() => {
						createAddObjectAction(selection.slideId, getDefaultText())
					}}
				/>
				<Button
					text="Image"
					typeButton="default"
					onClick={() => {
						const input = document.createElement('input')
						input.type = 'file'
						input.hidden = true
						input.accept = 'image/*'
						input.onchange = () => {
							const fileReader = new FileReader()
							if (!input.files) {
								return
							}
							fileReader.readAsDataURL(input.files[0])
							fileReader.onloadend = (event) => {
								if (event.target && typeof event.target.result === 'string') {
									createAddObjectAction(
										selection.slideId,
										getDefaultImage(event.target.result),
									)
								}
							}
						}
						document.body.appendChild(input)
						input.click()
						input.remove()
					}}
				/>
				<Button
					text="Primitive"
					typeButton="default"
					onClick={() => {
						if (!figurePickerOpened) {
							setFigurePickerOpened(true)
						}
					}}
				/>
				<Button
					text="Background"
					typeButton="default"
					onClick={() => {
						if (!backgroundPickerOpened) {
							setBackgroundPickerOpened(true)
						}
					}}
				/>
			</div>
			<div ref={figurePickerRef}>
				{figurePickerOpened && <FigurePicker items={figurePickerItems} />}
			</div>
			<div ref={backgroundPickerRef}>
				{backgroundPickerOpened && <BackgroundPicker items={backgroundPickerItems} />}
			</div>
		</div>
	)
}
