import React, { useRef, useState, useContext } from 'react'
import { Button } from '../button/Button'
import styles from './BaseToolbar.module.css'
import { newSlideBtn, deleteSlideBtn, undoBtn, redoBtn } from '../button/icons'
import { EditorContext } from '../../model/EditorContext'
import { FigurePicker, FigurePickerItem } from '../figurePicker/FigurePicker'
import { BackgroundPicker, BackgroundPickerItem } from '../backgroundPicker/BackgroundPicker'
import { RectIcon } from './res/RectIcon'
import { EllipseIcon } from './res/EllipseIcon'
import { TriangleIcon } from './res/TriangleIcon'
import { useClickOutside } from '../../hooks/useOutsideClick'
import { useAppActions } from '../../redux/hooks'
import { circle, rect, triangle, defaultImage, defaultText } from '../../data/testDataMax'
import { useSlides } from '../../hooks/useSlides'
import { v4 as uuidv4 } from 'uuid'

type EditorViewProps = {
	slideId: string
}

export function BaseToolbar(props: EditorViewProps) {
	const { slideId } = props
	const { createAddObjectAction } = useAppActions()
	const figurePickerItems: FigurePickerItem[] = [
		{
			id: 'rect',
			icon: <RectIcon />,
			onClick: () => {
				createAddObjectAction(slideId, { ...rect, id: uuidv4() })
			},
		},
		{
			id: 'ellipse',
			icon: <EllipseIcon />,
			onClick: () => {
				createAddObjectAction(slideId, { ...circle, id: uuidv4() })
			},
		},
		{
			id: 'triangle',
			icon: <TriangleIcon />,
			onClick: () => {
				createAddObjectAction(slideId, { ...triangle, id: uuidv4() })
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

	const { editor } = useContext(EditorContext)
	return (
		<div className={styles.baseToolbar}>
			<div className={styles.addDeleteBtn}>
				<Button typeButton="icon" icon={newSlideBtn} onClick={createAddSlideAction} />
				<Button
					typeButton="icon"
					icon={deleteSlideBtn}
					onClick={() => {
						createDeleteSlideAction(editor.selection.slideId)
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
						createAddObjectAction(slideId, { ...defaultText, id: uuidv4() })
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
									createAddObjectAction(slideId, {
										...defaultImage,
										id: uuidv4(),
										path: event.target.result,
									})
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
