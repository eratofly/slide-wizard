import { Image, ObjectType, Primitive, PrimitiveType, Slide, TextObject } from './types'
import { v4 as uuidv4 } from 'uuid'

function getDefaultSlide(): Slide {
	return {
		id: uuidv4(),
		backgroundColor: { hex: '#FFFFFF', opacity: 0 },
		slideObjects: [],
	}
}

function getDefaultRectangle(): Primitive {
	return {
		id: uuidv4(),
		objectType: ObjectType.PRIMITIVE,
		x: 100,
		y: 100,
		width: 100,
		height: 100,
		rotateAngle: 0,
		primitiveType: PrimitiveType.RECTANGLE,
		color: {
			hex: '#ff00ff',
			opacity: 1,
		},
	}
}

function getDefaultEllipse(): Primitive {
	return {
		id: uuidv4(),
		objectType: ObjectType.PRIMITIVE,
		x: 100,
		y: 100,
		width: 100,
		height: 100,
		rotateAngle: 0,
		primitiveType: PrimitiveType.ELLIPSE,
		color: {
			hex: '#ff00ff',
			opacity: 1,
		},
	}
}

function getDefaultTriangle(): Primitive {
	return {
		id: uuidv4(),
		objectType: ObjectType.PRIMITIVE,
		x: 100,
		y: 100,
		width: 100,
		height: 100,
		rotateAngle: 0,
		primitiveType: PrimitiveType.TRIANGLE,
		color: {
			hex: '#ff00ff',
			opacity: 1,
		},
	}
}

function getDefaultText(): TextObject {
	return {
		id: uuidv4(),
		objectType: ObjectType.TEXT,
		x: 0,
		y: 0,
		width: 300,
		height: 200,
		rotateAngle: 0,
		value: 'Enter your text',
		fontFamily: 'Arial',
		color: {
			hex: '#000000',
			opacity: 1,
		},
		size: 14,
		bold: false,
		italic: false,
	}
}

function getDefaultImage(path: string): Image {
	return {
		id: uuidv4(),
		objectType: ObjectType.IMAGE,
		x: 0,
		y: 0,
		width: 500,
		height: 500,
		rotateAngle: 0,
		path: path,
	}
}

export {
	getDefaultSlide,
	getDefaultRectangle,
	getDefaultEllipse,
	getDefaultTriangle,
	getDefaultText,
	getDefaultImage,
}
