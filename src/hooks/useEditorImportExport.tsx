import { useCallback } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'

function useEditorImportExport(): {
	exportToJson: () => void
	importFromJson: () => void
} {
	const presentation = useAppSelector((state) => state.presentation)
	const { createImportFromJsonAction, createSelectSlideAction } = useAppActions()

	const importFromJson = useCallback(() => {
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
						const newPresentation = JSON.parse(event.target.result)
						createImportFromJsonAction(newPresentation)
						createSelectSlideAction(newPresentation.slides[0].id)
					} catch {
						alert('Presentation is not valid')
					}
				}
			}
		}
		document.body.appendChild(input)
		input.click()
		input.remove()
	}, [createImportFromJsonAction])

	const exportToJson = useCallback(() => {
		const text = JSON.stringify(presentation, null, 2)
		const name = `${presentation.title}.sw`
		const type = 'text/json'

		const a = document.createElement('a')
		const file = new Blob([text], { type: type })
		a.href = URL.createObjectURL(file)
		a.download = name
		document.body.appendChild(a)
		a.click()
		a.remove()
	}, [presentation])

	return {
		exportToJson,
		importFromJson,
	}
}

export { useEditorImportExport }
