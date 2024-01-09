import type { Crop, Image, Primitive, Slide, TextObject } from './types'
import { PrimitiveType, ObjectType } from './types'
import { jsPDF } from 'jspdf'
import CanvasTextWrapper from 'canvas-text-wrapper'
import { v4 as uuid } from 'uuid'

const slideWidth = 1600
const slideHeight = 900

type SlideElement = TextObject | Image | Primitive

function getBase64FromPicture(src: string, crop?: Crop): Promise<string> {
	let size: Crop
	if (!crop) {
		size = { x: 0, y: 0, height: 100, width: 100 }
	} else {
		size = crop
	}
	return new Promise((resolve) => {
		const img: HTMLImageElement = new Image(size.width, size.height)
		img.src = src
		img.crossOrigin = 'use-credentials'
		img.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			canvas.width = img.naturalWidth
			canvas.height = img.naturalHeight
			if (ctx) ctx.drawImage(img, 0, 0)
			const uri = canvas.toDataURL('image/png', 1.0)
			resolve(uri)
		}
	})
}

function addTextBox(doc: jsPDF, object: TextObject) {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	if (ctx) {
		const text = object.value
		const width = object.width
		const height = object.height
		canvas.width = width
		canvas.height = height
		ctx.fillStyle = object.color.hex
		ctx.strokeStyle = ctx.fillStyle
		ctx.lineWidth = 4
		CanvasTextWrapper.CanvasTextWrapper(canvas, text, {
			font: `${object.bold ? 900 : 500} ${object.size}px ${object.fontFamily}`,
			textAlign: /*`${object.align}`*/ 'left',
		})
		const base64 = canvas.toDataURL()
		doc.addImage(base64, 'PNG', object.x, object.y, width, height)
	}
}

function addRect(doc: jsPDF, object: SlideElement, mode: string) {
	doc.rect(object.x, object.y, object.width, object.height, mode)
}

function addTriangle(doc: jsPDF, object: SlideElement, mode: string) {
	doc.triangle(
		object.x + object.width / 2,
		object.y,
		object.x,
		object.y + object.height,
		object.x + object.width,
		object.y + object.height,
		mode,
	)
}

function addEllipse(doc: jsPDF, object: SlideElement, mode: string) {
	doc.ellipse(
		object.x + object.width / 2,
		object.y + object.height / 2,
		object.width / 2,
		object.height / 2,
		mode,
	)
}

function addFigure(doc: jsPDF, object: Primitive) {
	if (!object.border) {
		doc.setDrawColor(0, 0, 0, 0)
	} else {
		doc.setDrawColor(object.border.color.hex)
	}
	if (object.color.opacity === 0) {
		doc.setFillColor(0, 0, 0, 0)
	} else {
		doc.setFillColor(object.color.hex)
	}
	doc.setLineWidth(object.border?.width ?? 0)
	const drawingMode = 'FD' //DrawFill
	switch (object.primitiveType) {
		case PrimitiveType.RECTANGLE:
			addRect(doc, object, drawingMode)
			break
		case PrimitiveType.TRIANGLE:
			addTriangle(doc, object, drawingMode)
			break
		case PrimitiveType.ELLIPSE:
			addEllipse(doc, object, drawingMode)
			break
	}
}

function addImage(doc: jsPDF, object: Image, base64: string) {
	doc.addImage(base64, 'PNG', object.x, object.y, object.width, object.height)
}

async function addObjectOnPage(doc: jsPDF, object: SlideElement) {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve) => {
		switch (object.objectType) {
			case ObjectType.IMAGE: {
				const base64 = await getBase64FromPicture(object.path, object.crop)
				addImage(doc, object, base64)
				break
			}
			case ObjectType.TEXT:
				addTextBox(doc, object)
				break
			case ObjectType.PRIMITIVE:
				addFigure(doc, object)
				break
		}
		resolve(Promise)
	})
}

async function addObjectsOnPage(doc: jsPDF, elements: Array<SlideElement>) {
	const promises = elements.map(async (SlideElement) => {
		return addObjectOnPage(doc, SlideElement)
	})
	await Promise.all(promises)
}

async function setBackgroundImage(doc: jsPDF, image: Image) {
	if (image.path) {
		const base64 = await getBase64FromPicture(image.path, image.crop)
		doc.addImage(base64, 'jpg', 0, 0, slideWidth, slideHeight)
	}
}

function setBackgroundColor(doc: jsPDF, color: string) {
	doc.setFillColor(color)
	doc.rect(0, 0, slideWidth, slideHeight, 'F')
}

async function addSlides(doc: jsPDF, slides: Array<Slide>) {
	for (let i = 0; i < slides.length; i++) {
		const slide = slides[i]
		if (!slide.backgroundImage) {
			setBackgroundColor(doc, slide.backgroundColor.hex)
		} else {
			const bgImage: Image = {
				id: uuid(),
				x: 0,
				y: 0,
				rotateAngle: 0,
				objectType: ObjectType.IMAGE,
				width: slideWidth,
				height: slideHeight,
				path: slide.backgroundImage,
			}
			await setBackgroundImage(doc, bgImage)
		}
		await addObjectsOnPage(doc, slide.slideObjects)
		doc.addPage()
	}
}

export { addSlides, getBase64FromPicture }
