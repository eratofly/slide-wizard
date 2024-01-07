import React from 'react'
import styles from './Topbar.module.css'
import { Button } from '../button/Button'
import { PresentationTitle } from '../presentationTitle/PresentationTitle'
import { Toolbar } from '../toolbar/Toolbar'
import logo from '../../content/logo.svg'
import { Editor } from '../../model/types'
import { useEditorImportExport } from '../../hooks/useEditorImportExport'
import { useAppActions } from '../../redux/hooks'

type TopbarProps = {
	editor: Editor
}

function Topbar(props: TopbarProps) {
	const { editor } = props
	const { /*exportToJson,*/ importFromJson } = useEditorImportExport()
	const { createExportToPdfAction } = useAppActions()

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
				<PresentationTitle presentationName={editor.presentation.title} />
				<img className={styles.logo} src={logo} alt="Logo" />
			</div>
			<Toolbar editor={props.editor} />
		</div>
	)
}

export default Topbar
