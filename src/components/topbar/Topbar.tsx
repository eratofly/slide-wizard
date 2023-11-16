import React from 'react'
import styles from './Topbar.module.css'
import { Button } from '../button/Button'
import { PresentationTitle } from '../presentationTitle/PresentationTitle'
import { Toolbar } from '../toolbar/Toolbar'
import logo from '../../content/logo.svg'
import { Editor } from '../../model/types'

type TopbarProps = {
	editor: Editor
}

function Topbar(props: TopbarProps) {
	const { editor } = props
	function exportToJson() {
		const text = JSON.stringify(editor, null, 2)
		const name = `${editor.presentation.title}.json`
		const type = 'text/json'

		const a = document.createElement('a')
		const file = new Blob([text], { type: type })
		a.href = URL.createObjectURL(file)
		a.download = name
		document.body.appendChild(a)
		a.click()
		a.remove()
	}

	return (
		<div className={styles.topbar}>
			<div className={styles.titlebar}>
				<Button text="File" typeButton="main" onClick={exportToJson} />
				<PresentationTitle presentationName={editor.presentation.title} />
				<img className={styles.logo} src={logo} alt="Logo" />
			</div>
			<Toolbar />
		</div>
	)
}

export default Topbar
