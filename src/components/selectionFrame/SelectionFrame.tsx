import styles from './SelectionFrame.module.css'
import React, { useRef } from 'react'
import { SlideObject } from '../../model/types'
import { EditableProperties, useDragAndDropObjects } from '../../hooks/useDragAndDropObjects'

type SelectionFrameProps = {
	object: SlideObject
	slideWidth: number
	slideHeight: number
}

function SelectionFrame(props: SelectionFrameProps) {
	const { object, slideWidth, slideHeight } = props
	const maxElementX = 1600
	const maxElementY = 900
	const xRelation = 100 / maxElementX
	const yRelation = 100 / maxElementY

	const topLeftResizeRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop: topLeftResize } = useDragAndDropObjects(topLeftResizeRef, [
		EditableProperties.X,
		EditableProperties.Y,
		EditableProperties.MINUS_WIDTH,
		EditableProperties.MINUS_HEIGHT,
	])
	topLeftResize()

	const topResizeRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop: topResize } = useDragAndDropObjects(topResizeRef, [
		EditableProperties.Y,
		EditableProperties.MINUS_HEIGHT,
	])
	topResize()

	const topRightResizeRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop: topRightResize } = useDragAndDropObjects(topRightResizeRef, [
		EditableProperties.Y,
		EditableProperties.WIDTH,
		EditableProperties.MINUS_HEIGHT,
	])
	topRightResize()

	const rightResizeRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop: rightResize } = useDragAndDropObjects(rightResizeRef, [
		EditableProperties.WIDTH,
	])
	rightResize()

	const bottomRightResizeRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop: bottomRightResize } = useDragAndDropObjects(bottomRightResizeRef, [
		EditableProperties.WIDTH,
		EditableProperties.HEIGHT,
	])
	bottomRightResize()

	const bottomResizeRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop: bottomResize } = useDragAndDropObjects(bottomResizeRef, [
		EditableProperties.HEIGHT,
	])
	bottomResize()

	const bottomLeftResizeRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop: bottomLeftResize } = useDragAndDropObjects(bottomLeftResizeRef, [
		EditableProperties.X,
		EditableProperties.MINUS_WIDTH,
		EditableProperties.HEIGHT,
	])
	bottomLeftResize()

	const leftResizeRef = useRef<HTMLDivElement>(null)
	const { dragAndDrop: leftResize } = useDragAndDropObjects(leftResizeRef, [
		EditableProperties.X,
		EditableProperties.MINUS_WIDTH,
	])
	leftResize()

	return (
		<div
			className={styles.objectSelection}
			style={{
				width: `${object.width * xRelation}%`,
				height: `${object.height * yRelation}%`,
				top: `${object.y * yRelation}%`,
				left: `${object.x * xRelation}%`,
				rotate: `${object.rotateAngle}deg`,
			}}
		>
			<div
				ref={topLeftResizeRef}
				className={styles.resizePoint}
				style={{ cursor: 'nwse-resize', top: -5, left: -5 }}
			></div>
			<div
				ref={topResizeRef}
				className={styles.resizePoint}
				style={{
					cursor: 'ns-resize',
					top: -5,
					left: `${(object.width / 2 / maxElementX) * slideWidth - 5}px`,
				}}
			></div>
			<div
				ref={topRightResizeRef}
				className={styles.resizePoint}
				style={{
					cursor: 'nesw-resize',
					top: -5,
					left: `${(object.width / maxElementX) * slideWidth - 5}px`,
				}}
			></div>
			<div
				ref={leftResizeRef}
				className={styles.resizePoint}
				style={{
					cursor: 'ew-resize',
					top: `${(object.height / 2 / maxElementY) * slideHeight - 5}px`,
					left: -5,
				}}
			></div>
			<div
				ref={rightResizeRef}
				className={styles.resizePoint}
				style={{
					cursor: 'ew-resize',
					top: `${(object.height / 2 / maxElementY) * slideHeight - 5}px`,
					left: `${(object.width / maxElementX) * slideWidth - 5}px`,
				}}
			></div>
			<div
				ref={bottomLeftResizeRef}
				className={styles.resizePoint}
				style={{
					cursor: 'nesw-resize',
					top: `${(object.height / maxElementY) * slideHeight - 5}px`,
					left: -5,
				}}
			></div>
			<div
				ref={bottomResizeRef}
				className={styles.resizePoint}
				style={{
					cursor: 'ns-resize',
					top: `${(object.height / maxElementY) * slideHeight - 5}px`,
					left: `${(object.width / 2 / maxElementX) * slideWidth - 5}px`,
				}}
			></div>
			<div
				ref={bottomRightResizeRef}
				className={styles.resizePoint}
				style={{
					cursor: 'nwse-resize',
					top: `${(object.height / maxElementY) * slideHeight - 5}px`,
					left: `${(object.width / maxElementX) * slideWidth - 5}px`,
				}}
			></div>
		</div>
	)
}

export { SelectionFrame }
