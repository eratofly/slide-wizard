import React, { useContext } from 'react'
import { Button } from '../button/Button'
import styles from './TextToolbar.module.css'
import {
	centerAlignTextBtn,
	justifyAlignTextBtn,
	leftAlignTextBtn,
	minusBtn,
	plusBtn,
	rightAlignTextBtn,
	textColorBtn,
	boldTextBtn,
	italicTextBtn,
	backgroundTextBtn,
	topAlignTextBtn,
	middleAlignTextBtn,
	bottomAlignTextBtn,
} from '../button/icons'
import { useTextObject } from '../../hooks/useTextObject'
import { EditorContext } from '../../model/EditorContext'
import { Image, ObjectType, Primitive, TextObject } from '../../model/types'
// import { FigurePicker, FigurePickerItem } from '../figurePicker/FigurePicker'
// import { useClickOutside } from '../../hooks/useOutsideClick'

export function TextToolbar() {
	const { setEditor, editor } = useContext(EditorContext)

	const getSelectedSlideIndex = () => {
		for (const key in editor.presentation.slides) {
			if (editor.presentation.slides[key].id === editor.selection.slideId) {
				return Number(key)
			}
		}
	}

	const getSelectedObjectIndex = () => {
		for (const key in editor.presentation.slides[getSelectedSlideIndex()!].slideObjects) {
			if (
				editor.presentation.slides[getSelectedSlideIndex()!].slideObjects[key].id ===
				editor.selection.objectId
			) {
				return Number(key)
			}
		}
		return
	}

	let selectedObject: TextObject | Image | Primitive
	if (
		editor.presentation.slides[getSelectedSlideIndex()!].slideObjects[getSelectedObjectIndex()!]
			.objectType === ObjectType.TEXT
	) {
		selectedObject =
			editor.presentation.slides[getSelectedSlideIndex()!].slideObjects[
				getSelectedObjectIndex()!
			]
	}
	const fontSize = (selectedObject! as TextObject).size
	const fontFamily = (selectedObject! as TextObject).fontFamily

	const { setColor } = useTextObject()

	return (
		<div className={styles.toolbar}>
			<select
				className={styles.fonts}
				value={fontFamily}
				onChange={(e) => {
					const newSlides = [...editor.presentation.slides]
					const newObjects = [...newSlides[getSelectedSlideIndex()!].slideObjects]
					;(newObjects[getSelectedObjectIndex()!] as TextObject).fontFamily =
						e.target.value
					newSlides[getSelectedSlideIndex()!].slideObjects = newObjects
					setEditor({
						...editor,
						presentation: {
							...editor.presentation,
							slides: newSlides,
						},
					})
				}}
			>
				<option>Open sans</option>
				<option>Arial</option>
				<option>Times New Roman</option>
				<option>Roboto</option>
			</select>
			<div className={styles.minusPlusBtn}>
				<Button
					typeButton="icon"
					icon={minusBtn}
					onClick={() => {
						const newSlides = [...editor.presentation.slides]
						const newObjects = [...newSlides[getSelectedSlideIndex()!].slideObjects]
						;(newObjects[getSelectedObjectIndex()!] as TextObject).size = fontSize - 1
						newSlides[getSelectedSlideIndex()!].slideObjects = newObjects
						setEditor({
							...editor,
							presentation: {
								...editor.presentation,
								slides: newSlides,
							},
						})
					}}
				/>
				<input
					className={styles.textSize}
					type={'number'}
					value={fontSize}
					onChange={(e) => {
						const newSlides = [...editor.presentation.slides]
						const newObjects = [...newSlides[getSelectedSlideIndex()!].slideObjects]
						;(newObjects[getSelectedObjectIndex()!] as TextObject).size = Number(
							e.target.value,
						)
						newSlides[getSelectedSlideIndex()!].slideObjects = newObjects
						setEditor({
							...editor,
							presentation: {
								...editor.presentation,
								slides: newSlides,
							},
						})
					}}
					onFocus={(e) => e.target.select()}
				/>
				<Button
					typeButton="icon"
					icon={plusBtn}
					onClick={() => {
						const newSlides = [...editor.presentation.slides]
						const newObjects = [...newSlides[getSelectedSlideIndex()!].slideObjects]
						;(newObjects[getSelectedObjectIndex()!] as TextObject).size = fontSize + 1
						newSlides[getSelectedSlideIndex()!].slideObjects = newObjects
						setEditor({
							...editor,
							presentation: {
								...editor.presentation,
								slides: newSlides,
							},
						})
					}}
				/>
			</div>
			<div className={styles.boldItalicBtn}>
				<Button
					typeButton="icon"
					icon={boldTextBtn}
					onClick={() => {
						const newSlides = [...editor.presentation.slides]
						const newObjects = [...newSlides[getSelectedSlideIndex()!].slideObjects]
						;(newObjects[getSelectedObjectIndex()!] as TextObject).bold = !(
							newObjects[getSelectedObjectIndex()!] as TextObject
						).bold
						newSlides[getSelectedSlideIndex()!].slideObjects = newObjects
						setEditor({
							...editor,
							presentation: {
								...editor.presentation,
								slides: newSlides,
							},
						})
					}}
				/>
				<Button
					typeButton="icon"
					icon={italicTextBtn}
					onClick={() => {
						const newSlides = [...editor.presentation.slides]
						const newObjects = [...newSlides[getSelectedSlideIndex()!].slideObjects]
						;(newObjects[getSelectedObjectIndex()!] as TextObject).italic = !(
							newObjects[getSelectedObjectIndex()!] as TextObject
						).italic
						console.log((newObjects[getSelectedObjectIndex()!] as TextObject).italic)
						newSlides[getSelectedSlideIndex()!].slideObjects = newObjects
						setEditor({
							...editor,
							presentation: {
								...editor.presentation,
								slides: newSlides,
							},
						})
					}}
				/>
			</div>
			<div className={styles.textColorBtn}>
				<Button typeButton="icon" icon={textColorBtn} onClick={setColor} />
				<Button typeButton="icon" icon={backgroundTextBtn} />
				{/*<div>A</div>*/}
			</div>
			<div className={styles.alignmentBtn}>
				<Button typeButton="icon" icon={leftAlignTextBtn} />
				<Button typeButton="icon" icon={centerAlignTextBtn} />
				<Button typeButton="icon" icon={rightAlignTextBtn} />
				<Button typeButton="icon" icon={justifyAlignTextBtn} />
				<Button typeButton="icon" icon={topAlignTextBtn} />
				<Button typeButton="icon" icon={middleAlignTextBtn} />
				<Button typeButton="icon" icon={bottomAlignTextBtn} />
			</div>
		</div>
	)
}
