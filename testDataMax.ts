import {
    Char,
    Color,
    Command,
    CommandHistory,
    Crop,
    Editor,
    Selection,
    Image,
    ObjectType,
    Presentation,
    Primitive,
    PrimitiveType,
    Slide,
    TextObject,
} from './types'

const triangleBorderColor: Color = {
    hex: '#fff000',
    opacity: 0.8,
}

const primitiveColor: Color = {
    hex: '#ff00ff',
    opacity: 0.3,
}

const circleBorderColor: Color = {
    hex: '#5400ff',
    opacity: 0.9,
}

const rectBorderColor: Color = {
    hex: '#A436ff',
    opacity: 1,
}

const imgBorderColor: Color = {
    hex: '#4400bf',
    opacity: 0.5,
}

const textBorderColor: Color = {
    hex: '#5476ff',
    opacity: 0.1,
}

const textColor: Color = {
    hex: '#ff0000',
    opacity: 0,
}

const colorCircle: Color = {
    hex: '#50ff78',
    opacity: 0.5,
}

const bgcSlide1: Color = {
    hex: '#0000ff',
    opacity: 0.5,
}

const bgcSlide2: Color = {
    hex: '#ff0000',
    opacity: 0,
}

const bgcSlide3: Color = {
    hex: '#00ff00',
    opacity: 0,
}

const rectBorder = {
    color: rectBorderColor,
    width: 2,
}

const triangleBorder = {
    color: triangleBorderColor,
    width: 1,
}

const circleBorder = {
    color: circleBorderColor,
    width: 0,
}

const imgBorder = {
    color: imgBorderColor,
    width: 10,
}

const textBorder = {
    color: textBorderColor,
    width: 5,
}

const rect: Primitive = {
    id: 'fjnfi3',
    objectType: ObjectType.PRIMITIVE,
    x: 11,
    y: 3,
    width: 5,
    height: 11,
    rotateAngle: 180,
    primitiveType: PrimitiveType.RECTANGLE,
    color: primitiveColor,
    border: rectBorder,
}

const triangle: Primitive = {
    id: 'hf3bs3',
    objectType: ObjectType.PRIMITIVE,
    x: 9,
    y: 8,
    width: 7,
    height: 6,
    rotateAngle: 5,
    primitiveType: PrimitiveType.TRIANGLE,
    color: primitiveColor,
    border: triangleBorder,
}

const imageCrop: Crop = {
    x: 15,
    y: 0,
    width: 60,
    height: 90,
}

const image: Image = {
    id: 'jfcy8d',
    objectType: ObjectType.IMAGE,
    x: 100,
    y: 50,
    width: 30,
    height: 1,
    rotateAngle: 90,
    path: 'https://',
    crop: imageCrop,
    border: imgBorder,
}

const letterB: Char = {
    value: 'b',
    fontFamily: 'Arial',
    color: textColor,
    size: 20,
    bold: false,
    italic: true,
}

const letterA: Char = {
    value: 'A',
    fontFamily: 'Arial',
    color: textColor,
    size: 14,
    bold: true,
    italic: false,
}

const textObject: TextObject = {
    id: 'kgvc7g',
    objectType: ObjectType.TEXT,
    x: 10,
    y: 20,
    width: 50,
    height: 14,
    rotateAngle: 0,
    chars: [letterA, letterB],
    border: textBorder,
}

const circle: Primitive = {
    id: 'd4e5f6',
    objectType: ObjectType.PRIMITIVE,
    x: 1,
    y: 0,
    width: 51,
    height: 34,
    rotateAngle: 0,
    primitiveType: PrimitiveType.ELLIPSE,
    color: colorCircle,
    border: circleBorder,
}

const slide1: Slide = {
    id: 'a1b2c3',
    backgroundColor: bgcSlide1,
    slideObjects: [textObject, circle],
}

const slide2: Slide = {
    id: 'j1k2l3',
    backgroundImage: 'https://',
    backgroundColor: bgcSlide2,
    slideObjects: [image, rect, triangle, circle, textObject],
}

const slide3: Slide = {
    id: 'g7h8i9',
    backgroundColor: bgcSlide3,
    slideObjects: [],
}

const presentation: Presentation = {
    title: 'The best presentation',
    slides: [slide1, slide2, slide3],
}

const selection: Selection = {
    slideId: 'a1b2c3',
    objectId: 'd4e5f6',
}

const commands: Array<Command> = [{}]

const commandHistory: CommandHistory = {
    commands,
}

const editor: Editor = {
    presentation,
    selection,
    commandHistory,
}

console.log(editor);