import React from 'react'
import styles from './Toolbar.module.css'
import { ObjectType } from '../../model/types'
import { BaseToolbar } from '../baseToolbar/BaseToolbar'
import { PrimitiveToolbar } from '../primitiveToolbar/PrimitiveToolbar'
import { ImageToolbar } from '../imageToolbar/ImageToolbar'
import { TextToolbar } from '../textToolbar/TextToolbar'
import { useAppSelector } from '../../redux/hooks'

export function Toolbar() {
	const presentation = useAppSelector((state) => state.presentation)
	const selection = useAppSelector((state) => state.selection)

	function getSelectedObjectType() {
		const selectedObjectId = selection.objectId
		for (const slide of presentation.slides) {
			if (slide.id === selection.slideId) {
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
			{selectedObject?.objectType === ObjectType.TEXT && <TextToolbar />}
		</div>
	)
}
