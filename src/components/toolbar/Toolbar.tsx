import React from 'react'
import styles from './Toolbar.module.css'
import { Editor, ObjectType } from '../../model/types'
import { ToolbarForObject } from '../toolbarForObject/ToolbarForObject'
import { BaseToolbar } from '../baseToolbar/BaseToolbar'

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
	if (selectedObject?.objectType === ObjectType.TEXT) {
		return (
			<div className={styles.toolbar}>
				<BaseToolbar />
				<ToolbarForObject />
			</div>
		)
	}
	if (selectedObject?.objectType === ObjectType.PRIMITIVE) {
		return (
			<div className={styles.toolbar}>
				<BaseToolbar />
				<ToolbarForObject />
			</div>
		)
	}
	if (selectedObject?.objectType === ObjectType.IMAGE) {
		return (
			<div className={styles.toolbar}>
				<BaseToolbar />
				<ToolbarForObject />
			</div>
		)
	}
	return (
		<div className={styles.toolbar}>
			<BaseToolbar />
		</div>
	)
}
