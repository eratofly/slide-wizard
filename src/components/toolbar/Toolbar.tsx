import React from 'react'
import styles from './Toolbar.module.css'
import { Editor, ObjectType } from '../../model/types'
import { BaseToolbar } from '../baseToolbar/BaseToolbar'
import { PrimitiveToolbar } from '../primitiveToolbar/PrimitiveToolbar'
import { ImageToolbar } from '../imageToolbar/ImageToolbar'
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

	return (
		<div className={styles.toolbar}>
			<BaseToolbar />
			{selectedObject?.objectType === ObjectType.PRIMITIVE && <PrimitiveToolbar />}
			{selectedObject?.objectType === ObjectType.IMAGE && <ImageToolbar />}
			{/*{selectedObject?.objectType === ObjectType.TEXT && <TextToolbar />}*/}
		</div>
	)
}
