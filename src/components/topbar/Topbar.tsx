import React, { Dispatch, SetStateAction } from 'react'
import styles from './Topbar.module.css'
import { Button } from '../button/Button'
import { PresentationTitle } from '../presentationTitle/PresentationTitle'
import { Toolbar } from '../toolbar/Toolbar'
import logo from '../../content/logo.svg'
import { Editor } from '../../model/types'

type TopbarProps = {
	editor: Editor
	onExport: Dispatch<SetStateAction<Editor>>
}

function Topbar(props: TopbarProps) {
	const { editor, onExport } = props
	function exportToJson() {
		const text = JSON.stringify(editor, null, 2)
		const name = `${editor.presentation.title}.sw`
		const type = 'text/json'

		const a = document.createElement('a')
		const file = new Blob([text], { type: type })
		a.href = URL.createObjectURL(file)
		a.download = name
		document.body.appendChild(a)
		a.click()
		a.remove()
	}

	function importFromJson() {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = '.sw'
		input.onchange = () => {
			const fileReader = new FileReader()
			if (!input.files) {
				return
			}
			fileReader.readAsText(input.files[0])
			fileReader.onloadend = (event) => {
				if (!event.target) {
					return
				}
				if (typeof event.target.result === 'string') {
					onExport(JSON.parse(event.target.result))
				}
			}
		}
		document.body.appendChild(input)
		input.click()
		input.remove()
	}

	return (
		<div className={styles.topbar}>
			<div className={styles.titlebar}>
				<div style={{ display: 'flex', gap: 20 }}>
					<Button text="File Export" typeButton="main" onClick={exportToJson} />
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
