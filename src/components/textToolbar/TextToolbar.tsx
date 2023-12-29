import React, { useState } from 'react'
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
// import { FigurePicker, FigurePickerItem } from '../figurePicker/FigurePicker'
// import { useClickOutside } from '../../hooks/useOutsideClick'

export function TextToolbar() {
	const [fontSize, setFontSize] = useState(14)
	const [fontFamily, setFontFamily] = useState('Arial')

	return (
		<div className={styles.toolbar}>
			<select
				className={styles.fonts}
				value={fontFamily}
				onChange={(e) => setFontFamily(e.target.value)}
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
					onClick={() => setFontSize(fontSize - 1)}
				/>
				<input
					className={styles.textSize}
					type={'number'}
					value={fontSize}
					onChange={(e) => setFontSize(Number(e.target.value))}
					onFocus={(e) => e.target.select()}
				/>
				<Button
					typeButton="icon"
					icon={plusBtn}
					onClick={() => setFontSize(fontSize + 1)}
				/>
			</div>
			<div className={styles.boldItalicBtn}>
				<Button typeButton="icon" icon={boldTextBtn} />
				<Button typeButton="icon" icon={italicTextBtn} />
			</div>
			<div className={styles.textColorBtn}>
				<Button typeButton="icon" icon={textColorBtn} />
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
