import React from 'react'
import { Button } from '../button/Button'
import styles from './TextToolbar.module.css'
import boldText from '../../content/textButtons/bold.svg'
// import italicText from '../../content/textButtons/italic.svg'
// import bottomAlign from '../../content/textButtons/bottom-align.svg'
// import middleAlign from '../../content/textButtons/center-align.svg'
// import topAllign from '../../content/textButtons/top-align.svg'
// import leftAllign from '../../content/textButtons/left-align.svg'
// import centerAllign from '../../content/textButtons/center-align.svg'
// import rightAllign from '../../content/textButtons/right-align.svg'
// import justifyAllign from '../../content/textButtons/justify-align.svg'
// import addKegel from '../../content/textButtons/plus.svg'
// import subKegel from '../../content/textButtons/minus.svg'
// import textColor from '../../content/textButtons/text-color.svg'
// import textBackground from '../../content/textButtons/text-background.svg'
export function TextToolbar() {
	return (
		<div className={styles.baseToolbar}>
			<div className={styles.addDeleteBtn}>
				<Button typeButton="icon" iconPath={boldText} />
				{/*<Button typeButton="icon" iconPath={deleteSlide} />*/}
			</div>
			<div className={styles.undoRedoBtn}>
				{/*<Button typeButton="icon" iconPath={undo} />*/}
				{/*<Button typeButton="icon" iconPath={redo} />*/}
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
