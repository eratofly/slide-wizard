enum ObjectType {
	TEXT = 'text',
	IMAGE = 'image',
	PRIMITIVE = 'primitive',
}

type SlideObject = {
	id: string
	x: number
	y: number
	width: number
	height: number
	rotateAngle: number
	border?: Border
}

type Color = {
	hex: string
	opacity: number
}

type Border = {
	color: Color
	width: number
}
enum PrimitiveType {
	RECTANGLE = 'rectangle',
	ELLIPSE = 'ellipse',
	TRIANGLE = 'triangle',
}

type Primitive = SlideObject & {
	objectType: ObjectType.PRIMITIVE
	primitiveType: PrimitiveType
	color: Color
}

type Crop = {
	x: number
	y: number
	width: number
	height: number
}

type Image = SlideObject & {
	objectType: ObjectType.IMAGE
	path: string
	crop?: Crop
}

type TextObject = SlideObject & {
	objectType: ObjectType.TEXT
	value: string
	fontFamily: string
	color: Color
	size: number
	bold: boolean
	italic: boolean
}

type Slide = {
	id: string
	backgroundImage?: string
	backgroundColor: Color
	slideObjects: Array<TextObject | Image | Primitive>
}

type Presentation = {
	title?: string
	slides: Array<Slide>
}

type Selection = {
	slideId: string
	objectId?: string
}

type Command = unknown

type CommandHistory = {
	commands: Array<Command>
}

type Editor = {
	isPreview: boolean
	presentation: Presentation
	selection: Selection
	commandHistory: CommandHistory
}

export { PrimitiveType, ObjectType }
export type {
	Editor,
	CommandHistory,
	Command,
	Selection,
	Presentation,
	Slide,
	TextObject,
	Image,
	Crop,
	Primitive,
	SlideObject,
	Color,
	Border,
}
