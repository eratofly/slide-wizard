import { useState } from 'react'
import { Selection, Slide } from '../model/types'
import { randomUUID } from 'crypto'

function useSlides(
	initSlides: Slide[],
	initSelection: Selection,
): {
	slides: Slide[]
	selection: Selection
	addSlide: () => void
	removeSlide: (slideId: string) => void
	selectSlide: (slideId: string) => void
} {
	const [slides, setSlides] = useState<Slide[]>(initSlides)
	const [selection, setSelection] = useState<Selection>(initSelection)

	const addSlide = () => {
		const newSlides = slides
		const slide: Slide = {
			id: randomUUID(),
			backgroundColor: { hex: '#FFFFFF', opacity: 0 },
			slideObjects: [],
		}
		newSlides.push(slide)
		setSlides(newSlides)
	}

	const removeSlide = (slideId: string) => {
		const newSlides = slides
		for (const key in newSlides) {
			if (newSlides[key].id === slideId) {
				newSlides.splice(Number(key), 1)
				break
			}
		}
		setSlides(newSlides)
	}

	const selectSlide = (slideId: string) => {
		const newSelection = selection
		selection.slideId = slideId
		setSelection(newSelection)
	}

	return {
		slides,
		selection,
		addSlide,
		removeSlide,
		selectSlide,
	}
}

export { useSlides }
