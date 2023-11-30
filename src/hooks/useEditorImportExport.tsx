import { useContext } from 'react'
import { EditorContext } from '../model/EditorContext'

function useEditorImportExport(): {
	exportToJson: () => void
	importFromJson: () => void
} {
	const { editor, setEditor } = useContext(EditorContext)
	const importFromJson = () => {
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
					try {
						setEditor(JSON.parse(event.target.result))
					} catch {
						alert('Presentation is not valid')
					}
				}
			}
		}
		document.body.appendChild(input)
		input.click()
		input.remove()
	}

	const exportToJson = () => {
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

	return {
		exportToJson,
		importFromJson,
	}
}

export { useEditorImportExport }
