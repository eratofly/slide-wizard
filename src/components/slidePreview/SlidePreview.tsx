import React, { useRef } from 'react'
import { SlideView } from '../slideView/SlideView'
import styles from './SlidePreview.module.css'
import { useDndSlides } from '../../hooks/useDndSlides'
import { useAppActions, useAppSelector } from '../../redux/hooks'

function SlidesPreview() {
	const presentation = useAppSelector((state) => state.presentation)
	const selection = useAppSelector((state) => state.selection)
	const { createChangeOrderAction } = useAppActions()
	const slides = presentation.slides
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
			createChangeOrderAction(from, to)
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
						registerDndItem={registerDndItem}
					/>
				</div>
			</div>
		)
	})
	return <div className={styles.slidesPreview}>{listSlides}</div>
}

export { SlidesPreview }
