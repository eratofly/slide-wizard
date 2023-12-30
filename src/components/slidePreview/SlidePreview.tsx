import React, { useContext, useRef } from 'react'
import { Selection, Slide } from '../../model/types'
import { SlideView } from '../slideView/SlideView'
import styles from './SlidePreview.module.css'
import { useDndSlides } from '../../hooks/useDndSlides'
import { EditorContext } from '../../model/EditorContext'

type SlidesPreviewProps = {
	slides: Array<Slide>
	selection: Selection
}

function SlidesPreview(props: SlidesPreviewProps) {
	const { slides, selection } = props
	const { editor, setEditor } = useContext(EditorContext)
	const ref = useRef<HTMLDivElement>(null)

	const getSlideIndex = (id: string) => {
		for (const index in slides) {
			if (slides[index].id === id) {
				return Number(index)
			}
		}
		return 0
	}

	const { registerDndItem } = useDndSlides({
		onOrderChange: (from, to) => {
			const newSlides = [...slides]
			const removed = newSlides.splice(from, 1)
			newSlides.splice(to, 0, removed[0])
			const newEditor = {
				...editor,
				presentation: {
					...editor.presentation,
					slides: newSlides,
				},
			}
			setEditor(newEditor)
		},
	})

	const listSlides = slides.map((slide, index) => {
		return (
			<div key={slide.id} className={styles.element} ref={ref}>
				<span className={styles.index}>{index + 1}</span>
				<div
					className={`${styles.container} ${
						slide.id === selection.slideId ? styles.select : ''
					}`}
				>
					<SlideView
						index={getSlideIndex(slide.id)}
						slide={slide}
						state={'preview'}
						selectedObjectId={editor.selection.objectId}
						registerDndItem={registerDndItem}
					/>
				</div>
			</div>
		)
	})
	return <div className={styles.slidesPreview}>{listSlides}</div>
}

export { SlidesPreview }
