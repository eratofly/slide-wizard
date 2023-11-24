import React from 'react'
import styles from './Toolbar.module.css'
import { Editor, ObjectType } from '../../model/types'
import { BaseToolbar } from '../baseToolbar/BaseToolbar'
import { PrimitiveToolbar } from '../primitiveToolbar/PrimitiveToolbar'
// import { TextToolbar } from '../textToolbar/TextToolbar'

type ToolbarProps = {
	editor: Editor
}

export function Toolbar(props: ToolbarProps) {
	function getSelectedObjectType() {
		const selectedObjectId = props.editor.selection.objectId
		for (const slide of props.editor.presentation.slides) {
			if (slide.id === props.editor.selection.slideId) {
				for (const object of slide.slideObjects) {
					if (object.id === selectedObjectId) {
						return object
					}
				}
			}
		}
		return null
	}

	const selectedObject = getSelectedObjectType()
	let toolbar
	if (selectedObject?.objectType === ObjectType.TEXT) {
		toolbar = (
			<div className={styles.toolbar}>
				<BaseToolbar />
				{/*<TextToolbar />*/}
			</div>
		)
	} else if (selectedObject?.objectType === ObjectType.PRIMITIVE) {
		toolbar = (
			<div className={styles.toolbar}>
				<BaseToolbar />
				<PrimitiveToolbar />
			</div>
		)
	} else if (selectedObject?.objectType === ObjectType.IMAGE) {
		toolbar = (
			<div className={styles.toolbar}>
				<BaseToolbar />
			</div>
		)
	} else {
		toolbar = (
			<div className={styles.toolbar}>
				<BaseToolbar />
			</div>
		)
	}

	return toolbar
}
