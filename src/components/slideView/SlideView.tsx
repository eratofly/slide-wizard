import React, { useEffect, useRef, useState } from 'react'
import { Color, ObjectType, Slide } from '../../model/types'
import styles from './SlideView.module.css'
import { TextObjectView } from '../textObjectView/TextObjectView'
import { PrimitiveObjectView } from '../primitiveObjectView/PrimitiveObjectView'
import { ImageObjectView } from '../imageObjectView/ImageObjectView'
import { RegisterDndItemFn } from '../../hooks/useDndSlides'
import { SelectionFrame } from '../selectionFrame/SelectionFrame'
import { useAppActions, useAppSelector } from '../../redux/hooks'

type SlideViewProps = {
	index: number
	slide: Slide
	state: 'preview' | 'selected'
	registerDndItem?: RegisterDndItemFn
}

function SlideView(props: SlideViewProps) {
	const { index, slide, state, registerDndItem } = props
	const selection = useAppSelector((state) => state.selection)
	const {
		createSelectSlideAction,
		createSelectObjectAction,
		createUnselectObjectAction,
		createRemoveObjectAction,
	} = useAppActions()
	const slideRef = useRef<HTMLDivElement>(null)
	const [slideWidth, setSlideWidth] = useState(0)
	const [slideHeight, setSlideHeight] = useState(0)
	useEffect(() => {
		setSlideWidth(slideRef.current ? slideRef.current.offsetWidth : 0)
		setSlideHeight(slideRef.current ? slideRef.current.offsetHeight : 0)
	}, [slideRef.current])

	function getRgbaFromColor(color: Color) {
		const numericValue = parseInt(color.hex.substring(1), 16)
		const r = (numericValue >> 16) & 0xff
		const g = (numericValue >> 8) & 0xff
		const b = numericValue & 0xff
		return `rgba(${r}, ${g}, ${b})`
	}

	function getSelectedObject() {
		for (const object of slide.slideObjects) {
			if (object.id === selection.objectId) {
				return object
			}
		}
		return null
	}

	let slideStateStyle
	if (state === 'preview') {
		slideStateStyle = styles.slidePreview
	} else if (state === 'selected') {
		slideStateStyle = styles.slideSelected
	}

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (selection.objectId && e.key === 'Delete') {
				createUnselectObjectAction()
				createRemoveObjectAction(selection.slideId, selection.objectId)
			}
		}

		document.addEventListener('keypress', handleKeyPress)
		return () => document.removeEventListener('keypress', handleKeyPress)
	}, [selection])

	const listSlideObjects = slide.slideObjects.map((slideObject) => {
		let object

		if (slideObject.objectType === ObjectType.TEXT) {
			object = (
				<TextObjectView
					key={slideObject.id}
					textObject={slideObject}
					slideWidth={slideWidth}
					onClick={
						state === 'selected'
							? () => createSelectObjectAction(slideObject.id)
							: () => {}
					}
				/>
			)
		} else if (slideObject.objectType === ObjectType.IMAGE) {
			object = (
				<ImageObjectView
					key={slideObject.id}
					image={slideObject}
					slideWidth={slideWidth}
					slideHeight={slideHeight}
					onClick={
						state === 'selected'
							? () => createSelectObjectAction(slideObject.id)
							: () => {}
					}
				/>
			)
		} else if (slideObject.objectType === ObjectType.PRIMITIVE) {
			object = (
				<PrimitiveObjectView
					key={slideObject.id}
					primitive={slideObject}
					slideWidth={slideWidth}
					onClick={
						state === 'selected'
							? () => createSelectObjectAction(slideObject.id)
							: () => {}
					}
				/>
			)
		}

		return object
	})

	const selectedObject = getSelectedObject()

	if (registerDndItem) {
		useEffect(() => {
			const { onDragStart } = registerDndItem(index, {
				elementRef: slideRef,
			})

			const onMouseDown = (mouseDownEvent: MouseEvent) => {
				onDragStart({
					onDrag: (dragEvent) => {
						slideRef.current!.style.position = 'relative'
						slideRef.current!.style.zIndex = '1'
						slideRef.current!.style.boxShadow = 'black 2px 2px 4px'
						slideRef.current!.style.top = `${
							dragEvent.clientY - mouseDownEvent.clientY
						}px`
					},
					onDrop: () => {
						slideRef.current!.style.position = ''
						slideRef.current!.style.zIndex = ''
						slideRef.current!.style.boxShadow = ''
						slideRef.current!.style.top = ''
					},
				})
			}

			const control = slideRef.current!
			control.addEventListener('mousedown', onMouseDown)
			return () => control.removeEventListener('mousedown', onMouseDown)
		}, [index, registerDndItem])
	}

	return (
		<div
			className={`${slideStateStyle}`}
			style={{
				background: `center / 100% 100% no-repeat ${getRgbaFromColor(
					slide.backgroundColor,
				)} url(${slide.backgroundImage})`,
			}}
			onClick={
				state === 'preview'
					? () => {
							createSelectSlideAction(slide.id)
					  }
					: (event: React.MouseEvent) => createUnselectObjectAction(event)
			}
			ref={slideRef}
		>
			{listSlideObjects}
			{selectedObject && state === 'selected' ? (
				<SelectionFrame
					object={selectedObject}
					slideWidth={slideWidth}
					slideHeight={slideHeight}
				/>
			) : null}
		</div>
	)
}

export { SlideView }
