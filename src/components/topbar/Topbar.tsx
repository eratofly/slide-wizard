import React, { useRef, useState } from 'react'
import styles from './Topbar.module.css'
import { Button } from '../button/Button'
import { PresentationTitle } from '../presentationTitle/PresentationTitle'
import { Toolbar } from '../toolbar/Toolbar'
import logo from '../../content/logo.svg'
import { useEditorImportExport } from '../../hooks/useEditorImportExport'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { useClickOutside } from '../../hooks/useOutsideClick'
import { SavePicker, SavePickerItem } from '../savePicker/SavePicker'
import { playerBtn } from '../button/icons'

function Topbar() {
	const title = useAppSelector((state) => state.presentation.title)
	const { exportToJson, importFromJson } = useEditorImportExport()
	const { createExportToPdfAction, createStartPreviewAction } = useAppActions()
	const [savePickerOpened, setSavePickerOpened] = useState(false)
	const savePickerRef = useRef(null)
	useClickOutside(savePickerRef, () => setSavePickerOpened(false))
	const savePickerItems: SavePickerItem[] = [
		{
			id: 'JSON',
			text: 'JSON',
			onClick: () => {
				exportToJson()
			},
		},
		{
			id: 'PDF',
			text: 'PDF',
			onClick: () => {
				createExportToPdfAction()
			},
		},
		// {
		// 	id: 'PPTX',
		// 	text: 'PPTX',
		// 	onClick = { importFromJson },
		// },
	]
	return (
		<div className={styles.topbar}>
			<div className={styles.titlebar}>
				<div style={{ display: 'flex', gap: 20 }}>
					<Button
						text="Save"
						typeButton="main"
						onClick={() => {
							if (!savePickerOpened) {
								setSavePickerOpened(true)
							}
						}}
					/>
					<Button text="Open" typeButton="main" onClick={importFromJson} />
					<div ref={savePickerRef}>
						{savePickerOpened && <SavePicker items={savePickerItems} />}
					</div>
				</div>
				<PresentationTitle presentationName={title!} />
				<Button
					typeButton="icon"
					icon={playerBtn}
					onClick={() => {
						document.body.requestFullscreen().then()
						createStartPreviewAction()
					}}
				/>
				<img className={styles.logo} src={logo} alt="Logo" />
			</div>
			<Toolbar />
		</div>
	)
}

export default Topbar
