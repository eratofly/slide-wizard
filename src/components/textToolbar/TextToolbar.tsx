import React from 'react'
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
import { Image, ObjectType, Primitive, TextObject } from '../../model/types'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { useTextObject } from '../../hooks/useTextObject'

export function TextToolbar() {
	const presentation = useAppSelector((state) => state.presentation)
	const selection = useAppSelector((state) => state.selection)
	const { createChangeObjectAction } = useAppActions()

	const getSelectedSlideIndex = () => {
		for (const key in presentation.slides) {
			if (presentation.slides[key].id === selection.slideId) {
				return Number(key)
			}
		}
	}

	const getSelectedObjectIndex = () => {
		for (const key in presentation.slides[getSelectedSlideIndex()!].slideObjects) {
			if (
				presentation.slides[getSelectedSlideIndex()!].slideObjects[key].id ===
				selection.objectId
			) {
				return Number(key)
			}
		}
		return
	}

	let selectedObject: TextObject | Image | Primitive
	if (
		presentation.slides[getSelectedSlideIndex()!].slideObjects[getSelectedObjectIndex()!]
			.objectType === ObjectType.TEXT
	) {
		selectedObject =
			presentation.slides[getSelectedSlideIndex()!].slideObjects[getSelectedObjectIndex()!]
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
					createChangeObjectAction(selection.slideId, selection.objectId!, {
						fontFamily: e.target.value,
					})
				}}
			>
				<option className={styles.font}>Open sans</option>
				<option className={styles.font}>Arial</option>
				<option className={styles.font}>Times New Roman</option>
				<option className={styles.font}>Roboto</option>
			</select>
			<div className={styles.minusPlusBtn}>
				<Button
					typeButton="icon"
					icon={minusBtn}
					onClick={() => {
						createChangeObjectAction(selection.slideId, selection.objectId!, {
							size: fontSize - 1,
						})
					}}
				/>
				<input
					className={styles.textSize}
					type={'number'}
					value={fontSize}
					onChange={(e) => {
						createChangeObjectAction(selection.slideId, selection.objectId!, {
							size: e.target.value,
						})
					}}
					onFocus={(e) => e.target.select()}
				/>
				<Button
					typeButton="icon"
					icon={plusBtn}
					onClick={() => {
						createChangeObjectAction(selection.slideId, selection.objectId!, {
							size: fontSize + 1,
						})
					}}
				/>
			</div>
			<div className={styles.boldItalicBtn}>
				<Button
					typeButton="icon"
					icon={boldTextBtn}
					onClick={() => {
						createChangeObjectAction(selection.slideId, selection.objectId!, {
							bold: !(
								presentation.slides[getSelectedSlideIndex()!].slideObjects[
									getSelectedObjectIndex()!
								] as TextObject
							).bold,
						})
					}}
				/>
				<Button
					typeButton="icon"
					icon={italicTextBtn}
					onClick={() => {
						createChangeObjectAction(selection.slideId, selection.objectId!, {
							italic: !(
								presentation.slides[getSelectedSlideIndex()!].slideObjects[
									getSelectedObjectIndex()!
								] as TextObject
							).italic,
						})
					}}
				/>
			</div>
			<div className={styles.textColorBtn}>
				<Button typeButton="icon" icon={textColorBtn} onClick={setColor} />
				<Button typeButton="icon" icon={backgroundTextBtn} />
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
