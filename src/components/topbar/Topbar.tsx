import React from 'react'
import styles from './Topbar.module.css'
import { Button } from '../button/Button'
import { PresentationTitle } from '../presentationTitle/PresentationTitle'
import { Toolbar } from '../toolbar/Toolbar'
import logo from '../../content/logo.svg'
import { useEditorImportExport } from '../../hooks/useEditorImportExport'
import { useAppActions, useAppSelector } from '../../redux/hooks'

function Topbar() {
	const { /*exportToJson,*/ importFromJson } = useEditorImportExport()
	const { createExportToPdfAction } = useAppActions()
	const title = useAppSelector((state) => state.presentation.title)

	return (
		<div className={styles.topbar}>
			<div className={styles.titlebar}>
				<div style={{ display: 'flex', gap: 20 }}>
					<Button
						text="File Export"
						typeButton="main"
						onClick={createExportToPdfAction}
					/>
					<Button text="File Import" typeButton="main" onClick={importFromJson} />
				</div>
				<PresentationTitle presentationName={title} />
				<img className={styles.logo} src={logo} alt="Logo" />
			</div>
			<Toolbar />
		</div>
	)
}

export default Topbar
